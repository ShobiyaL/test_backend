
const express = require('express');//creates an express application.
var cors = require('cors')
const app =express(); //creates an express application.

let users=[];
//Middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}))

//api or rest api url

app.get("/users", function(req, res){
    let qParams =req.query;
    console.log(qParams);
    let resUser=[];
    for(let i= parseInt(req.query.offset);i< parseInt(req.query.offset)+parseInt(req.query.limit);i++){
        if(users[i]){
            resUser.push(users[i]);
        }     
    }
    res.json(resUser);
})

app.post("/users", (req,res)=>{
    req.body.id=users.length+1;
    // console.log(req.body);
    users.push(req.body);
    res.json({message:"User Created Successfully"})
})
app.get("/users/:id",function(req,res){
    let userId = req.params.id;
    let user= users.find((item)=> item.id==userId)
    if(user){
        res.json(user)
    }else{
        res.json({message:"User Not Found"});
    }
})

app.put("/users/:id",(req,res)=>{
    let userId=req.params.id;
    let userIndex=users.findIndex((item)=> item.id==userId)
    if(userIndex!=-1){
    Object.keys(req.body).forEach((item)=>{
        users[userIndex][item]=req.body[item];
    })
    
    res.json({
            message:"User Updated Successfully"
        });
    }else{
        res.json({
            message:"User Not Found"
        });
    }
});     
    
app.delete("/users/:id",(req,res)=>{
    let userId = req.params.id;
    let userIndex=users.findIndex((item)=>item.id==userId);

    if(userIndex!=-1){
        users.splice(userIndex,1)
        res.json({
            message:"User Deleted Successfully"
        })
    }else{
        res.json({
            message:"User Not Found"
        })
    }
})



app.listen(3001)//keeps the server running localhost:3001