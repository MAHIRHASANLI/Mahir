const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
var bodyParser = require("body-parser");
const dotenv = require('dotenv')
const crypto = require("crypto");
const mongoose = require('mongoose');
dotenv.config()
app.use(bodyParser.json());

//Authors Shema
const AuthorsChema = new mongoose.Schema({
    name: String,
    Surname: String,
    Age: Number,
    imageURL: String
})

const AuthorsModel = new mongoose.model("Authors", AuthorsChema);

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

///GET SUPLIERS 
app.get('/api/suppliers', (req, res) => {
  const { name} = req.query;
  if(name){
    const filterCompanyName = faceObject.filter((m) =>
            m.CompanyName.toLocaleLowerCase()
              .trim()
              .includes(name.toLocaleLowerCase().trim()) || m.ContactName.toLocaleLowerCase()
                        .trim().includes(name.toLocaleLowerCase().trim()));
                        res.status(200).send(filterCompanyName)
  }
})
// app.get('/api/suppliers', (req, res) => {
//   const { CompanyName, ContactName } = req.body;
//   if (!CompanyName && !ContactName) {
//     res.send({
//       data: faceObject,
//       message: "Axtardiginiz data yoxdur!",
//     });
//   }
//    else {
//     if (CompanyName) {
//       const filterCompanyName = faceObject.filter((m) =>
//         m.CompanyName.toLocaleLowerCase()
//           .trim()
//           .includes(CompanyName.toLocaleLowerCase().trim())
//       );
//       res.status(200).send(filterCompanyName);
//     } else {
//       const filterContactName = faceObject.filter((m) =>
//         m.ContactName.toLocaleLowerCase()
//           .trim()
//           .includes(ContactName.toLocaleLowerCase().trim()));
//           res.status(200).send(filterContactName)
//     }
//   }
// });

//GET SUPLIERS BY ID
app.get('/api/suppliers/:id', (req,res)=>{
    const id = req.params.id;
    const supplier = faceObject.find(m=>m.id==id);
    if(supplier == undefined){
        res.status(204).send('Supplier yoxdu!!')
    }else{
        res.status(200).send(supplier)
    }
})

//POST SUPPLIER
app.post('/api/suppliers', (req,res)=>{
    const {CompanyName,ContactName,ContactFitle} = req.body;
    const newObjectSupplier={
        id: crypto.randomUUID(),
        CompanyName: CompanyName,
        ContactName: ContactName,
        ContactFitle: ContactFitle
    }
    faceObject.push(newObjectSupplier);
    res.send({
        message:"Object gonderildi"
    })
})

//DELETE SUPPLIER
app.delete('/api/suppliers/:id', (req, res)=>{
    const id = req.params.id;
    const deleteSupplier = faceObject.find(m=>m.id==id);
    const ind = faceObject.indexOf(deleteSupplier);
    if(deleteSupplier == undefined){
        res.send({
            message:"Silmek ucun Object tapilmadi!!"
        })
    }
    else{
        faceObject.splice(ind, 1);
        res.status(200).send({
            message:"Silinme tamamlandi"
        })
    }
})

//PUT SUPPLIER
app.put('/api/suppliers/:id', (req, res)=>{
    const id =req.params.id;
    const {CompanyName,ContactName,ContactFitle} = req.body;
    const putSupplier = faceObject.find(m=>m.id==id);
    if(CompanyName){
        putSupplier.CompanyName = CompanyName;      
    }if(ContactName){
        putSupplier.ContactName = ContactName;
    }if(ContactFitle){
        putSupplier.ContactFitle = ContactFitle;
    }
    res.status(200).send({
        message:"Object Put olundu"
    })
})
PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Menim PORTUM: ${PORT}`);
});
