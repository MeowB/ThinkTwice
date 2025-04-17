from fastapi import APIRouter,HTTPException,Depends
from routes.get_analyze.schemas import Text
from dotenv import load_dotenv, dotenv_values 
from typing import Annotated
from routes.get_analyze.schemas import Text
from database import engine,  metadata
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, Table, select
from database import get_db

router = APIRouter()


load_dotenv() 


toxicword = Table("toxicword", metadata, autoload_with=engine)

db_dependency = Annotated[Session, Depends(get_db)]



@router.post("/checkWord")
async def get_DBCheck(recivedObj : Text, db: db_dependency):

    ListOfWords = recivedObj.text.split()
    responseObj = []

    for word in ListOfWords:
        with engine.connect() as conn:
            query = select(toxicword).where(toxicword.c.Text == word.lower())
            result = conn.execute(query).fetchone()
            if result:
                responseObj.append(word)

    return {"toxic_words": responseObj}