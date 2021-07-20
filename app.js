 const express=require("express");
const https = require("https");
const app=express()
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
const query=req.body.cityName
const apiKey="d35032303605d7c80b6aa48caa38441f"
url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric"
https.get(url,function(response){

response.on("data",function(data){
const weatherData= JSON.parse(data)
const temp=weatherData.main.temp
const icon=weatherData.weather[0].icon
const description=weatherData.weather[0].description
const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
res.write("<h1>The current temperature is "+temp+" Celsius</h1>")
res.write("<h2>"+description+"</h2>")
res.write("<img src="+imageURL+">")
})
})
})
app.listen(3000,function(){
console.log("Server is running at 3000")
})