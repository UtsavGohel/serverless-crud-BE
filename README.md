# 🚀 Express User API with AWS Lambda, API Gateway, and DynamoDB

This project is a simple **Express.js-based CRUD API** running on **AWS Lambda**, exposed via **API Gateway**, and backed by **DynamoDB**. It uses the **Serverless Framework** for deployment and management.

---

## 📦 Features

- AWS Lambda functions for each endpoint
- Express.js routing
- CRUD operations (Create, Read, Update, Delete) for users
- DynamoDB as the primary datastore
- Deployed with Serverless Framework
- API Gateway handles HTTP requests

---

## 🧱 Technologies Used

- 🟨 Node.js + Express
- 🟦 AWS Lambda
- 🌐 Amazon API Gateway
- 🗄️ Amazon DynamoDB
- ☁️ Serverless Framework

---

## 🚀 Getting Started

1. **Node.js** (v14 or later): [Download here](https://nodejs.org/)
2. **NPM**: Comes with Node.js
3. **Serverless Framework (CLI)** – install globally:
   ```bash
   npm install -g serverless
   ```
4. **AWS CLI**: 
   ```bash
   aws configure
   ```

📦 Setup

### Clone the repository

```bash
git clone https://github.com/UtsavGohel/serverless-crud-BE.git
cd serverless-crud-BE
```
Install dependencies

```bash
npm install
```

Deploy to serverless

```bash
serverless deploy
```
📡 API Endpoints

| Method | Path          | Description       |
| ------ | ------------- | ----------------- |
| POST   | `/users`      | Create a new user |
| GET    | `/users`      | Get all users     |
| GET    | `/users/{id}` | Get user by ID    |
| PUT    | `/users/{id}` | Update a user     |
| DELETE | `/users/{id}` | Delete a user     |

### 📄 Example cURL Command
### ✅ Create User
```
curl -X POST https://calsq3p0v4.execute-api.us-east-1.amazonaws.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Utsav", "email": "utsav@example.com","address":"India","phone":1090198790,"age":22}'
```

### ✅ Get All User
```
curl -X GET https://calsq3p0v4.execute-api.us-east-1.amazonaws.com/users \
  -H "Content-Type: application/json" \
```
