from typing import Dict, Any

class CorruptionDetector:
    def __init__(self):
        self.risk_factors = {
            "high_value_cases": ["fraud", "cybercrime"],
            "bureaucratic_hurdles": ["all"],
            "evidence_sensitivity": ["assault", "harassment"],
            "witness_intimidation_risk": ["assault", "theft"]
        }
    
    def assess_risk(self, category: str, severity_score: int) -> Dict[str, Any]:
        risk_score = 0
        
        if category in ["Fraud", "Cybercrime"]:
            risk_score += 0.3
        elif category in ["Assault"]:
            risk_score += 0.2
        
        if severity_score > 80:
            risk_score += 0.3
        elif severity_score > 50:
            risk_score += 0.2
        
        if risk_score >= 0.5:
            risk_level = "High"
            recommendations = [
                "File complaint directly with higher authorities",
                "Maintain duplicate copies of all documents",
                "Use official email for all communications",
                "Seek assistance from anti-corruption helpline if needed"
            ]
        elif risk_score >= 0.3:
            risk_level = "Medium"
            recommendations = [
                "Follow up regularly on case status",
                "Document all interactions with officials",
                "Use transparent payment methods if any fees",
                "Consult with legal aid services"
            ]
        else:
            risk_level = "Low"
            recommendations = [
                "Follow standard procedures",
                "Maintain proper documentation",
                "Be aware of your rights as complainant"
            ]
        
        return {
            "risk_score": round(risk_score, 2),
            "risk_level": risk_level,
            "recommendations": recommendations,
            "factors_considered": ["case_category", "severity", "common_risk_patterns"]
        }