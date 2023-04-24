require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Note = require("../server/models/Note");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database Connected");
});

app.post("/api/note", async (req, res) => {

    const newNote = new Note(req.body);

    await newNote.save();

    res.send({success: true, message: "successfully added new note"});
});

app.get("/api/note", async (req, res) => {
    const notes = await Note.find({});

    res.send({success: true, notes: notes});
});

app.delete("/api/note", async (req, res) => {
    const noteId = req.body.id;

    await Note.findByIdAndDelete(noteId);

    res.send({success: true, message: "successfully deleted note"})

})



app.listen(process.env.SERVER_PORT, () => {
    console.log("Server running at port " + process.env.SERVER_PORT);
})