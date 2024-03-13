import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
    CategoryScale, Chart as ChartJS,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
} from 'chart.js'
import { getLast7Days } from '../../lib/features'


ChartJS.register(
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
)

const labels=getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
}

const DoughNutChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        },
    },
    cutout:120
}

const LineChart = ({ value = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: [1, 2, 1, 12, 1, 8, 3],
                label: "Revenue",
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                data: [11, 2, 14, 2, 11, 18, 14],
                label: "Revenue",
                fill: true,
                backgroundColor: 'rgba(75,12,192,0.2)',
                borderColor: 'rgba(75,12,192,1)',
            },
        ]
    }
    return <Line data={data} options={lineChartOptions} />
}
const DoughNut = ({value=[],labels}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Total Chats vs Group Chats",
                backgroundColor: ['rgba(225,182,292,0.8)','rgba(222,102,22,0.8)'],
                hoverBackgroundColor:['rgba(225,182,292,0.5)','rgba(222,102,22,0.5)'],
                borderColor: ['rgba(225,182,292,1)','rgba(222,102,22,1)'],
                offset:40
            },
        ]
    }
    return <Doughnut style={{zIndex:10}} data={data} options={DoughNutChartOptions}/>
}

export { LineChart, DoughNut } 