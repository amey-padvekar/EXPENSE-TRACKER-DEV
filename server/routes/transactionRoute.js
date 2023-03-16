const express = require("express");
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();
//routers
//add transaction
router.post("/add-transaction",addTransaction);
//edit transaction
router.post("/edit-transaction",editTransaction);
//delete transaction
router.post("/delete-transaction",deleteTransaction);

//get transaction
router.post("/get-transaction", getAllTransaction);
//export
module.exports = router;