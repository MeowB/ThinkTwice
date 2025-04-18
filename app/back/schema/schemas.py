from pydantic import BaseModel
from uuid import UUID
from datetime import date

class Text(BaseModel):
    text: str


class OnSend(BaseModel):
    user_id: UUID
    index: float
    url: str

class DailyToxicity(BaseModel):
    user_id: UUID
    day: date
    total_index : int
    messages_sent: int 
    class Config:
        orm_mode = True