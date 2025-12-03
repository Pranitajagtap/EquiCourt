from typing import Dict, Any

class TimelinePredictor:
    def __init__(self):
        self.category_timelines = {
            "Theft": {"min_days": 30, "max_days": 180, "complexity_factors": ["value", "evidence"]},
            "Assault": {"min_days": 60, "max_days": 365, "complexity_factors": ["injury", "witnesses"]},
            "Harassment": {"min_days": 90, "max_days": 270, "complexity_factors": ["duration", "evidence"]},
            "Fraud": {"min_days": 120, "max_days": 540, "complexity_factors": ["amount", "complexity"]},
            "Cybercrime": {"min_days": 150, "max_days": 365, "complexity_factors": ["technical", "jurisdiction"]}
        }
    
    def predict_timeline(self, category: str, severity_score: int) -> Dict[str, Any]:
        base_timeline = self.category_timelines.get(category, {"min_days": 60, "max_days": 180})
        
        severity_factor = severity_score / 100
        predicted_days = int(base_timeline["min_days"] + 
                           (base_timeline["max_days"] - base_timeline["min_days"]) * severity_factor)
        
        return {
            "estimated_duration_days": predicted_days,
            "confidence": 0.7,
            "factors": ["case complexity", "evidence availability", "legal procedures"],
            "stages": [
                {"stage": "FIR Registration", "days": "1-7 days"},
                {"stage": "Initial Investigation", "days": "1-2 weeks"},
                {"stage": "Evidence Collection", "days": "2-4 weeks"},
                {"stage": "Chargesheet Filing", "days": f"3-8 weeks"},
                {"stage": "Court Proceedings", "days": f"3-{predicted_days//30} months"}
            ]
        }