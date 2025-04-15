
## Set up
In ThinkTwice\app\back
```
pip install fastapi
```
```
pip install uvicorn
```
```
uvicorn main:app --reload
```


## 📘 Endpoints

---
### ✅ `GET /true`

**Description:**  
Returns the string `true`.

**Response:**
```json
{"awnser" :"true"}
```



### ❌ `GET /false`

**Description:**  
Returns the string `"false"`.

**Response:**
```json
{"awnser" :"false"}
```

### 🎲 `GET /tof`

**Description:**  
Randomly returns `"true"` or `"false"` with a 50/50 chance.

**Response:**
```json
{"awnser" :"false"}
```


### 🔢 `GET/note`

**Description:**  
Returns a random float between ``0.0`` and ``1.0``, rounded to one decimal place.

**Response:**
```json
{"awnser" : "0.0"}
```



📌 Notes