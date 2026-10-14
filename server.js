const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Add Student
app.post("/students", async (req, res) => {

    await client.connect();

    const db = client.db("StudentDB");
    const collection = db.collection("students");

    await collection.insertOne(req.body);

    res.send("Student Added");
});

// View Students
app.get("/students", async (req, res) => {

    await client.connect();

    const db = client.db("StudentDB");
    const collection = db.collection("students");

    const data = await collection.find().toArray();

    res.json(data);
});

// Delete Student
app.delete("/students/:id", async (req, res) => {

    await client.connect();

    const db = client.db("StudentDB");
    const collection = db.collection("students");

    await collection.deleteOne({
        studentId: parseInt(req.params.id)
    });

    res.send("Student Deleted");
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});
