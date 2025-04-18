
from fastapi import FastAPI, HTTPException, Depends, status
from routes.get_analyze import get_analyze
from routes.get_DBCheck import get_DBCheck
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello World"}


routers = [
    get_analyze.router,
    get_DBCheck.router,
]

for router in routers:
    app.include_router(router)