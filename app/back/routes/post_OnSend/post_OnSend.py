from fastapi import APIRouter,HTTPException,Depends
from schema.schemas import OnSend, DailyToxicity
from dotenv import load_dotenv, dotenv_values 
from typing import Annotated
from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR, Date, Uuid
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from database.database import metadata, get_db, engine
from datetime import date



router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]

Base = declarative_base()

class DailyToxicityObj(Base):
    __tablename__ = "daily_toxicity"
    user_id = Column("user_id",  Uuid )
    day= Column("day", Date)
    total_index= Column("total_index",Integer) 
    messages_sent= Column("messages_sent", Integer) 
    id = Column("id" , Integer, primary_key=True)


@router.post("/onSend", response_model=DailyToxicity)
async def post_onSend(recivedObj : OnSend, db: db_dependency):

    
    # 1) call db to check if   already row with this user id and today(YYYY-MM-DD)


    item = db.query(DailyToxicityObj).filter(DailyToxicityObj.user_id == recivedObj.user_id,  DailyToxicityObj.day == date.today()).first()
    if item:
        item.total_index += int(recivedObj.index * 100)
        item.messages_sent += 1
        db.commit()
        db.refresh(item)
        return item
    else:
        db_post = DailyToxicityObj(
        user_id=recivedObj.user_id,
        day=date.today(),
        total_index=int(recivedObj.index * 100),
        messages_sent=1
    )
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    