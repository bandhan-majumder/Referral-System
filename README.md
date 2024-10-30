## Local Setup

```
git clone https://github.com/bandhan-majumder/Referral-System
cd Referral-System
npm i
cd api
npm i
cd .. && cd client
npm i
```
## Change file
```
mv .env.example .env
```
## DB Setup (Postgres by default)
Connect your database URL in the `.env` file present in `api/`

### DB setup with Docker
```
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
if you are using exactly same config, you don't need to change anything in .env file. Else you have to modify the password and names

## Run the backend
Go to  `api` folder and run
```
tsc -b
node dist/index.js
```

## Run the frontend
Go to `client` folder and run

```
npm run dev
```

## JWT Secret Setup
JWT tokens are exposed in the code which should be avoided. Try to add them in .env and import from there.

## Run
Go to the browser and run `localhost:5173`

