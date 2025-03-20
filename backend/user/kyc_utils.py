from PIL import Image
import cv2
import face_recognition
from django.core.exceptions import ValidationError
import logging
import pytesseract

logger = logging.getLogger(__name__)

class KYCVerifier:
    @staticmethod
    def extract_text(image_path):
        """
        Extract text from an ID document using Tesseract OCR
        """
        try:
            img = Image.open(image_path)
            text = pytesseract.image_to_string(img)
            return text.strip()
        except Exception as e:
            logger.error(f"OCR failed: {str(e)}")
            raise ValidationError("Unable to process document image.")
        
    
    @staticmethod
    def validate_document(document_path, document_type):
        """
        Validate Document text based on type
        """
        text = KYCVerifier.extract_text(document_path)
        if not text:
            raise ValidationError("No text detected in document.")

        # Basic validation rules
        if document_type == "PASSPORT":
            if "PASSPORT" not in text.upper() or len(text.split()) < 5:
                raise ValidationError("Invalid Passport Format.")
            elif document_type == "DRIVING_LICENSE":
                if "LICENSE" not in text.upper():
                    raise ValidationError("Invalid driving license format.")
            elif document_type == "NATIONAL_ID":
                if len(text.split()) < 3:
                    raise ValidationError("Invalid national ID format.")
            return {"extracted_text": text} 
    

    @staticmethod
    def verify_face(document_path, selfie_path):
        """
        Match face in document with selfie
        """
        try:
            doc_img = face_recognition.load_image_file(document_path)
            selfie_img = face_recognition.load_image_file(selfie_path)

            doc_faces = face_recognition.face_encodings(doc_img)
            selfie_faces = face_recognition.face_encodings(selfie_img)

            if not doc_faces or not selfie_faces:
                raise ValidationError("No face detected in one or both images.")
            
            match = face_recognition.compare_faces([doc_faces[0]], selfie_faces[0])[0]
            if not match:
                raise ValidationError("Faces do not match.")
            return True
        
        except Exception as e:
            logger.error(f"Face verification failed: {str(e)}")
            raise ValidationError("Face verification error.")
