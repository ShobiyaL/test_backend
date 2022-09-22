
const express = require('express');//creates an express application.
var cors = require('cors')
const app =express(); //creates an express application.

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
//api hit from nodejs to mongodb
const URL =("mongodb://localhost:27017");
const DB = "pract_mgdb_node";
let users=[];
//Middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))

//api or rest api url

app.get("/users",async function(req, res){
    // 
    try{
//step 1:create a collection b/w mode js and mgdb
const connection = await mongoClient.connect (URL);
//step 2:Select the db
const db = connection.db(DB);
//step 3: select the collection
//step 4: do the operations
let resUser = await db.collection("users").find().toArray()
//step 5: close the connection
await connection.close();
  res.json(resUser)
    }catch(error){
//if any error throw error
res.status(500).json({message:"Something went wrong"})
    }
})

app.post("/users", async (req,res)=>{
try{
//step 1 :create a connection b/w node js and mongodb
const connection = await mongoClient.connect(URL);
// step 2:selete the db
const db = connection.db(DB)
//step 3:select the collection 
//step 4:do the operation (crud)
 await db.collection("users").insertOne(req.body)
//step 5:close the connection
await connection.close()
res.json({message:"Data Inserted"})
}
    // req.body.id=users.length+1;
    // console.log(req.body);
    // users.push(req.body);
catch(error){
    //if any error throw error
    res.status(500).json({message:"Something went wrong"})
}   
})
app.get("/users/:id", async function(req,res){
    try{
      //step 1: create a connection b/w nodejs and mongodb
      const connection = await mongoClient.connect(URL);
      //step 2: select db
      const db = connection.db(DB)
      //step 3: select collection
      //step 4: do operations(crud)
      let user = await db.collection("users").findOne({_id: mongodb.ObjectId(req.params.id)})
      //step 5: close connection
      await connection.close();
      res.json(user)
    }catch(error){
        //if any error
        res.status(500).json({message:"Something went wrong"});
    }
    

    // let userId = req.params.id;
    // let user= users.find((item)=> item.id==userId)
    // if(user){
    //     res.json(user)
    // }else{
    //     res.json({message:"User Not Found"});
    // }
})

app.put("/users/:id",async (req,res)=>{
    try{
        // step 1: create a connection b/w mongodb and nodejs
        const connection = await mongoClient.connect(URL);
        //step 2: select database
        const db = connection.db(DB);
        //step 3: select collection
        //step 4: do operations (crud)
        let user = await db.collection("users").findOneAndUpdate({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
        //step 5 :close connection
        await connection.close()

        res.json(user);
    }catch(error){
        //if error
        // console.log(error);
        res.status(500).json(({message:"Something went wrong"}))
    }

    
    // let userId=req.params.id;
    // let userIndex=users.findIndex((item)=> item.id==userId)
    // if(userIndex!=-1){
    // Object.keys(req.body).forEach((item)=>{
    //     users[userIndex][item]=req.body[item];
    // })
    
    // res.json({
    //         message:"User Updated Successfully"
    //     });
    // }else{
    //     res.json({
    //         message:"User Not Found"
    //     });
    // }
});     
    
app.delete("/users/:id", async (req,res)=>{
     try{
        //step 1: create connection b/w node js and mongodb
        const connection = await mongoClient.connect(URL);
        //stp 2 : select db
        const db = connection.db(DB);
        //step 3: select collection 
        //step 4 : do operation (crud)
        let user = await db.collection("users").findOneAndDelete({_id:mongodb.ObjectId(req.params.id)})
        //step 5: close connection
        await connection.close();
        res.json(user);
     }catch(error){
        //if any error
        console.log(error);
        res.status(500).json({message:"something went wrong"});
     }
    // let userId = req.params.id;
    // let userIndex=users.findIndex((item)=>item.id==userId);

    // if(userIndex!=-1){
    //     users.splice(userIndex,1)
    //     res.json({
    //         message:"User Deleted Successfully"
    //     })
    // }else{
    //     res.json({
    //         message:"User Not Found"
    //     })
    // }
})



app.listen(process.env.PORT||3001)//keeps the server running localhost:3001