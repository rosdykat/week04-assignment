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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });

// root route

app.get("/", (request, response) => {
  response.json({ message: "Welcome to my server. This is the root route!" });
});

// The app.post handles data sent to the server (user sending data)

app.post("/comments", (req, res) => {
  const body = req.body;
  console.log(body);
  const query = db.query(
    `INSERT INTO comments (name, information, comments) VALUES ($1, $2, $3)`,
    [body.name, body.information, body.comments]
  );
  res.json(query);
});

// =============================================
// TODO: A route to READ data from the databse

// app.get handles data REQUESTED from the server, I'm using this to request the stored data in the databse (from the form) and display it to my page (in main.js)

app.get("/comments", async (req, res) => {
  //query the database
  const query = await db.query(`SELECT * FROM comments`);
  //parse the query into JSON
  const data = res.json(query.rows);
});

//  ! My next step is to create something that deletes the stored data but I'm not sure i can pull it off. I think if I do it needs to be in the existing app.get("/comments")
