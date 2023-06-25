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
run at browser http://localhost:3000/race-result
waiting a minutes...

After crawling data, you will see at 
{"status":200,"data":"Get data from race result succeed !"}
```

## Public API (https://localhost:3001/)
|Endpoint|Params|Description|
|---|---|---|
|/race/winner/:id|id : name of winner   |http://localhost:3001/race/winner/Michael%20Schumacher?grand_prix=Malaysia&year=2004|
|/race/car/:id|id : name of car   |http://localhost:3001/race/car/Ferrari?year=2022|
|/race/grand_prix/:id|id : name of grand prix   |http://localhost:3001/race/grand_prix/Bahrain?year=2022|
|/race/laps/:id|id : number of laps   |http://localhost:3001/race/laps/60?year=2000|
|/race/year/:id|id : year number|http://localhost:3001/race/year/2000?grand_prix=Australia|

# /race/winner/:id
```sh
GET /race/winner/:id

Example:
http://localhost:3001/race/winner/Michael%20Schumacher?grand_prix=Malaysia&year=2004

Resonse succeed : 
200 application/json; charset=utf-8
{
    "list": [
        {
            "id": 69,
            "grand_prix": "Malaysia",
            "date": "2004-03-21T00:00:00.000Z",
            "winner": "Michael Schumacher",
            "car": "Ferrari",
            "laps": 56,
            "time": "1:31:07.490",
            "created_at": "2023-06-25T05:59:14.909Z",
            "updated_at": "2023-06-25T05:59:14.909Z"
        }
    ]
}
```

# /race/car/:id
```sh
GET /race/car/:id

Example:
http://localhost:3001/race/car/Ferrari?year=2022

Resonse succeed : 
200 application/json; charset=utf-8
{
    "list": [
        {
            "id": 412,
            "grand_prix": "Bahrain",
            "date": "2022-03-20T00:00:00.000Z",
            "winner": "Charles Leclerc",
            "car": "Ferrari",
            "laps": 57,
            "time": "1:37:33.584",
            "created_at": "2023-06-25T05:59:18.609Z",
            "updated_at": "2023-06-25T05:59:18.609Z"
        },
        {
            "id": 414,
            "grand_prix": "Australia",
            "date": "2022-04-10T00:00:00.000Z",
            "winner": "Charles Leclerc",
            "car": "Ferrari",
            "laps": 58,
            "time": "1:27:46.548",
            "created_at": "2023-06-25T05:59:18.618Z",
            "updated_at": "2023-06-25T05:59:18.618Z"
        },
        {
            "id": 421,
            "grand_prix": "Great Britain",
            "date": "2022-07-03T00:00:00.000Z",
            "winner": "Carlos Sainz",
            "car": "Ferrari",
            "laps": 52,
            "time": "2:17:50.311",
            "created_at": "2023-06-25T05:59:18.634Z",
            "updated_at": "2023-06-25T05:59:18.634Z"
        },
        {
            "id": 422,
            "grand_prix": "Austria",
            "date": "2022-07-10T00:00:00.000Z",
            "winner": "Charles Leclerc",
            "car": "Ferrari",
            "laps": 71,
            "time": "1:24:24.312",
            "created_at": "2023-06-25T05:59:18.636Z",
            "updated_at": "2023-06-25T05:59:18.636Z"
        }
    ]
}
```

# /race/grand_prix/:id
```sh
GET /race/grand_prix/:id

Example:
http://localhost:3001/race/grand_prix/Bahrain?year=2022

Resonse succeed : 
200 application/json; charset=utf-8
{
    "list": [
        {
            "id": 412,
            "grand_prix": "Bahrain",
            "date": "2022-03-20T00:00:00.000Z",
            "winner": "Charles Leclerc",
            "car": "Ferrari",
            "laps": 57,
            "time": "1:37:33.584",
            "created_at": "2023-06-25T05:59:18.609Z",
            "updated_at": "2023-06-25T05:59:18.609Z"
        }
    ]
}
```

# /race/laps/:id
```sh
GET /race/laps/:id

Example:
http://localhost:3001/race/laps/60?year=2000

Resonse succeed : 
200 application/json; charset=utf-8
{
    "list": [
        {
            "id": 4,
            "grand_prix": "Great Britain",
            "date": "2000-04-23T00:00:00.000Z",
            "winner": "David Coulthard",
            "car": "McLaren Mercedes",
            "laps": 60,
            "time": "1:28:50.108",
            "created_at": "2023-06-25T05:59:14.108Z",
            "updated_at": "2023-06-25T05:59:14.108Z"
        }
    ]
}
```

# /race/year/:id
```sh
GET /race/year/:id

Example:
http://localhost:3001/race/year/2000?grand_prix=Australia

Resonse succeed : 
200 application/json; charset=utf-8
{
    "list": [
        {
            "id": 1,
            "grand_prix": "Australia",
            "date": "2000-03-12T00:00:00.000Z",
            "winner": "Michael Schumacher",
            "car": "Ferrari",
            "laps": 58,
            "time": "1:34:01.987",
            "created_at": "2023-06-25T05:59:14.098Z",
            "updated_at": "2023-06-25T05:59:14.098Z"
        }
    ]
}
```

|Endpoint|Params|Description|
|---|---|---|
|/ranking?params|view details below |http://localhost:3001/ranking?year=2022&type=winner|
|||http://localhost:3001/ranking?year=2022&type=car|
|/ranking/:type/:id|Type : winner/car, id : name of winner/car|http://localhost:3001/ranking/winner/Michael Schumacher?to_year=2005&from_year=2003|
|||http://localhost:3001/ranking/car/McLaren%20Mercedes?to_year=2005&from_year=2003|

# /ranking?params
```sh
GET /ranking?params

Params structure : 
year (number) (required)
type  (string) (required) (accept winner / car)
name (string)

Response Succeed Winner :
http://localhost:3001/ranking?year=2022&type=winner
200 application/json; charset=utf-8
{
    "list": [
        {
            "winner": "Max Verstappen",
            "times": "15"
        },
        {
            "winner": "Charles Leclerc",
            "times": "3"
        },
        {
            "winner": "Sergio Perez",
            "times": "2"
        },
        {
            "winner": "George Russell",
            "times": "1"
        },
        {
            "winner": "Carlos Sainz",
            "times": "1"
        }
    ]
}

Response succeed Car :
http://localhost:3001/ranking?year=2022&type=car
200 application/json; charset=utf-8
{
    "list": [
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

Response failed :
http://localhost:3001/ranking?year=2022
400 application/json; charset=utf-8
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

# /ranking/:type/:id?params
```sh
GET /ranking/:type/:id?params

Params structure : 
from_date (number)
to_date (number)

Response succeed Winner :
http://localhost:3001/ranking/winner/Michael Schumacher?to_year=2005&from_year=2003
200 application/json; charset=utf-8
{
    "list": [
        {
            "date_year": "2003",
            "win": "Michael Schumacher",
            "times": "6",
            "rank": "1"
        },
        {
            "date_year": "2004",
            "win": "Michael Schumacher",
            "times": "13",
            "rank": "1"
        },
        {
            "date_year": "2005",
            "win": "Michael Schumacher",
            "times": "1",
            "rank": "3"
        }
    ]
}

Response succeed Car : 
http://localhost:3001/ranking/car/McLaren Mercedes?to_year=2005&from_year=2003
200 application/json; charset=utf-8
{
    "list": [
        {
            "date_year": "2003",
            "win": "McLaren Mercedes",
            "times": "2",
            "rank": "3"
        },
        {
            "date_year": "2004",
            "win": "McLaren Mercedes",
            "times": "1",
            "rank": "2"
        },
        {
            "date_year": "2005",
            "win": "McLaren Mercedes",
            "times": "10",
            "rank": "1"
        }
    ]
}

Response failed :
http://localhost:3001/ranking/winner/Michael Schumacher?to_year=x&from_year=2003
400 application/json; charset=utf-8
{
    "_original": {
        "to_year": "x",
        "from_year": "2003"
    },
    "details": [
        {
            "message": "\"to_year\" must be a number",
            "path": [
                "to_year"
            ],
            "type": "number.base",
            "context": {
                "label": "to_year",
                "value": "x",
                "key": "to_year"
            }
        }
    ]
}

Response failed :
http://localhost:3001/ranking/car/Mercedes?to_year=x&from_year=2003
400 application/json; charset=utf-8
{
    "_original": {
        "to_year": "x",
        "from_year": "2003"
    },
    "details": [
        {
            "message": "\"to_year\" must be a number",
            "path": [
                "to_year"
            ],
            "type": "number.base",
            "context": {
                "label": "to_year",
                "value": "x",
                "key": "to_year"
            }
        }
    ]
}
```

|Endpoint|Params|Description|
|---|---|---|
|/race?params|view details below |http://localhost:3001/race?grand_prix=Australia&car=Ferrari&winner=Michael Schumacher|
# /race?params
```sh
GET /race?params

Params structure : 
grand_prix (string)
winner (string)
car (string)
laps (number)

Example:
http://localhost:3001/race?grand_prix=Australia&car=Ferrari&winner=Michael Schumacher

Response succeed : 
200 application/json; charset=utf-8
{
    "list": [
        {
            "id": 1,
            "grand_prix": "Australia",
            "date": "2000-03-12T00:00:00.000Z",
            "winner": "Michael Schumacher",
            "car": "Ferrari",
            "laps": 58,
            "time": "1:34:01.987",
            "created_at": "2023-06-25T05:59:14.098Z",
            "updated_at": "2023-06-25T05:59:14.098Z"
        },
        {
            "id": 18,
            "grand_prix": "Australia",
            "date": "2001-03-04T00:00:00.000Z",
            "winner": "Michael Schumacher",
            "car": "Ferrari",
            "laps": 58,
            "time": "1:38:26.533",
            "created_at": "2023-06-25T05:59:14.342Z",
            "updated_at": "2023-06-25T05:59:14.342Z"
        },
        {
            "id": 35,
            "grand_prix": "Australia",
            "date": "2002-03-03T00:00:00.000Z",
            "winner": "Michael Schumacher",
            "car": "Ferrari",
            "laps": 58,
            "time": "1:35:36.792",
            "created_at": "2023-06-25T05:59:14.533Z",
            "updated_at": "2023-06-25T05:59:14.533Z"
        },
        {
            "id": 68,
            "grand_prix": "Australia",
            "date": "2004-03-07T00:00:00.000Z",
            "winner": "Michael Schumacher",
            "car": "Ferrari",
            "laps": 58,
            "time": "1:24:15.757",
            "created_at": "2023-06-25T05:59:14.906Z",
            "updated_at": "2023-06-25T05:59:14.906Z"
        }
    ]
}

Response failed :
http://localhost:3001/race?grand_prix=Australia&car=Ferrari&winner=Michael Schumacher&laps=s
400 application/json; charset=utf-8
{
    "_original": {
        "grand_prix": "Australia",
        "car": "Ferrari",
        "winner": "Michael Schumacher",
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