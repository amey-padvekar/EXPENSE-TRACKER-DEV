const transactionModel = require("../models/transactionModel")
const moment = require("moment");

const getAllTransaction = async(req,res)=>{
    try {

        const {frequency,selectedDate,filterType} = req.body;
        // const result = moment().subtract(Number(frequency), 'D').toDate()
        
        const transaction = await transactionModel.find({
            ...(frequency !== 'custom'? {
                incurredOn:{
                    $gt :  moment().subtract(Number(frequency), "d").toDate(),
                },
            } : {
                incurredOn:{
                    $gte: selectedDate.startDate,
                    $lte: selectedDate.endDate
                },
            })
            ,
            userId: req.body.userId,
            ...(filterType !== "all" && {type:filterType})
        });
        res.status(200).json(transaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error
        })
    }
}

const editTransaction = async(req,res)=>{
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload);
        res.status(200).send("edit successful");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error
        })
    }
}

const addTransaction = async(req,res)=>{
     try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction Created");
     } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error
        })
     }
}

const deleteTransaction = async(req,res)=>{
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send("Delete Successfull");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error
        })
    }
}

module.exports = {getAllTransaction, addTransaction, editTransaction, deleteTransaction}