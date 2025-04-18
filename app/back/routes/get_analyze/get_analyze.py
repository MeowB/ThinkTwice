from fastapi import APIRouter,HTTPException,Depends
from schema.schemas import Text
from googleapiclient import discovery
import os
from dotenv import load_dotenv, dotenv_values 

router = APIRouter()



@router.post("/analyze")
async def get_analyze(recivedObj: Text):

    API_KEY = os.getenv("API_KEY")

    client = discovery.build(
    "commentanalyzer",
    "v1alpha1", 
    developerKey= API_KEY,
    discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
    static_discovery=False,
    )
    
    try:
        analyze_request = {
        'comment':  {'text': recivedObj.text} ,
        'requestedAttributes': {'TOXICITY': {}}
        }
    
        
        response = client.comments().analyze(body=analyze_request).execute()

        
        toxicity_value = response["attributeScores"]["TOXICITY"]["summaryScore"]["value"]

        responseObj = {
                'text' : recivedObj.text,
                'toxicity_value' : toxicity_value
            }
        
    except Exception as e:
        if "LANGUAGE_NOT_SUPPORTED_BY_ATTRIBUTE" in str(e):
            raise HTTPException(status_code=400, detail="Language not supported for TOXICITY analysis.")
    
        raise HTTPException(status_code=500, detail="An error occurred while analyzing the text.")
    return(responseObj)


