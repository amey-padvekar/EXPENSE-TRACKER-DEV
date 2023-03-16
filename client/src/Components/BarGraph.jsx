import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import {Bar} from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const BarGraph = ({transactions, incomeTransactions, expenseTransactions, frequency}) => {

    const weekLabel = ['Mon','Tue','Wed','thur','Fri','Sat','Sun']
    const dateLabel = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    const month = ['Jan','Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const monthyear = transactions.map((transaction)=>{return (month[new Date(transaction.incurredOn).getMonth()]+ " " +new Date(transaction.incurredOn).getFullYear())})

    

    const dates = transactions.reduce((acc, obj) => {
        const date = obj.incurredOn.split('T')[0]; // extract the date part
        if (!acc[date]) {
          acc[date] = 0; // initialize the accumulator for the date
        }
        acc[date] += obj.amount; // add the amount to the accumulator for the date
        return acc;
      }, {});
    const expense = expenseTransactions.reduce((acc, obj) => {
        const date = obj.incurredOn.split('T')[0]; // extract the date part
        if (!acc[date]) {
          acc[date] = 0; // initialize the accumulator for the date
        }
        acc[date] += obj.amount; // add the amount to the accumulator for the date
        return acc;
      }, {});

    const income = incomeTransactions.reduce((acc, obj) => {
        const date = obj.incurredOn.split('T')[0]; // extract the date part
        if (!acc[date]) {
          acc[date] = 0; // initialize the accumulator for the date
        }
        acc[date] += obj.amount; // add the amount to the accumulator for the date
        return acc;
      }, {});
      useEffect(()=>{
        console.log(expense);
        console.log(income)
        console.log(dates);
        console.log(labels.map(date => income["2023-03-12"] || 0))
      },[])

    const options = {
        responsive: true,
        plugins: {
            title:{
              display:true,
              text:'Bar Chart',
              fontSize:14
            },
            legend:{
              display:true,
              position:'top'
            }
          },
        
      };
      const labels = Object.keys(dates);
    const data = {
        labels: Object.keys(dates),
        datasets:[{
            label: "expense",
            data: labels.map(date => expense[date] || 0),
            parsing: {
                xAxisKey: 'amount',
                yAxisKey: 'incurredOn'
            },
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            
        },
        {
            label: "income",
            data: labels.map(date => income[date] || 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'skyblue',
            
        },
        
    ]
    }

  return (
    <>
      <div className="card m-2">
        <div className="card-header">Transaction Graph</div>
        <div className="card-body">
          <Bar options={options} data={data} />
        </div>
      </div>
    </>
  );
};

export default BarGraph;



