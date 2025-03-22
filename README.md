# identity-reconciliation
Project Overview

This API helps consolidate contact information based on email and phone numbers. It ensures that multiple contact details belonging to the same person are linked together, maintaining a primary contact ID and associated secondary contacts.

Features

Accepts email and phoneNumber as input.

Checks if the contact already exists in the database.

Creates a new primary contact if no existing match is found.

Links a new contact as secondary if it matches an existing one.

Allows seamless transformation of primary contacts into secondary ones if needed.

Returns structured contact details including primaryContactId, emails, phoneNumbers, and secondaryContactIds.

Setup & Installation

Prerequisites

Ensure you have the following installed:

Node.js & npm

MySQL/PostgreSQL database (AWS RDS recommended)

Git

Steps to Run Locally

Clone the repository:

git clone git@github.com:iraleGurudatta/identity-reconciliation.git
cd identity-reconciliation

Install dependencies:

npm install

Create a .env file with the following content:

DATABASE_URL="postgresql://username:password@your-rds-endpoint:5432/your-database"

Apply database migrations:

npx prisma migrate dev --name init

Start the server:

node index.js

The API will be available at http://localhost:3000/.

API Endpoints

1. Identify Contact (POST /identify)

This endpoint processes a contact request and returns the consolidated contact details.

Request:

{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}

Response:

{
  "primaryContactId": 1,
  "emails": ["user@example.com"],
  "phoneNumbers": ["1234567890"],
  "secondaryContactIds": [2, 3]
}

2. Health Check (GET /)

A simple endpoint to check if the API is running.

Response:

Identity Reconciliation API is running!

Deploying to AWS EC2

Steps to Deploy

Connect to the EC2 instance:

ssh -i your-key.pem ec2-user@your-ec2-public-ip

Run the API in the background:

nohup node index.js > output.log 2>&1 &
disown

Test the API from your local machine:

curl -X POST http://<YOUR_EC2_PUBLIC_IP>:3000/identify -H "Content-Type: application/json" -d '{"email": "test@example.com", "phoneNumber": "9876543210"}'

License

This project is open-source and free to use for learning and development purposes.

Contributing

If you'd like to contribute:

Fork the repository

Create a new branch

Commit your changes

Push the branch and create a pull request

This API is designed to be a simple yet effective solution for contact consolidation. Feel free to improve and expand it!

