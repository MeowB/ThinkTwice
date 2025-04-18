from fastapi import APIRouter,HTTPException,Depends
from schema.schemas import Text
from dotenv import load_dotenv, dotenv_values 
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, Table, select
from database.database import metadata, get_db, engine
import string

router = APIRouter()


load_dotenv() 


toxicword = Table("toxicword", metadata, autoload_with=engine)

db_dependency = Annotated[Session, Depends(get_db)]



@router.post("/checkWord")
async def get_DBCheck(recivedObj : Text, db: db_dependency):


    translator = str.maketrans('', '', string.punctuation)
    clean_text = recivedObj.text.translate(translator)
    ListOfWords = clean_text.split()
    responseObj = []


    for word in ListOfWords:
        with engine.connect() as conn:
            query = select(toxicword).where(toxicword.c.Text == word.lower())
            result = conn.execute(query).fetchone()
            if result:
                responseObj.append(word)
    return {"toxic_words": responseObj}