# 🎬 Moviewatch-Fullstack

En fullstack filmsida byggd med **React**, **Express** och **MongoDB**.  
Användare kan skapa konto, logga in, lägga till filmer i sin **watchlist**, ge betyg och skriva recensioner.  
Projektet använder **TheMovieDB API** för att hämta information om kommande, aktuella och topprankade filmer.

---

## 🚀 Funktioner

- 🔐 Skapa konto och logga in (lösenord krypteras med **bcrypt**)
- 🎞️ Se kommande, bioaktuella och topprankade filmer via **TheMovieDB API**
- 🔍 Sök efter filmer och lägg till i din **watchlist**
- ⭐ Klicka på stjärnor för att ge betyg och skriva recensioner
- 📖 Filmer du har recenserat hamnar under fliken **"Watched"**
- 💾 All användardata och recensioner sparas i **MongoDB**

---

## 🧰 Tech stack

| Del | Tekniker |
|-----|-----------|
| **Frontend** | React, Vite, Fetch API |
| **Backend** | Node.js, Express, Mongoose |
| **Databas** | MongoDB |
| **Säkerhet** | bcrypt, JWT |
| **Extern API** | TheMovieDB (TMDB) |

---

## 📂 Projektstruktur

Moviewatch-Fullstack/
│
├── Client/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators/
│   ├── swaggerConfig.js
│   ├── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json

# 🧑‍💻 Kom igång lokalt


### 1. Klona projektet
```bash
git clone https://github.com/<ditt-github-användarnamn>/MovieWatch-Fullstack.git
cd Moviewatchlist-Fullstack
```

### 2. Installera beroenden
```bash
cd Server
npm install

cd ../Client
npm install
```
### 3. Skapa miljövariabler
```bash
Server/.env
PORT=8000
MONGO_URI=<din_mongodb_connection_string>
JWT_SECRET=<din_jwt_hemlighet>
TMDB_ACCESS_TOKEN=<din_tmdb_access_token>

Client/.env
VITE_API_URL=http://localhost:8000
```

### 4. Starta projektet
```bash
Backend
cd ../Server
node server.js

Frontend
cd ../Client
npm run dev
```