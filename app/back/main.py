
from fastapi import FastAPI, HTTPException, Depends, status
import random
import json
from routes.get_analyze import get_analyze
from routes.get_DBCheck import get_DBCheck

from routes.get_analyze.schemas import Text
from database import engine, SessionLocal, metadata
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, Table, MetaData, select
import time



app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}


routers = [
    get_analyze.router,
    get_DBCheck.router,
]

for router in routers:
    app.include_router(router)