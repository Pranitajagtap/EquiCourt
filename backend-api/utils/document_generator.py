from datetime import datetime
from typing import Dict, List, Any

class DocumentGenerator:
    def __init__(self):
        self.fir_template = """
FIR DRAFT - EQUICOURT GENERATED

Police Station: {police_station}
District: {district}
State: {state}

FIR No: ______________
Date: {current_date}

COMPLAINANT INFORMATION:
Name: {complainant_name}
Address: {complainant_address}
Contact: {complainant_contact}

COMPLAINT DETAILS:
Date of Incident: {incident_date}
Time of Incident: {incident_time}
Place of Occurrence: {incident_place}

NARRATIVE:
{complaint_text}

CATEGORIZATION:
Legal Category: {category}
Severity Level: {severity_level}
Severity Score: {severity_score}/100

APPLICABLE IPC SECTIONS:
{ipc_sections}

EVIDENCE CHECKLIST:
{evidence_checklist}

RECOMMENDED ACTIONS:
{recommended_actions}

Complainant Signature: __________________

Station House Officer Signature: __________________
Date: {current_date}
"""
    
    def generate_fir_draft(self, complaint_text: str, category: str, 
                          severity_score: int, severity_level: str, 
                          ipc_sections: List[str], 
                          complainant_info: Dict[str, Any]) -> Dict[str, Any]:
        
        ipc_sections_formatted = "\n".join([f"- IPC {section}" for section in ipc_sections])
        evidence_checklist = self._get_evidence_checklist(category)
        recommended_actions = self._get_recommended_actions(severity_level)
        
        fir_draft = self.fir_template.format(
            police_station=complainant_info.get("police_station", "Local Police Station"),
            district=complainant_info.get("district", "Your District"),
            state=complainant_info.get("state", "Your State"),
            current_date=datetime.now().strftime("%Y-%m-%d"),
            complainant_name=complainant_info.get("name", "Complainant Name"),
            complainant_address=complainant_info.get("address", "Complainant Address"),
            complainant_contact=complainant_info.get("contact", "Contact Information"),
            incident_date=complainant_info.get("incident_date", "Date of incident"),
            incident_time=complainant_info.get("incident_time", "Time of incident"),
            incident_place=complainant_info.get("incident_place", "Place of occurrence"),
            complaint_text=complaint_text,
            category=category,
            severity_level=severity_level,
            severity_score=severity_score,
            ipc_sections=ipc_sections_formatted,
            evidence_checklist="\n".join([f"- {item}" for item in evidence_checklist]),
            recommended_actions="\n".join([f"- {action}" for action in recommended_actions])
        )
        
        return {
            "fir_draft": fir_draft,
            "category": category,
            "severity_level": severity_level,
            "severity_score": severity_score,
            "ipc_sections": ipc_sections,
            "evidence_checklist": evidence_checklist,
            "generated_date": datetime.now().isoformat(),
            "document_type": "FIR Draft"
        }
    
    def _get_evidence_checklist(self, category: str) -> List[str]:
        checklists = {
            "Theft": [
                "Proof of ownership (receipts, bills)",
                "Witness contact information",
                "CCTV footage request",
                "Description of stolen items with values",
                "Time and location details"
            ],
            "Assault": [
                "Medical examination reports",
                "Photographs of injuries",
                "Witness statements",
                "Weapon description",
                "Clothing evidence"
            ]
        }
        
        return checklists.get(category, [
            "Document all relevant evidence",
            "Collect witness information",
            "Preserve digital evidence",
            "Medical reports if applicable"
        ])
    
    def _get_recommended_actions(self, severity_level: str) -> List[str]:
        actions = {
            "High": [
                "File FIR immediately at nearest police station",
                "Preserve all physical and digital evidence",
                "Seek medical attention if injured",
                "Inform family and legal counsel",
                "Follow up with investigating officer within 24 hours"
            ],
            "Medium": [
                "File police complaint within 48 hours",
                "Document all evidence systematically",
                "Consult with legal advisor",
                "Maintain record of all communications",
                "Follow up as per police guidance"
            ],
            "Low": [
                "File general diary entry",
                "Attempt mediation if appropriate",
                "Consult local authorities",
                "Document the incident for records",
                "Seek legal advice for further action"
            ]
        }
        
        return actions.get(severity_level, ["Consult local authorities for guidance"])