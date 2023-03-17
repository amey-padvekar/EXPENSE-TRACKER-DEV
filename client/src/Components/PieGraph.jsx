import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = ({
  transactions,
  incomeTransactions,
  expenseTransactions,
  frequency,
}) => {


 

  const incomeCategory = incomeTransactions.reduce((acc, obj) => {
    const cat = obj.category; // extract the date part
    if (!acc[cat]) {
      acc[cat] = 0; // initialize the accumulator for the date
    }
    acc[cat] += obj.amount; // add the amount to the accumulator for the date
    return acc;
  }, {});

  const expenseCategory = expenseTransactions.reduce((acc, obj) => {
    const cat = obj.category; // extract the date part
    if (!acc[cat]) {
      acc[cat] = 0; // initialize the accumulator for the date
    }
    acc[cat] += obj.amount; // add the amount to the accumulator for the date
    return acc;
  }, {});

  useEffect(() => {
    console.log(incomeCategory);
    console.log(expenseCategory);
  }, []);
  const expenseLabel = Object.keys(expenseCategory);
  const incomeLabel = Object.keys(incomeCategory);
  const expenseData = {
    labels: Object.keys(expenseCategory),
    datasets: [
      {
        label: "amount",
        data: expenseLabel.map((element) => {
          return expenseCategory[element];
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const incomeData = {
    labels: Object.keys(incomeCategory),
    datasets: [
      {
        label: "amount",
        data: incomeLabel.map((element) => {
          return incomeCategory[element];
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div style={{display:"flex", flexDirection:"row"}} className="container">
        <div style={{minWidth:"30%", maxWidth:"50%"}} className="graph1 container-sm  " >
        <div className="card m-2">
          <div className="card-header">Expense by Category</div>
          <div className="card-body">
            <Pie style={{minWidth:"30%", maxWidth:"95%"}} id="pie1" data={expenseData} />
          </div>
        </div>
        </div>
        <div style={{minWidth:"30%"}} className="graph2 container">
        <div className="card m-2">
          <div className="card-header">Income by Category</div>
          <div  className="card-body">
            <Pie style={{minWidth:"30%", maxWidth:"95%"}} id="" data={incomeData} />
          </div>
        </div>
        </div>
      </div>
      <div className="col-sm-4 ">
        {/* <div className="card m-2">
          <div className="card-header">Expense by Category</div>
          <div className="card-body">
            <Pie  id="pie1" data={expenseData} />
          </div>
        </div> */}
      </div>
      <div className="col-sm-4 ">
        {/* <div className="card m-2">
          <div className="card-header">Income by Category</div>
          <div className="card-body">
            <Pie id="" data={incomeData} />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default PieGraph;
