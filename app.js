const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config();
const task = require("./routes/taskRoutes");
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'https://frontend-tracker.herokuapp.com'    
}));

app.use("/api/v1", task);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.88cdlvw.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((data) => {
    console.log(`mongodb connected: ${data.connection.host}`);
  })
  .catch(error => console.error('error', error));
  

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
