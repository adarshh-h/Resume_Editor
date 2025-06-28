from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import json
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for resumes
resumes = {}

class AISectionEnhanceRequest(BaseModel):
    section: str
    content: str

@app.post("/ai-enhance")  # Fixed typo in endpoint
async def enhance_section(request: AISectionEnhanceRequest):
    # Mock AI enhancement
    enhanced_content = f"[AI-Enhanced] {request.content} (Improved by our AI)"
    return {"enhancedContent": enhanced_content}

@app.post("/save-resume")
async def save_resume(resume_data: Dict[str, Any]):
    # Generate a simple ID for demo purposes
    resume_id = str(len(resumes) + 1)
    resumes[resume_id] = resume_data
    
    # Also save to file for persistence
    with open(f"resume_{resume_id}.json", "w") as f:
        json.dump(resume_data, f)
    
    return {"message": "Resume saved successfully", "resume_id": resume_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)