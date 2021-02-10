const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const { json } = require("body-parser");
const https = require("https");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});
app.post("/",function(req,res){
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;
    console.log(firstname,lastname,email)
    var data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
               FNAME:firstname,
               LNAME: lastname
            }
        }]
    };
    var jsondata=JSON.stringify(data);
    const url="https://us7.api.mailchimp.com/3.0/lists/f0135de559";
    const options={
        method:"POST",
        auth:"bilal:a0ab33540d00ab1d4374155371b1a15b-us7"
    }
    const request=https.request(url,options,function(response){

        if (response.statusCode===200){
            res.sendFile(__dirname+"/sucess.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/")

})


app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});
//a0ab33540d00ab1d4374155371b1a15b-us7
//f0135de559