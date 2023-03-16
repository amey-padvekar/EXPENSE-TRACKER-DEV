import React, { useCallback, useEffect, useRef } from "react";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import Print from "./Print"
import ReactToPrint from "react-to-print";




const Analytics = ({ transactions, frequency }) => {



const getPageMargins = () => {
  return "@media print {@page { size: legal landscape; }}";
};
    

    const totalTransactions = transactions.length
    const incomeTransactions = transactions.filter(transaction => transaction.type === "income") 
    const expenseTransactions = transactions.filter(transaction =>  transaction.type === "expense") 
    const totalIncomePercentage = (incomeTransactions.length/totalTransactions) * 100;
    const totalExpensePercentage = (expenseTransactions.length/totalTransactions) * 100;
    const transactionDates = transactions.map((transaction)=>{
        return transaction.incurredOn;
    })
      
    function totalIncome(incomeTransactions) {
        let total=0;
        incomeTransactions.forEach(element => {
            total = total + Number(element.amount);
        });
        return total
           
    }
    function totalExpense(expenseTransactions) {
        let total=0;
        expenseTransactions.forEach(element => {
            total = total + Number(element.amount);
        });
        return total
           
    }

    

    const componentRef = useRef();
    

  return (
    <>
    <div>
    <ReactToPrint 
        
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
        pageStyle={{ overflow: "hidden", height: 0 }}
      />
    </div>
    
    <div ref={componentRef}  id="analysis">
    <style>{getPageMargins()}</style>
      <div id="printablediv" className="row m-3" >
            <div className="col-md-4">
                <div className="card m-2">
                    <div className="card-header">
                        Total Transactions: {totalTransactions}
                    </div>
                    <div className="card-body">
                        <h5>Income : {incomeTransactions.length} Transactions </h5>
                        <h5>Expense : {expenseTransactions.length} Transactions </h5>
                        <h5>Total Income: &#8377; {(incomeTransactions.length !== 0)?totalIncome(incomeTransactions):0}</h5>
                        <h5>Total Expense: &#8377; {(expenseTransactions.length !== 0)? totalExpense(expenseTransactions): 0}</h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <BarGraph frequency={frequency} transactions={transactions} incomeTransactions={incomeTransactions} expenseTransactions={expenseTransactions} />
            </div>
      </div>
      <div   className="row m-3 graph">
                <style></style>
                <PieGraph frequency={frequency} transactions={transactions} incomeTransactions={incomeTransactions} expenseTransactions={expenseTransactions} />

      </div>
      <div>
      </div>
    </div>
    </>
  );
};

export default Analytics;
