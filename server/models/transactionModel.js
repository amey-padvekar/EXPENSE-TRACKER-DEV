const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: [true,"Title is required"]
    },
    amount:{
        type: Number,
        required: [true, "amount is required"]
    },
    type:{
        type: String,
        required: [true, "type is required"]
    },
    category:{
        type: String,
        required: [true, "category is required"]
    },
    reference:{
        type: String
    },
    note:{
        type: String
    },
    incurredOn:{
        type: Date,
        required: [true, "Date is required"]
    },

},
{timestamps:true}
)

const transactionModel = mongoose.model("transaction",transactionSchema);

module.exports = transactionModel;