# backend/main.py
from fastapi import FastAPI, HTTPException
from .services import fill_database, retrieve_similar_fragments
from .llm_client import query_llm
from pydantic import BaseModel

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    print("Iniciando carga de la base de datos de guiones...")
    fill_database()
    print("Carga de la base de datos completada.")

@app.get("/")
async def read_root():
    return {"message": "Backend is running"}

class QueryRequest(BaseModel):
    question: str

@app.post("/query/")
async def query(query_request: QueryRequest):
    try:
        # Recupera fragmentos relevantes y consulta al LLM
        relevant_fragments = retrieve_similar_fragments(query_request.question)
        response = query_llm(query_request.question, relevant_fragments[:2048])
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))