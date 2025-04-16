
## Set up
In ThinkTwice\app\back

#### 1. Create a virtual environment inside the project folder:

```
python -m venv env
```

#### 2.Activate the virtual environment:

* On Windows (Git Bash):
```
source env/Scripts/activate
```
* On Windows (PowerShell):
```
.\env\Scripts\Activate
```
* On Linux/macOS:
```
source env/bin/activate
```

#### 3.Activate the virtual environment:
```
pip install -r requirements.txt
```

#### 4.Activate the virtual environment:
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


### 🔢 `GET/analyse`

**Description:**  
Get the value from perspective API from a given text

**Parameters:**
```json
{  "text": "you text here"}
```

**Response:**
```json
{
  "text": "the given text",
  "toxicity_value": 0.85173553
}
```



📌 Notes