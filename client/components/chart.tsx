/**
 * @description Chart is a chart.js component that is a child of the demo container
 */

 import React, { useContext } from 'react'
 import { Bar } from 'react-chartjs-2'
 import { TimeContext } from '../containers/App'
 
 
 
 const Chart = () => {
    // The Chart component is taking in the destructured data from the TimeContext via the useContext hook - See app.tsx, this is where createContext is defined
   const { timeData } = useContext<any>(TimeContext)
 
   // This is the chart info, including labels, the imported data (ln 21) from TimeContext, and styling options
   const data = {
     labels: ['1st Call', '2nd Call', '3rd Call', '4th Call'],
     datasets: [
       {
         label: '# of milliseconds',
         data: timeData,
         backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)',
         ],
         borderColor: [
           'rgba(255, 99, 132, 1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(255, 159, 64, 1)',
         ],
         borderWidth: 1,
       },
     ],
   }
 
 
   // Chart Options for the chart (self explanitory)
   const options:any = {
     indexAxis: 'y',
     // Elements options apply to all of the options unless overridden in a dataset
     // In this case, we are setting the border of each horizontal bar to be 2px wide
     elements: {
       bar: {
         borderWidth: 2,
       },
     },
     responsive: true,
     plugins: {
       legend: {
         position: 'top',
       },
       title: {
         display: true,
         text: 'RediQLess Response Time',
       },
     },
   }
   return (
     <div className="flex-grow">
       <img
         className="object-scale-down h-20 m-auto"
         src="https://rediqlessprod.s3.us-east-2.amazonaws.com/REDIQLESS-LOGO-CLEAN.png"
       ></img>
       { /* Data and Options are passed into Bar (coming from react-chart-js) to populate our chart */}
       <Bar data={data} options={options}/>
     </div>
   )
 }
 
 export default Chart