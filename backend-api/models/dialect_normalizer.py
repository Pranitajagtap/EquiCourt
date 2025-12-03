import re
from typing import Dict, Any

class DialectNormalizer:
    def __init__(self):
        self.dialect_mappings = {
            "mobile": "mobile phone",
            "phone": "mobile phone", 
            "gadi": "vehicle",
            "paise": "money",
            "chor": "thief",
            "maar": "beat",
            "gussa": "anger",
            "thief": "thief",
            "robber": "robber",
            "snatcher": "snatcher",
            "guy": "person",
            "stuff": "items",
            "thing": "object"
        }
        
        self.regional_indicators = {
            "hindi": ["mobile", "gadi", "paise", "chor", "maar"],
            "urdu": ["mobile", "gadi"],
            "bengali": ["churi", "gari"]
        }
    
    def normalize(self, text: str, language: str = "auto") -> Dict[str, Any]:
        detected_language = self._detect_language(text) if language == "auto" else language
        
        cleaned_text = self._clean_text(text)
        normalized_text = self._replace_dialect_words(cleaned_text)
        formal_text = self._formalize_language(normalized_text)
        
        return {
            "normalized_text": formal_text,
            "original_text": text,
            "detected_language": detected_language,
            "dialect_detected": detected_language != "english",
            "confidence": 0.85
        }
    
    def _detect_language(self, text: str) -> str:
        text_lower = text.lower()
        
        for language, indicators in self.regional_indicators.items():
            if any(indicator in text_lower for indicator in indicators):
                return language
        
        return "english"
    
    def _clean_text(self, text: str) -> str:
        text = re.sub(r'\s+', ' ', text)
        
        replacements = {
            "fone": "phone",
            "mob": "mobile",
            "thnaks": "thanks",
            "pls": "please",
            "ur": "your"
        }
        
        for wrong, correct in replacements.items():
            text = re.sub(r'\b' + wrong + r'\b', correct, text, flags=re.IGNORECASE)
        
        return text.strip()
    
    def _replace_dialect_words(self, text: str) -> str:
        words = text.split()
        normalized_words = []
        
        for word in words:
            normalized_word = self.dialect_mappings.get(word.lower(), word)
            normalized_words.append(normalized_word)
        
        return ' '.join(normalized_words)
    
    def _formalize_language(self, text: str) -> str:
        formalizations = {
            "my": "the complainant's",
            "i": "the complainant",
            "me": "the complainant",
            "he": "the accused",
            "she": "the accused",
            "they": "the accused persons",
            "took": "appropriated",
            "stole": "unlawfully took",
            "beat": "assaulted",
            "hit": "struck",
            "ran away": "fled the scene"
        }
        
        formal_text = text
        for informal, formal in formalizations.items():
            formal_text = re.sub(r'\b' + informal + r'\b', formal, formal_text, flags=re.IGNORECASE)
        
        return formal_text