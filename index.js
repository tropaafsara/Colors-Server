const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());




// Mongodb starts from here ------------------------------------------------------------
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c9tdfjs.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const colorsCollection = client.db('colorDB').collection('colors');


    // app.get("/searchBycolor/:text", async (req, res) => {
    //   const searchText = req.params.text;
    //   const result = await colorsCollection
    //     .find({
    //       $or: [
    //         { toyName: { $regex: searchText, $options: "i" } },
    //       ],
    //     })
    //     .toArray();
    //   res.send(result);
    // });



    app.get('/colors', async (req, res) => {
      const cursor = colorsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })
    app.post('/colors', async (req, res) => {
      const newColors = req.body;
      console.log(newColors);
      const result = await colorsCollection.insertOne(newColors);
      res.send(result);
  })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// Mongodb connection ends  here ________________________________________________________________________

app.get('/', (req, res) => {
    res.send('Colors making server is running')
})

app.listen(port, () => {
    console.log(`Colors Server is running on port: ${port}`)
})


