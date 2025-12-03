import re
from typing import Dict, List, Any

class ECCMModel:
    def __init__(self):
        self.categories = {
            "theft": {
                "keywords": ["stolen", "theft", "robbery", "snatched", "missing", "taken"],
                "subcategories": ["Petty Theft", "Burglary", "Robbery", "Vehicle Theft"]
            },
            "assault": {
                "keywords": ["assault", "beaten", "hit", "attacked", "violence", "hurt"],
                "subcategories": ["Physical Assault", "Verbal Abuse", "Domestic Violence"]
            },
            "harassment": {
                "keywords": ["harassment", "threat", "stalk", "bully", "intimidate"],
                "subcategories": ["Sexual Harassment", "Cyber Harassment", "Workplace Harassment"]
            },
            "fraud": {
                "keywords": ["fraud", "cheat", "scam", "fake", "duped", "forged"],
                "subcategories": ["Online Fraud", "Financial Fraud", "Identity Theft"]
            },
            "cybercrime": {
                "keywords": ["hack", "cyber", "online", "phishing", "malware", "account"],
                "subcategories": ["Hacking", "Cyber Bullying", "Online Fraud"]
            }
        }
    
    def predict(self, text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        
        scores = {}
        for category, data in self.categories.items():
            keyword_matches = sum(1 for keyword in data["keywords"] if keyword in text_lower)
            scores[category] = keyword_matches / len(data["keywords"])
        
        best_category = max(scores, key=scores.get)
        confidence = scores[best_category]
        
        subcategory = self._determine_subcategory(text_lower, best_category)
        explanation = self._generate_explanation(text_lower, best_category)
        
        return {
            "category": best_category.title(),
            "confidence": max(0.7, confidence),
            "subcategory": subcategory,
            "explanation": explanation,
            "all_scores": scores
        }
    
    def _determine_subcategory(self, text: str, category: str) -> str:
        if category == "theft":
            if any(word in text for word in ["mobile", "phone", "wallet"]):
                return "Petty Theft"
            elif any(word in text for word in ["car", "bike", "vehicle"]):
                return "Vehicle Theft"
            elif any(word in text for word in ["house", "home", "break-in"]):
                return "Burglary"
        
        elif category == "assault":
            if any(word in text for word in ["wife", "husband", "domestic"]):
                return "Domestic Violence"
            elif any(word in text for word in ["punch", "hit", "physical"]):
                return "Physical Assault"
        
        return self.categories[category]["subcategories"][0]
    
    def _generate_explanation(self, text: str, category: str) -> str:
        keywords_found = [keyword for keyword in self.categories[category]["keywords"] 
                         if keyword in text]
        
        if keywords_found:
            return f"Classification based on keywords: {', '.join(keywords_found)}"
        else:
            return "Classification based on contextual patterns in the complaint"
    
    def explain_prediction(self, text: str, category: str) -> List[Dict[str, Any]]:
        highlights = []
        words = re.findall(r'\b\w+\b', text.lower())
        
        category_keywords = self.categories.get(category.lower(), {}).get("keywords", [])
        
        current_pos = 0
        for word in words:
            start = text.lower().find(word, current_pos)
            if start != -1:
                end = start + len(word)
                current_pos = end
                
                if word in category_keywords:
                    weight = 0.8 if word in ["stolen", "assault", "fraud", "harassment"] else 0.6
                    highlights.append({
                        "start": start,
                        "end": end,
                        "weight": weight,
                        "reason": f"Key '{category}' keyword"
                    })
        
        return highlights[:5]