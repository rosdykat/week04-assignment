// imports
import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

// configs

const app = express();
app.use(express.json()); //Allows server to understand json data
// by adding cors to our server, we allow resources (data) to reach our server to be processed, even if they come from a different origin
app.use(cors());
dotenv.config();

// database pool

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// port set up

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// root route

app.get("/", (request, response) => {
  response.json({ message: "Welcome to my server. This is the root route!" });
});

// =============================================
// TODO: A route to READ data from the databse

app.get("/comments", (request, response) => {
  response.json({ message: "This is the comments response" });
});

app.post("/comments", express.json(), async (req, res) => {
  const { name, information, comments } = req.body;
  console.log(req.body);
  const query = await db.query(
    `INSERT INTO comments (name, information, comments) VALUES ($1, $2, $3)`,
    [name, information, comments]
  );
  res.json(query);
});

// TODO: A route to CREATE data in the database
