from pydantic import BaseModel
from fastapi import FastAPI
import random
import json
from routes.get_analyze import get_analyze


app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}



app.include_router(get_analyze.router)