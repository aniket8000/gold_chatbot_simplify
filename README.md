# Kuber.ai – Digital Gold Chatbot

**Kuber.ai** is a smart conversational AI assistant focused on **gold investment**. Users can chat with the AI to learn about gold, and **buy digital gold directly** from the spp with the help of Kuber.ai .

---

## 🛠 Features

- AI-powered chat about gold using Google Gemini LLM  
- Interactive suggestions for buying digital gold  
- Gold purchase flow with quantity input, confirmation, and automatic cost calculation  
- Backend stores all gold purchases in MongoDB  
- Fully responsive React frontend

---

## ⚙️ Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Atlas or local)  
**AI Service:** Google Generative AI (Gemini API)  

---

## 💻 How It Works

1. User types a question about gold in the chat.  
2. AI responds with a concise answer and a suggestion to buy gold.  
3. If the user clicks **Yes, Buy Gold**, a modal opens:  
   - Step 1: Enter quantity in grams  
   - Step 2: Confirm purchase and see total cost  
   - Step 3: Success message after purchase is recorded  
4. Backend saves the purchase in MongoDB with date, time, quantity, and payment mode.

---

## 🔄 Workflow

- User Chat Input → AI Response → Suggestion → Buy Gold Modal → Confirm Purchase → Save in DB → Success Message

## API Endpoints

## 1. AI Chat
- POST /api/ai/ask

-> Request Body (JSON):
````
 {

  "question": "Tell me about gold"

 }
````
-> Success Response (200):
````

{

  "answer": "Gold is a precious metal often used for investment. Buying digital gold is convenient and safe.",
  
  "suggestion": "Would you like to buy digital gold from our app?"

}
````

## 2. Buy Gold
- POST /api/gold/buy

-> Request Body (JSON):
````
{
  "quantity": 5
}
````
- quantity (Number) – Quantity of gold in grams (must be > 0)

-> Success Response (201):
````
{
  "message": "Gold purchase successful",
  "purchase": {
    "_id": "64ef3a2f1b2345abcd1234ef",
    "quantity": 5,
    "date": "2025-08-26",
    "time": "10:50:30",
    "modeOfPayment": "Digital",
    "createdAt": "2025-08-26T05:20:15.123Z",
    "updatedAt": "2025-08-26T05:20:15.123Z"
  }
}
````

## How to Run Project

## -> Backend
````
cd backend
npm install
# create .env with:
# PORT=5000
# MONGO_URI=<your-mongodb-uri>
# GEMINI_API_KEY=<your-google-gemini-key>

npm run dev
````
### -> Frontend
````
cd frontend
npm install
npm start
````
- Open http://localhost:3000 in your browser.

- Chat with Kuber.ai and try buying digital gold.

