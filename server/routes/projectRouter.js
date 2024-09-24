const express=require('express')
const router=express.Router()
const Projects = require('../model/projectModel')
router.get('/all',async(req,res)=>{
    try{
        const fetchProject= await Projects.find()
        res.json(fetchProject).status(200)
    }
    catch(error){
        res.json(error).status(500)
    }
})
router.post('/add', async (req,res)=>{
    try{
        const newprojectdata= new Projects(req.body)
        const {title,disp}=newprojectdata
        if(!title || !disp){
            res.status(501).json({message:"Title & Disp required"})
        }
        const savedata=await newprojectdata.save()
        res.status(201).json(savedata)
    }
    catch{
        res.json(error).status(500)
    }
})
router.put('/edit/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const curdata=await Projects.findOne({_id:id})
        if(!curdata){
            res.status(404).json({message:"No project found"})
        }
        const updatedata=await Projects.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedata)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const curdata=await Projects.findOne({_id:id})
        if(!curdata){
            res.status(404).json({message:"No project found"})
        }
        const deletedata=await Projects.findByIdAndDelete(id)
        res.status(200).json(deletedata)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=router