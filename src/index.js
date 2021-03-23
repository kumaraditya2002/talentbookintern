const express= require('express');
const app = express();
const env = require('dotenv');
const mongoose= require('mongoose');
const path = require('path');
const cors = require('cors');

//routes
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');

// Configure
env.config();
app.use(express.json());

// database connection

mongoose.connect(process.env.MONGODB_URI
  ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
  }
  ).then(() => {
    console.log('Database Connected');
  });

app.use(cors());  
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname, "public")));

app.use('/',adminRoutes);

const port = process.env.PORT || 3001;

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT} `);
});