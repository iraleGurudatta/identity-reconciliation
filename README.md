# identity-reconciliation
# Identity Reconciliation API

## Project Overview
This API helps consolidate contact information based on email and phone numbers. It ensures that multiple contact details belonging to the same person are linked together, maintaining a **primary contact ID** and associated secondary contacts.

## Features
- Accepts `email` and `phoneNumber` as input.
- Checks if the contact already exists in the database.
- Creates a **new primary contact** if no existing match is found.
- Links a new contact as **secondary** if it matches an existing one.
- Allows seamless transformation of primary contacts into secondary ones if needed.
- Returns structured contact details including `primaryContactId`, `emails`, `phoneNumbers`, and `secondaryContactIds`.

## Setup & Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js & npm**
- **MySQL/PostgreSQL** database (AWS RDS recommended)
- **Git**

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone git@github.com:iraleGurudatta/identity-reconciliation.git
   cd identity-reconciliation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```env
   DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/your-database"
   ```

4. Apply database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   node index.js
   ```
   The API will be available at `http://localhost:3000/`.

## API Endpoints
### 1. Identify Contact (`POST /identify`)
This endpoint processes a contact request and returns the consolidated contact details.

#### Request:
```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```

#### Response:
```json
{
  "primaryContactId": 1,
  "emails": ["user@example.com"],
  "phoneNumbers": ["1234567890"],
  "secondaryContactIds": [2, 3]
}
```

### 2. Health Check (`GET /`)
A simple endpoint to check if the API is running.

#### Response:
```
Identity Reconciliation API is running!
```

## Deploying to AWS EC2
### Steps to Deploy
1. Connect to the EC2 instance:
   ```bash
   ssh -i your-key.pem ec2-user@your-ec2-public-ip
   ```

2. Run the API in the background:
   ```bash
   nohup node index.js > output.log 2>&1 &
   disown
   ```

3. Test the API from your local machine:
   ```bash
   curl -X POST http://<YOUR_EC2_PUBLIC_IP>:3000/identify -H "Content-Type: application/json" -d '{"email": "test@example.com", "phoneNumber": "9876543210"}'
   ```

## License
This project is open-source and free to use for learning and development purposes.

## Contributing
If you'd like to contribute:
1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch and create a pull request

This API is designed to be a simple yet effective solution for contact consolidation. Feel free to improve and expand it!

