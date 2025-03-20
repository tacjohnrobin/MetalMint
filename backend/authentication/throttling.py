from rest_framework.throttling import AnonRateThrottle

class LoginRateThrottle(AnonRateThrottle):
    rate = '5/minute'

class EmailVerificationRateThrottle(AnonRateThrottle):
    rate = '3/hour'