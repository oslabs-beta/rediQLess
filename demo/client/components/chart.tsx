import React, { useContext } from 'react'
// import chartConfig from "../util/chartconfig";
import { Bar } from 'react-chartjs-2'
import { TimeContext } from '../containers/App'

const Chart = () => {
  const { time, changeTime } = useContext<any>(TimeContext)

  const data = {
    labels: ['1st Call', '2nd Call', '3rd Call', '4th Call'],
    datasets: [
      {
        label: '# of milliseconds',
        data: [time, 70, 20, 5],
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

  const options = {
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
        src="https://i.ibb.co/0f1hmdb/REDIQLESS-LOGO-CLEAN.png"
      ></img>
      <Bar data={data} options={options} />
    </div>
  )
}

export default Chart
