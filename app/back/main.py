from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random


app = FastAPI()


app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],  # or ["chrome-extension://<your-extension-id>"]
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

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