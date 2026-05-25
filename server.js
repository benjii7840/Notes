import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  // Here you would typically save the note to the database
  res.status(201).json({ title, content });
});
app.get("/notes", (req, res) => {
  // Here you would typically retrieve notes from the database
  res.json([{ title: "Sample Note", content: "This is a sample note." }]);
});

app.put("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  // Here you would typically update the note in the database
  res.json({ id, title, content });
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  // Here you would typically delete the note from the database
  res.json({ message: "Note deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
