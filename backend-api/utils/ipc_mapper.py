from typing import List, Dict, Any

class IPCMapper:
    def __init__(self):
        self.ipc_database = {
            "Theft": [
                {
                    "code": "378",
                    "description": "Theft",
                    "punishment": "Imprisonment up to 3 years or fine or both",
                    "applicability": "Moving property out of possession without consent"
                },
                {
                    "code": "379",
                    "description": "Punishment for theft",
                    "punishment": "Imprisonment up to 3 years or fine or both",
                    "applicability": "General theft cases"
                }
            ],
            "Assault": [
                {
                    "code": "351",
                    "description": "Assault",
                    "punishment": "Imprisonment up to 3 months or fine up to ₹500 or both",
                    "applicability": "Use of criminal force"
                },
                {
                    "code": "352",
                    "description": "Punishment for assault",
                    "punishment": "Imprisonment up to 3 months or fine up to ₹500 or both",
                    "applicability": "Assault without grave provocation"
                }
            ],
            "Harassment": [
                {
                    "code": "509",
                    "description": "Word, gesture or act intended to insult the modesty of a woman",
                    "punishment": "Simple imprisonment up to 1 year or fine or both",
                    "applicability": "Verbal or gestural harassment"
                }
            ],
            "Fraud": [
                {
                    "code": "415",
                    "description": "Cheating",
                    "punishment": "Imprisonment up to 1 year or fine or both",
                    "applicability": "Dishonest inducement for delivery of property"
                }
            ],
            "Cybercrime": [
                {
                    "code": "66C",
                    "description": "Identity theft (IT Act)",
                    "punishment": "Imprisonment up to 3 years and fine up to ₹1 lakh",
                    "applicability": "Fraudulent use of electronic signature, password"
                }
            ]
        }
    
    def get_sections_for_category(self, category: str) -> List[str]:
        sections = self.ipc_database.get(category, [])
        return [section["code"] for section in sections]
    
    def get_detailed_sections(self, category: str) -> List[Dict[str, Any]]:
        return self.ipc_database.get(category, [])
    
    def get_evidence_checklist(self, category: str) -> List[str]:
        checklists = {
            "Theft": [
                "Proof of ownership (receipts, bills)",
                "Witness statements",
                "CCTV footage if available",
                "Police complaint copy",
                "Description of stolen items"
            ],
            "Assault": [
                "Medical examination report",
                "Photographs of injuries",
                "Witness statements",
                "Weapon used (if any)",
                "Clothing with blood stains"
            ],
            "Harassment": [
                "Screenshots of messages/calls",
                "Witness statements",
                "Audio/video recordings",
                "Email communications"
            ],
            "Fraud": [
                "Bank statements",
                "Transaction records",
                "Communication evidence",
                "Identity proof of accused"
            ],
            "Cybercrime": [
                "Screenshots of online activity",
                "IP addresses",
                "Email headers",
                "Device information"
            ]
        }
        
        return checklists.get(category, ["General evidence documentation"])