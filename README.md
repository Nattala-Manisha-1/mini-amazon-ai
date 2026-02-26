# Mini Amazon – AI Product Discovery

## Overview

This project is a mini product discovery application built with:

- **Backend:** Django + Django REST Framework
- **Frontend:** React
- **AI Layer:** Structured LLM-style query interpretation (mocked service layer)

The application allows users to:

1. Browse products
2. Search using natural language (e.g., "Gaming under 70000")
3. Get AI-generated summaries
4. Filter products dynamically based on interpreted query

---

## Tech Stack

### Backend
- Django
- Django REST Framework
- Python
- Environment-based configuration (.env)

### Frontend
- React
- useState & useEffect hooks
- Component-based architecture

---

## Project Structure
miniama/
│
├── backend/
│ ├── config/
│ ├── products/
│ ├── manage.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── ProductCard.js
│ │ └── App.js
│ └── package.json
│
└── README.md


---

## Backend Setup

Navigate to backend folder:

Create virtual environment:
python -m venv venv
venv\Scripts\activate # Windows

Install dependencies:
pip install -r requirements.txt


Run server:
python manage.py runserver


Backend runs at:
http://127.0.0.1:8000/

---

## Frontend Setup

Navigate to frontend folder:
cd frontend


Install dependencies:
npm install

Run React app:
npm start

Frontend runs at:
http://localhost:3000


---

## API Endpoints

### GET /api/products

Returns product catalog.

Example response:

Json
{
  "products": [...]
}

# POST /api/ask

Accepts natural language query:

{
  "query": "Gaming under 70000"
}

Returns structured output:

{
  "productIds": [2, 8],
  "summary": "Products selected based on your query."
}

AI / LLM Logic

The backend includes a structured AI service layer:

Interprets keywords

Matches against product name, category, tags, description

Extracts price values dynamically

Returns structured JSON output

Handles invalid price ranges

This design allows easy replacement with a real OpenAI API in production.

Features Implemented

Product listing view

Natural language search

Dynamic price filtering

Category & keyword matching

Loading state handling

Reusable React component (ProductCard)

Image rendering

Clean UI layout

Error handling in backend

Time Spent

Approximately 3–4 hours.

Possible