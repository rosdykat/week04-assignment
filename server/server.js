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

app.get("/", (request, response) => {
  response.json({ message: "Welcome to my server. This is the root route!" });
});

// root route

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

app.get("/comments", async (request, response) => {
  // ! THIS WAS AN ERROR. Remember you cannot run two response.jsons in a .get
  // response.json({ message: "This is the comments response" });
  const result = await db.query(`SELECT * FROM comments`); // Selecting all rows in the databse
  // I think I need to filter data to return the ID query string, to be able to delete it??
  let data = query.rows;
  if (queryString) {
    data = data.filter((item) => {
      return item.comments.id === queryString;
    });
  }

  response.json(result.rows); //parsing the rows to the client as JSON
});

// This is handling posts requests, inserting the data into the comments table in my database (using the SQL I wrote in supabase)
// This then sends the result back as a JSON response

// ====== DELETE

// app.get("/comments", function (req,res){

// })
