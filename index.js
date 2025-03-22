const express = require("express");
const { PrismaClient } = require("@prisma/client");

// Initialize Prisma Client for database operations
const prisma = new PrismaClient();

// Create an Express application
const app = express();
app.use(express.json()); // Middleware to parse incoming JSON requests

// POST /identify endpoint - Handles contact reconciliation
app.post("/identify", async (req, res) => {
    const { email, phoneNumber } = req.body;

    // Step 1: Check if a contact with the given email or phoneNumber already exists
    let existingContacts = await prisma.contact.findMany({
        where: { OR: [{ email }, { phoneNumber }] }
    });

    // Step 2: If no existing contact is found, create a new primary contact
    if (existingContacts.length === 0) {
        const newContact = await prisma.contact.create({
            data: { email, phoneNumber, linkPrecedence: "primary" }
        });

        // Return response with new primary contact details
        return res.json({
            primaryContactId: newContact.id,
            emails: [email],
            phoneNumbers: [phoneNumber],
            secondaryContactIds: []
        });
    } else {
        // Step 3: Identify the primary contact (first primary found or fallback to the first contact)
        let primary = existingContacts.find(c => c.linkPrecedence === "primary") || existingContacts[0];

        // Step 4: Get all secondary contacts linked to the primary
        let secondaryContacts = existingContacts.filter(c => c.id !== primary.id);

        // Step 5: If this exact email & phoneNumber pair is not already present, create a new secondary contact
        if (!existingContacts.some(c => c.email === email && c.phoneNumber === phoneNumber)) {
            const newSecondary = await prisma.contact.create({
                data: { email, phoneNumber, linkedId: primary.id, linkPrecedence: "secondary" }
            });

            // Add the newly created secondary contact to the list
            secondaryContacts.push(newSecondary);
        }

        // Step 6: Prepare the response with all associated contacts
        return res.json({
            primaryContactId: primary.id,
            emails: [...new Set(secondaryContacts.map(c => c.email).concat(email))], // Unique email list
            phoneNumbers: [...new Set(secondaryContacts.map(c => c.phoneNumber).concat(phoneNumber))], // Unique phone number list
            secondaryContactIds: secondaryContacts.map(c => c.id) // IDs of secondary contacts
        });
    }
});

// Start the Express server on port 3000
app.listen(3000, "0.0.0.0", () => console.log("Server running on port 3000"));
