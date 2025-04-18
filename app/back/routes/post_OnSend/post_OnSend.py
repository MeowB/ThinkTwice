from fastapi import APIRouter,HTTPException,Depends
from schema.schemas import OnSend, DailyToxicity
from dotenv import load_dotenv, dotenv_values 
from typing import Annotated
from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from database.database import metadata, get_db, engine
from datetime import date



router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]

Base = declarative_base()

class DailyToxicityObj(Base):
    ___tablename___ ="daily_toxicity"
    user_id: str
    day: str
    total_index : int
    messages_sent: date 


@router.post("/onSend")
async def post_onSend(recivedObj : OnSend, db: db_dependency):

    
    # 1) call db to check if   already row with this user id and today(YYYY-MM-DD)


    item = db.query(DailyToxicity).filter(DailyToxicity.user_id == recivedObj.user_id,  DailyToxicity.day == date.today()).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    # 2) if not post it

    # 2) if true  get  total_index and get message_sent 
    # 3) add index to total_index and add 1 to message_sent
    totalOfIndex = recivedObj.index
    totalOfMessages = 0 +1
    # 4) update total_index and message_sent
    
    db_post = DailyToxicity(user_id= 1, day=date.today() ,total_index= totalOfIndex,messages_sent=totalOfMessages)

    db.add(db_post)  # Add the new post to the session
    db.commit()  # Commit the transaction to the database
    db.refresh(db_post)  # Refresh to get the new post with an ID
    return db_post
    