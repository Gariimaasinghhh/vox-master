const express =require('express');
const jwt = require ('jasonwebtoken');
require('dotenv').config();

const router = express.Router();
const Model = require('../models/userModel');

router.post('/add',(req,res)=>{
    console.log(req.body);
    new Model(req.body).save()
    .then((result)=>{
        console.log(result);
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
});


router.post('/authenticate', (req,res)=>{
    console.log(req.body);
    Model.findOne(req.body)
    .then((result) => {
        if(result) res.json(result);
        else res.status(400).json({message:'Login Failed'})
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/authenticate', (req,res)=>{
    console.log(req.body);
    Model.findOne(req.body)
    .then((result) => {
        if(result){
        const {_id,name,email } = result;
        const payload = {_id,name,email};
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiry: '2 days'},
            (err,toekn) => {
                if(err){
                    res.status(500).json({message : 'error creating token'})
                }else{
                    res.status(200).json({token, role: result.role})
                }
            }
        )
    }
        else{
            res.status(401).json({message : 'invalid credentials'})
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})
module.exports= router;