#Hyte back-end server

Node.Js + Express

Start dev server: 'npm run dev' / 'npm start'
# Features
The API allows for fetching (GET), adding (POST), editing (PUT) and removing (DELETE) Diary entries (/api/entries) endpoint. The API also allows for fetching (GET), adding (POST) and editing (PUT) the users endpoint (/api/users). It is also possible to
fetch (GET) the user's info throught the (api/auth/me) endpoint and login to the site and obtain a token throught (GET) the (api/users/login) endpoint.
Further information about how to interact with the API can be found below. 

# Routes: 
### Health Diary REST API - HTTP requests for testing endpoints

##
## /api/entries endpoint
##

### Get all entries
### requires token
GET http://localhost:3000/api/entries
Authorization: Bearer token

### Get entries by id
### requires token
GET http://localhost:3000/api/entries/5

### Post entry
POST http://localhost:3000/api/entries
content-type: application/json
Authorization: Bearer token
{
  "entry_date": "2024-03-17",
  "mood": "Happy",
  "weight": 69.69,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

### Update entry
PUT http://localhost:3000/api/entries/5
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Even more happy now",
  "weight": 69.69,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

### Delete entry
DELETE http://localhost:3000/api/entries/14

##
## /api/users endpoint
##

### Get all users
GET http://localhost:3000/api/users
Authorization: Bearer token


### Get user by id
GET http://localhost:3000/api/users/1
Authorization: Bearer token

### Post users (create a new user)
POST http://localhost:3000/api/users
content-type: application/json

{
  "username": "test-newuser",
  "password": "testnewsecret",
  "email": "test.newuser@example.com"
}

### Update user
### requires token
PUT http://localhost:3000/api/users/19
content-type: application/json
Authorization: Bearer token
{
  "username": "test-newuser",
  "password": "testnewsecret",
  "email": "test.newuser@example.com"
}

### Delete user
### requires token
DELETE http://localhost:3000/api/users/20
Authorization: Bearer token

### Post login
POST http://localhost:3000/api/users/login
content-type: application/json

{
  "username": "Newuser",
  "password": "newsecret"
}

### Get details of logged in user (getME)
GET http://localhost:3000/api/auth/me
Authorization: Bearer token

# Database
The backend uses an SQL database. The BDMS used during development was MySQL. The structure of the database is described in the following image:
![Näyttökuva 2024-03-19 003816](https://github.com/OrvokkiK/HYTE-BE-2024/assets/122262462/60a298f6-890f-47b1-8867-8dfc026685af)

# Demo Video
demo video (requiers sign-in, accessible only to Metropolia UAS organisation members):
https://metropoliafi-my.sharepoint.com/:v:/g/personal/orvokkk_metropolia_fi/EbwkMliA0ERGrNGdMZz0hcEBwRJ-qgYISEFjSmWCUaP_bg

# Frontend


# Known Bugs
- Delete users request isn't completed in the backend (DELETE http://localhost:3000/api/users/20)
- User cannot be deleted if user has db entries in other tables
- missing confirmation messages when interacting with frontend

# Sources
- Background image: Zakaria Boumliha. Image taken Nov 23, 2018. Uploaded August, 21st, 2019. "Man Running on Sand Field". Morocco. https://www.pexels.com/photo/man-running-on-sand-field-2827392/

- Course materials
