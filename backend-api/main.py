from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import json

from models.eccm_model import ECCMModel
from models.dialect_normalizer import DialectNormalizer
from models.timeline_predictor import TimelinePredictor
from models.corruption_detector import CorruptionDetector
from utils.lss_calculator import LSSCalculator
from utils.ipc_mapper import IPCMapper
from utils.document_generator import DocumentGenerator
from utils.preprocessing import TextPreprocessor

app = FastAPI(title="EquiCourt API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

normalizer = DialectNormalizer()
eccm_model = ECCMModel()
lss_calculator = LSSCalculator()
ipc_mapper = IPCMapper()
doc_generator = DocumentGenerator()
timeline_predictor = TimelinePredictor()
corruption_detector = CorruptionDetector()
preprocessor = TextPreprocessor()

class ComplaintRequest(BaseModel):
    text: str
    language: Optional[str] = "auto"

class ClassificationRequest(BaseModel):
    text: str
    category: str

class DraftRequest(BaseModel):
    complaint_text: str
    category: str
    severity_score: int
    severity_level: str
    ipc_sections: List[str]
    complainant_info: Optional[Dict] = None

@app.get("/")
async def root():
    return {"message": "EquiCourt API is running"}

@app.post("/normalize")
async def normalize_text(request: ComplaintRequest):
    try:
        normalized_result = normalizer.normalize(request.text, request.language)
        return normalized_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Normalization error: {str(e)}")

@app.post("/classify")
async def classify_complaint(request: ComplaintRequest):
    try:
        normalized = normalizer.normalize(request.text, request.language)
        classification_result = eccm_model.predict(normalized["normalized_text"])
        
        return {
            "category": classification_result["category"],
            "confidence": classification_result["confidence"],
            "subcategory": classification_result["subcategory"],
            "explanation": classification_result["explanation"],
            "normalized_text": normalized["normalized_text"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Classification error: {str(e)}")

@app.post("/severity")
async def calculate_severity(request: ClassificationRequest):
    try:
        severity_result = lss_calculator.calculate_score(
            request.text, 
            request.category
        )
        
        ipc_sections = ipc_mapper.get_sections_for_category(request.category)
        
        return {
            "score": severity_result["score"],
            "level": severity_result["level"],
            "factors": severity_result["factors"],
            "suggested_ipc": ipc_sections,
            "risk_assessment": severity_result["risk_assessment"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Severity calculation error: {str(e)}")

@app.post("/generate-fir")
async def generate_fir_draft(request: DraftRequest):
    try:
        draft_result = doc_generator.generate_fir_draft(
            complaint_text=request.complaint_text,
            category=request.category,
            severity_score=request.severity_score,
            severity_level=request.severity_level,
            ipc_sections=request.ipc_sections,
            complainant_info=request.complainant_info or {}
        )
        
        return draft_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Draft generation error: {str(e)}")

@app.post("/legal-mapping")
async def get_legal_mapping(request: ClassificationRequest):
    try:
        sections = ipc_mapper.get_detailed_sections(request.category)
        evidence_checklist = ipc_mapper.get_evidence_checklist(request.category)
        
        return {
            "ipc_sections": sections,
            "evidence_checklist": evidence_checklist,
            "required_documents": ["ID Proof", "Address Proof", "Complaint Affidavit"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Legal mapping error: {str(e)}")

@app.post("/explain")
async def explain_prediction(request: Dict):
    try:
        highlights = eccm_model.explain_prediction(
            request["original_text"], 
            request["classification"]["category"]
        )
        
        return {
            "highlights": highlights,
            "confidence_factors": [
                f"Classification confidence: {request['classification']['confidence']}",
                "Pattern matching based on legal categories"
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Explanation error: {str(e)}")

@app.post("/predict-timeline")
async def predict_timeline(request: Dict):
    try:
        timeline = timeline_predictor.predict_timeline(
            request["category"], 
            request["severity_score"]
        )
        return timeline
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Timeline prediction error: {str(e)}")

@app.post("/assess-corruption-risk")
async def assess_corruption_risk(request: Dict):
    try:
        risk = corruption_detector.assess_risk(
            request["category"],
            request["severity_score"]
        )
        return risk
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Corruption risk assessment error: {str(e)}")

@app.post("/analyze-complete")
async def analyze_complete_pipeline(request: ComplaintRequest):
    try:
        normalized = normalizer.normalize(request.text, request.language)
        classification = eccm_model.predict(normalized["normalized_text"])
        severity = lss_calculator.calculate_score(
            normalized["normalized_text"], 
            classification["category"]
        )
        legal_mapping = {
            "ipc_sections": ipc_mapper.get_detailed_sections(classification["category"]),
            "evidence_checklist": ipc_mapper.get_evidence_checklist(classification["category"]),
            "required_documents": ["ID Proof", "Address Proof", "Complaint Affidavit"]
        }
        highlights = eccm_model.explain_prediction(
            normalized["normalized_text"], 
            classification["category"]
        )
        timeline = timeline_predictor.predict_timeline(
            classification["category"], 
            severity["score"]
        )
        corruption_risk = corruption_detector.assess_risk(
            classification["category"],
            severity["score"]
        )
        
        return {
            "normalization": normalized,
            "classification": classification,
            "severity": severity,
            "legal": legal_mapping,
            "explanation": {"highlights": highlights},
            "timeline_prediction": timeline,
            "corruption_risk": corruption_risk
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Complete analysis error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)