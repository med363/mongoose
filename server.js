const express = require('express')
const assert = require('assert')
// const { MongoClient, ObjectID } = require('mongodb')
const cors = require('cors');
const app = express()
app.use(cors())
app.use(express.json())
const Mongo_url = "mongodb://localhost:27017/gmc"
const dbName = "contacts-api";
const mongoose = require('mongoose');

const Contact = require('./models/Contact');

// mongoose.connect(`${Mongo_url}/${dbName}`,{ useUnifiedTopology: true } , { useNewUrlParser: true })

    app.get('/contacts', (req, res) => {
        Contact.find()
        .then((contacts) => {
            res.json(contacts)
        })
    })

    app.post('/contacts', (req, res) => {
        console.log(req.body)
        new Contact({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email
        }).save().then(() => {
            console.log('new contact saved')
            return res.status(200).json({message: "new contact saved"})
        }).catch(err => {
            console.log(err)
            return res.status(500).json({error: "Something went wrong"})
        })
    })


    app.delete('/contacts/:id', (req, res) => {
        console.log(req.params.id)
        const _id=req.params.id
       Contact.deleteOne({_id:_id}).then(() => {
        console.log('drop contact')
        return res.status(200).json({message: "drop contacte"})
    }).catch(err => {
        console.log(err)
        return res.status(500).json({error: "Something went wrong"})
    })
    })

    app.put('/contacts/:id', (req, res) => {
        console.log(req.params.id)
        const _id=req.params.id
       Contact.updateOne({_id:_id},{$set: {name:req.body.name,phone:req.body.phone,email:req.body.email}})
       .then(() => {
        console.log('update contact')
        return res.status(200).json({message: "update contacte"})
    }).catch(err => {
        console.log(err)
        return res.status(500).json({error: "Something went wrong"})
    })
    })

    app.get('/contacts', (req, res) => {
        console.log(req.body)
        new Contact({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email})
       .find().toArray().save().then(() => {
        console.log('get contacts')
        return res.status(200).json({message: "get contacts"})
    }).catch(err => {
        console.log(err)
        return res.status(500).json({error: "Something went wrong"})
    })
    })

    app.get('/contacts/:id', (req, res) => {
        console.log(req.params.id)
        const _id=req.params.id
       Contact.findById(_id).then((data) => {
        console.log('get one contact', data)
        return res.status(200).json({message: "get one contacte", contact: data})
    }).catch(err => {
        console.log(err)
        return res.status(500).json({error: "Something went wrong"})
    })
    })



// MongoClient.connect(Mongo_url, (err, client) => {
//     assert.equal(err, null, 'DATA FAILED')
//     const db = client.db(dbName)
//     app.get('/', (req, res) => {
//         res.send('from api')
//     })
//     app.get('/test', (req, res) => {
//         res.send('test');
//     })

//     app.delete('/contacts/:id', (req, res) => {
//         // console.log(req)
//         let id = ObjectID(req.params.id)
//         console.log(id)
//         db.collection('contacts').findOneAndDelete({ _id: id }, (err, data) => {
//             if (err) res.send('not found')
//             else res.send(data)
//         })
//     })

//     app.put('/contacts/:id', (req, res) => {
//         console.log("modify")
//         // console.log(req)
//         let id = ObjectID(req.params.id)
//         let body = req.body;
//         console.log(id)
//         db.collection('contacts').findOneAndUpdate({ _id: id }, {$set: body}, (err, data) => {
//             if (err) res.send('not updated')
//             else res.send(data)
//         })
//     })

//     app.post('/contacts', (req, res) => {
//         const body = req.body;
//         db.collection('contacts').insertOne(body, (err, data) => {
//             if (err) {
//                 res.status(400).json({ error: 'Error contact not inserted' })
//             } else {
//                 res.json({ success: data.insertedId });
//             }
//         })
//     })
//     app.get('/contacts/:id',(req,res)=>{
//         let m=ObjectID(req.params.id)
//         db.collection('contacts').findOne({_id:m},(err,data)=>{
//             if(err) res.send('errr ') 
//             else res.send(data)
//         })
//     })
//     app.get('/contacts', (req, res) => {
//         //  let  header=ObjectID(req.params.id)
//         db.collection('contacts').find().toArray((err, data) => {
//             if (err) 
//                 res.send('not found')
//              else 
//                 res.send(data)
            
//         })
//     })
// })

mongoose.connect(Mongo_url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('conncted to db'))
        .then(() => {
            app.listen(5000, (err) => {
                if (err) console.log('errr')
                else console.log('server run on 5000')
            })
        })

