from pydantic import BaseModel
from datetime import date

class Text(BaseModel):
    text: str


class OnSend(BaseModel):
    id: str
    index: str
    url: str

class DailyToxicity(BaseModel):

    user_id: str
    day: str
    total_index : int
    messages_sent: date 