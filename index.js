const express = require('express')
const mysql = require('mysql')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'78520',
    database:'gstcalculator'
})
db.connect((err)=>{
    if(err){
        console.log('error')
    }
    console.log('Mysql Connected')
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.post('/', function(req, res){
    let userAmount = parseInt(req.body.useramount)
    let sgst,cgst,total;
    if(userAmount<=999){
       sgst = 0.025*userAmount
       cgst = 0.025*userAmount
       total = sgst+cgst+userAmount;
    
    }
    else{
        sgst = 0.06*userAmount
       cgst = 0.06*userAmount
       total = sgst+cgst+userAmount;
    
    }
    let details = {amountByUser:userAmount, sgst:sgst, cgst:cgst, totalAmount:total}
    let sql = 'INSERT INTO GSTBILL SET ?'
    let query = db.query(sql,details,(err,res)=>{
        if(err){
            console.log('some error')
        }
        console.log(res);
        res.send('added to database')

    })
    res.send("recieved your request!");
 });
app.listen('3000',()=>{
    console.log("server started")
})