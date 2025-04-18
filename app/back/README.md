
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

### 🔢 `GET/checkWord`

**Description:**  
Check if one of the words of a given text is in DB

**Parameters:**
```json
{  "text": "you text here"}
```

**Response:**
```json
{
  "toxic_words": [
    "plouc",
    "putois"
  ]
}
```

📌 Notes