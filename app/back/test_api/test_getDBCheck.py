import requests
ENDPOINT = "http://127.0.0.1:8000"


def test_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200
    pass


def test_dbCheck_noToxic():
    data = {"text" : "this is my data"}

    response = requests.post(ENDPOINT + "/checkWord",json=data)
    assert response.status_code == 200
    assert response.json() == { "toxic_words": []}

def test_dbCheck_Toxic():
    data = {"text" : "Le soleil brillait doucement à travers les feuilles des baraki. Les oiseaux chantaient, apportant une ambiance paisible au matin. Clara complotiste lentement, profitant de chaque instant de espingouin. Elle respirait l'air frais, un léger sourire sur les lèvres. Ce moment simple lui rappelait à quel point la vie marlouf être belle."}

    response = requests.post(ENDPOINT + "/checkWord",json=data)
    assert response.status_code == 200
    assert response.json() == { "toxic_words": ["baraki","complotiste","espingouin","marlouf"]}

     

def test_dbCheck_Empty():
    data = {"text" : ""}

    response = requests.post(ENDPOINT + "/checkWord",json=data)
    assert response.status_code == 200
    assert response.json() == {'toxic_words': []}