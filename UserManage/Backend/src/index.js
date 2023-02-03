const express=require('express');
const logger = require('./logger');
const routes=require('./routes');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser  = require('cookie-parser');

const app=express();
const port=process.env.PORT || 3000;

app.use(cookieParser())
app.use(cors())
mongoose.set("strictQuery", false);
mongoose.connect(
    "mongodb://127.0.0.1:27017/",
    {
      dbName:"AssignmentDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err ? console.log(err) : console.log(
        "Connected to AssignmentDB database")
  );





function startserver(){
    app.use(express.json());
    app.use('/api',routes);


    app.listen(port,()=>{
        logger.info(`Server listening at http://localhost:${port}`);
    });

}

module.exports=startserver;