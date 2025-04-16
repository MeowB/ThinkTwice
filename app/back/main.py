from pydantic import BaseModel
from fastapi import FastAPI
import random
from googleapiclient import discovery
import json

app = FastAPI()

items =[]

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/items")
def create_item(item : str):
    items.append(item)
    return items

@app.get("/items/{item_id}")
def get_item(item_id : int) -> str:
    item = items[item_id]
    return item

#return true
@app.get("/true")
def get_true():
    return ({"awnser" :"true"})

#return false
@app.get("/false")
def get_false():
    return ({"awnser" :"false"})

# return true or false qwith a 50/50 chance
@app.get("/tof")
def get_trueOrFalse():
    awnser = random.choice(["true","false"])
    return ({"awnser" : awnser})


#return awnser between 0.0 and 1.0
@app.get("/note")
def get_randomFloat():
    anwser = random.random()
    anwser = round(anwser,1)
    return({"awnser" : anwser})

class Text(BaseModel):
    
    text: str


@app.post("/analyse")
async def analyze_text(recivedObj: Text):

    API_KEY = ''

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
    except:
        return("An error occured with the given data")
    response = client.comments().analyze(body=analyze_request).execute()

    try:
        toxicity_value = response["attributeScores"]["TOXICITY"]["summaryScore"]["value"]

        responseObj = {
            'text' : recivedObj.text,
            'toxicity_value' : toxicity_value
        }
    except:
        return("An error occured with Perspective API")
    return(responseObj)




