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


  window.onbeforeprint = (ev)=>{
    for(let id in ChartJS.instances){
      let instance = ChartJS.instances[id];
      instance.resize(400,500);
    }
  }

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
      <div className="col-md-6 col-print-3">
        <div className="card m-2">
          <div className="card-header">Expense by Category</div>
          <div className="card-body">
            <Pie id="pie1" data={expenseData} />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-print-3">
        <div className="card m-2">
          <div className="card-header">Income by Category</div>
          <div className="card-body">
            <Pie id="" data={incomeData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PieGraph;
