//MUHAMMAD NOMAN - Mahmed9174@conestogac.on.ca
// PLEASE RUN NPM INSTALL AS I DELETED NODE MODULES 

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {check, validationResult} = require('express-validator');
const req = require('express/lib/request');
const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get('/',(req,res) => {
    res.render('main.ejs')
})

app.post('/',[
    check('name','Please enter a name').notEmpty(),
    check('phone').custom(value => ValidatePhone(value)),
    check('email').custom(value => ValidateEmail(value)),
    check('province','Please select a province').notEmpty().bail().custom(value => ValidateProvince(value)),
    check('streetAddress','Please enter street address').notEmpty(),
    
    
],(req,res) => {
    

    const error = validationResult(req);
   

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var province = req.body.province;
    var streetAddress = req.body.streetAddress;


//    try taking all fields from the object and rendering
    res.render("answer",{name,email,phone,province,streetAddress,error})
})

app.listen(PORT,()=>{
    console.log(`running on http://localhost:${PORT}`)
})

//CUSTOM VALIDATORS

var ValidatePhone = (value) =>{
    const phonePattern = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$|^[0-9]{3} [0-9]{3} [0-9]{4}$|^[0-9]{10}$");

    if(phonePattern.test(value)) return true;
    throw new Error("Invalid Phone Number format")
}
var ValidateEmail = (value) =>{
    const emailPattern = new RegExp(`^[A-Za-z0-9]+@[A-Za-z0-9]+(.[A-Za-z0-9]+)+$`);
    if(emailPattern.test(value)) return true;
    throw new Error(`Please enter a valid email address`)

    
}

var ValidateProvince = (value) =>{

  provinces = ["Alberta",
  "British Columbia",
  "Manitoba",
  "Nunavut",
  "Northwest Territories",
  "Nova Scotia",
  "Newfoundland and Labrador",
  "New Brunswick",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon"]

  let found = false;
  for (index in provinces) {
     
      if(provinces[index] === value){
          found = true;
          break;
      }
  }
  if(found) return true;
  
  throw new Error("Please select a valid province from the list")


}