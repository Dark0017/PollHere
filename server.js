const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
//db connection
require('./startup/db')();

//routes 
require("./startup/routes")(app);
if(process.env.NODE_ENV==="production")
{
    app.use(express.static("client/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    })
}
const port=process.env.port||7000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});
