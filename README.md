
# Surface Analytics with Next.js, Prisma, PostgreSQL

A lightweight analytics system to track user interactions on a webpage, including page views, clicks. The data is sent to a next.js API and stored in a PostgreSQL database. Unique visitors are tracked using `cookies`.


## 🏠 Homepage
Welcome to Surface Analytics, a lightweight JavaScript library to track and log user interactions (page views, clicks, and form inputs) using Next.js, Prisma, and PostgreSQL.

## Tech Stack
- Frontend: JavaScript (public surface_analytics.js)
- Backend: Next.js for server-side rendering and API routes
- Database: PostgreSQL
- ORM: Prisma
## Features

- Real-time Event Tracking: Track page views, user clicks, and form submissions.

- Database Integration: Log events directly into a PostgreSQL database.

- Unique Visitor Tracking: Identify visitors via cookies.

- API Endpoint: An easy-to-use Next.js API for event collection.

- Analytics Dashboard (Optional): Display logged analytics in a clean UI (optional).



## Installation

#### 1. Clone the Repo

```http
  git clone https://github.com/manojgupta2309/surface_analyics_script.git
  cd surface_analyics_script
```


#### 2. Install Dependencies

```http
  npm install
```


#### 3. Configure Environment

```http
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
```


#### 4. Set Up Database

```http
npx prisma migrate dev --name init

```
#### 5. Start Development Server

```http
npm run dev
```


## Usage
- The analytics script tracks:

- Page Views
- Clicks

- These events are sent to the `/api/analytics` endpoint and saved in the database.

## Prisma Schema

```http
model Event {
  id        Int      @id @default(autoincrement())
  eventType String
  metadata  Json
  visitorId String
  createdAt DateTime @default(now())
```

## API Route
GET /api/analytics `response`
```http
[{
        "id": 100,
        "eventType": "page_view",
        "metadata": {
            "url": "http://localhost:3000/",
            "title": "Create T3 App",
            "referrer": "http://localhost:3000/"
        },
        "visitorId": "f3dc21fb-01e2-4fcb-aed9-c6823416b820",
        "createdAt": "2024-09-21T00:24:01.372Z"
    }]
```

## API Route
POST /api/analytics `request`
```http
{
  "eventType": "element_clicked",
  "metadata": {
    "elementId": null,
    "elementClasses": "MuiButtonBase-root",
    "elementTag": "BUTTON",
    "textContent": "Install tag"
  }
}

```
POST /api/analytics `response`

`
{"success":true,"eventId":282}
`

Tracks events and stores them in the database.

Example request body:








## Author

👤 **Manoj Gupta**


## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check 
