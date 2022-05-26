const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+"/styles.css")


})
app.post("/",function(req,res){
  var city=req.body.place
  // console.log(city)
    const key="121b9aa04a8d808f50714747bd7616ab"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric"
    https.get(url,(response)=>{
      console.log(response.statuscode)
      response.on("data",(data)=>{
        const weather=JSON.parse(data)
        const temp=weather.main.temp
        const description=weather.weather[0].description
        const img=weather.weather[0].icon
        const country=weather.sys.country
        const humidity=weather.main.humidity
        const name=weather.name

        const iconUrl="https://openweathermap.org/img/wn/01d@2x.png"
        console.log(temp)
        console.log(description)


  // res.write("<ul><li><h1>the temperature is: "+temp+" degress.</h1></li></ul><li><h4>description: "+description+"</h4></li><li><h4>Todays maximum temperature: "+max_temerature+".</h4></li><li><h4>Humidity: "+humidity+" g/m3.</h4></li>")
  res.write("<h1 align='center'>the temperature is: "+temp+" degress.</h1>")
    res.write("<p align='center'>description: "+description+".</h2>")
    res.write("<p align='center'>Humidity: "+humidity+" g/m3.</h4>")
    res.write("<p align='center'>Place: "+name+".</h4>")
    res.write("<p align='center'>Country that place belongs to: "+country+".</h4>")

    // res.write("<img src='C:\Users\elige\Desktop\weather\images\download (1).png' alt='image of wether'>")

      })
    })
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running")
})
