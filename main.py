from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id:int
    content:str
    
memos=[]    

app = FastAPI()

@app.post("/menos")
def cretmeno(memo:Memo):
    memos.append(memo)
    return '메모 추가'

@app.get("/memos")
def redmo():
    return memos

@app.put("/memos/{memo_id}")
def putmemon(req_memo:Memo):
    for memo in memos:
        if memo.id==req_memo.id:
            memo.content=req_memo.content
            return '수정 완료'
    return '수정 실패'    

@app.delete("/memos/{memo_id}")
def delemeno(memo_id):
    for index,memo in enumerate(memos):
        if memo.id==memo.id:
            memos.pop(index)
            return '삭제 완료'
    return '삭제 실패'
app.mount("/", StaticFiles(directory='static', html=True), name='static')