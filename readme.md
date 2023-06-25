# API structure F1 documents

## Requirements System
```sh
- Docker installed (MACOS or WINDOWS)
```

Pull and install project to local / production

```sh
git clone git@github.com:trankyhoathanh/f1_api.git
cd f1_api
docker compose up -d
```

## Crawling data
```sh
run http://localhost:3000/race-result
waiting a minutes...

After crawling data, you will see at 
{"status":200,"data":"Get data from race result succeed !"}
```

## Public API (https://localhost:3001/)
# /race?params
```sh
GET /race?params

Params structure : 
grand_prix (string)
winner (string)
car (string)
laps (number)

Example:
http://localhost:3001/race?grand_prix=Australia&car=Ferrari&winner=Schumacher

Responses: 
200 application/json; charset=utf-8
400 application/json; charset=utf-8

Return model example succeed : 
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "grand_prix": "Australia",
            "date": "2000-03-12T00:00:00.000Z",
            "winner": "Schumacher",
            "car": "Ferrari",
            "laps": 58,
            "time": "1:34:01.987",
            "created_at": "2023-06-23T23:50:18.727Z",
            "updated_at": "2023-06-23T23:50:18.727Z"
        }
    ]
}

Return model example failed :
{
    "_original": {
        "laps": "s"
    },
    "details": [
        {
            "message": "\"laps\" must be a number",
            "path": [
                "laps"
            ],
            "type": "number.base",
            "context": {
                "label": "laps",
                "value": "s",
                "key": "laps"
            }
        }
    ]
}
```

# /race/ranking?params
```sh
GET /race/ranking?params

Params structure : 
year (number) (required)
type  (string) (required) (accept winner / car)
name (string)

Example:
http://localhost:3001/race/ranking?year=2022&type=winner
http://localhost:3001/race/ranking?year=2022&type=car

Responses: 
200 application/json; charset=utf-8
400 application/json; charset=utf-8

Return model example succeed Winner : 
{
    "status": 200,
    "data": [
        {
            "winner": "Verstappen",
            "times": "15"
        },
        {
            "winner": "Russell",
            "times": "1"
        }
    ]
}

Return model example succeed Car : 
{
    "status": 200,
    "data": [
        {
            "car": "Red Bull Racing RBPT",
            "times": "17"
        },
        {
            "car": "Ferrari",
            "times": "4"
        },
        {
            "car": "Mercedes",
            "times": "1"
        }
    ]
}

Return model example failed :
{
    "_original": {
        "year": "2022"
    },
    "details": [
        {
            "message": "accept 'winner' or 'car'",
            "path": [
                "type"
            ],
            "type": "any.required",
            "context": {
                "label": "type",
                "key": "type"
            }
        }
    ]
}
```

