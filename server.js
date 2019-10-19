const express = require("express");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

const MongoClient = mongodb.MongoClient;
const mongoUrl =
  "mongodb+srv://59161146:02539d07c7@cluster0-fbqsx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const database = "pokemondb";
const collection = "pokemons";
const client = new MongoClient(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.post("/pokemons", async (req, res) => {
  let c = await client.connect().catch(err => {
    console.log("Error occurred when find to connect mongo");
    console.log(err);
    res.status(500).send({ error: err });
    return;
  });

  let db = c.db("pokemondb");
  let r = await db
    .collection("pokomons")
    .insertOne({ name: "Bulbasaur", type: "Grass" })
    .catch(err => {
      console.log("Error occurred when insert pokemon");
      console.log(err);
      res.status(500).send({ error: err });
      return;
    });

  res.status(201).send({ message: "Create pokemon successfully" });

  // client.connect((err, client) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send({ error: err });
  //     return;
  //   }

  //   let db = client.db(database);
  //   db.collection(collection).insertOne(
  //     { name: "Bulbasaur", type: "Grass" },
  //     (err, result) => {
  //       res.status(201).send({ message: "Create pokemon successfully" });
  //     }
  //   );
  // });

  res.status(200).send({ message: "Finished too early" });
});

app.get("/airbnb/list-reviews", async (req, res) => {
  let c = await client.connect().catch(err => {
    console.log("Error occurred when find to connect mongo");
    console.log(err);
    res.status(500).send({ error: err });
    return;
  });

  let db = c.db("sample_airbnb");
  let r = await db
    .collection("listingsAndReviews")
    .find({})
    .limit(10)
    .toArray()
    .catch(err => {
      console.log("Error occurred when find listings and reviews");
      console.log(err);
      res.status(500).send({ error: err });
      return;
    });

  res.send(r);

  // client.connect((err, client) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send({ error: err });
  //     return;
  //   }

  //   let db = client.db("sample_airbnb");
  //   db.collection("listingsAndReviews")
  //     .find({})
  //     .limit(10)
  //     .toArray((err, result) => {
  //       res.send(result);
  //     });
  // });
});

app.listen(3000, () => console.log("Pokemon Api started at port 3000"));
