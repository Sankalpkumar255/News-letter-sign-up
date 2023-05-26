const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})



app.post("/",function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var data={
    members: [
        {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: fname,
            LNAME: lname
        } 
        }
    ]
    }
    var jsondata=JSON.stringify(data);
    const url="https://us17.api.mailchimp.com/3.0/lists/e3c8190953";
    const options= {
        method: "POST",
        auth: "Sankalp:06cd628ce768b59aa504a07ce7b1746023-us17",
    }
    const request=https.request(url,options,function(response){
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
        if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    })

    request.write(jsondata);
    request.end();
    
})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running port 3000.")
})






//API key: 06cd628ce768b59aa504a07ce7b17460-us17
//List id: e3c8190953