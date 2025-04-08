from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
import json
import logging

logger = logging.getLogger(__name__)

class TransactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']  # From URL: ws/user/<user_id>/
        self.group_name = f"user_{self.user_id}"

        # Extract Authorization header
        headers = dict(self.scope['headers'])
        auth_header = headers.get(b'authorization', b'').decode('utf-8')

        if not auth_header.startswith('Bearer '):
            logger.warning(f"WebSocket connection rejected for user_id={self.user_id}: No Bearer token provided")
            await self.close(code=4001)  # Unauthorized
            return

        token = auth_header.split(' ')[1]

        # Authenticate the token and verify user
        user = await self.authenticate_token(token)
        if not user or str(user.pkid) != self.user_id:
            logger.warning(f"WebSocket connection rejected for user_id={self.user_id}: Invalid or mismatched token")
            await self.close(code=4001)  # Unauthorized
            return

        # Store authenticated user for potential use
        self.user = user

        # Join user-specific group
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        logger.info(f"WebSocket connected for user_id={self.user_id}, email={user.email}")

    async def disconnect(self, close_code):
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
        logger.info(f"WebSocket disconnected for user_id={self.user_id}, close_code={close_code}")

    async def receive(self, text_data):
        # Optional: Handle messages from frontend if needed in the future
        logger.debug(f"Received message from user_id={self.user_id}: {text_data}")
        pass

    async def transaction_update(self, event):
        # Send transaction update to the frontend
        await self.send(text_data=json.dumps({
            'type': 'transaction_update',
            'transaction_id': event['transaction_id'],
            'status': event['status'],
            'amount': str(event['amount']),
            'currency': event['currency'],
            'usd_balance': str(event['usd_balance']),
        }))
        logger.info(f"Sent transaction update to user_id={self.user_id}: {event}")

    @database_sync_to_async
    def authenticate_token(self, token):
        """
        Authenticate the JWT token and return the user if valid.
        """
        try:
            jwt_auth = JWTAuthentication()
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)
            return user
        except (InvalidToken, TokenError) as e:
            logger.error(f"Token authentication failed for user_id={self.user_id}: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error during token authentication for user_id={self.user_id}: {str(e)}")
            return None