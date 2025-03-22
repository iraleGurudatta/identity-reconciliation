const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Identity Reconciliation API is running!");
});

app.listen(3000, "0.0.0.0", () => console.log("Server running on port 3000"));
