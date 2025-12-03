from typing import Dict, List, Any
import re

class LSSCalculator:
    def __init__(self):
        self.factors = {
            "violence_involved": {"weight": 0.25, "keywords": ["assault", "beat", "hit", "violence"]},
            "weapon_mentioned": {"weight": 0.20, "keywords": ["knife", "gun", "weapon", "armed"]},
            "public_place": {"weight": 0.15, "keywords": ["street", "market", "public", "bus", "train"]},
            "financial_loss": {"weight": 0.15, "keywords": ["money", "cash", "valuables", "expensive"]},
            "multiple_victims": {"weight": 0.10, "keywords": ["people", "crowd", "family", "others"]},
            "premeditated": {"weight": 0.10, "keywords": ["planned", "followed", "waited", "targeted"]},
            "digital_impact": {"weight": 0.05, "keywords": ["online", "social media", "digital", "cyber"]}
        }
        
        self.category_weights = {
            "Theft": 1.0,
            "Assault": 1.5,
            "Harassment": 1.2,
            "Fraud": 1.1,
            "Cybercrime": 1.3
        }
    
    def calculate_score(self, text: str, category: str) -> Dict[str, Any]:
        text_lower = text.lower()
        
        factor_scores = {}
        total_score = 0
        
        for factor_name, factor_data in self.factors.items():
            matches = sum(1 for keyword in factor_data["keywords"] if keyword in text_lower)
            factor_score = min(1.0, matches * 0.3)
            
            factor_scores[factor_name] = {
                "score": factor_score,
                "weight": factor_data["weight"],
                "contribution": factor_score * factor_data["weight"],
                "evidence": [kw for kw in factor_data["keywords"] if kw in text_lower]
            }
            
            total_score += factor_scores[factor_name]["contribution"]
        
        category_weight = self.category_weights.get(category, 1.0)
        weighted_score = total_score * category_weight * 100
        final_score = min(100, weighted_score)
        severity_level = self._get_severity_level(final_score)
        risk_assessment = self._assess_risk(final_score, category)
        
        return {
            "score": round(final_score),
            "level": severity_level,
            "factors": factor_scores,
            "category_weight": category_weight,
            "risk_assessment": risk_assessment
        }
    
    def _get_severity_level(self, score: float) -> str:
        if score >= 80:
            return "High"
        elif score >= 50:
            return "Medium"
        else:
            return "Low"
    
    def _assess_risk(self, score: float, category: str) -> Dict[str, Any]:
        if score >= 80:
            return {
                "level": "Critical",
                "recommendation": "Immediate police intervention required",
                "timeline": "Within 24 hours",
                "actions": ["File FIR immediately", "Preserve evidence", "Seek medical attention if injured"]
            }
        elif score >= 50:
            return {
                "level": "Moderate",
                "recommendation": "Police complaint recommended",
                "timeline": "Within 48 hours",
                "actions": ["File police complaint", "Document evidence", "Consult legal advisor"]
            }
        else:
            return {
                "level": "Low",
                "recommendation": "Can file general diary or civil complaint",
                "timeline": "Within 7 days",
                "actions": ["File general diary", "Attempt mediation", "Consult local authorities"]
            }