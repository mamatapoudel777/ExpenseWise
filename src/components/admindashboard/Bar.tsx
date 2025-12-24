import {Bar} from "react-chartjs-2"
import{
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend);
const BarChart: React.FC = () =>{
const data={
    labels:["Jan","Feb","Mar","Apr","May"],
    datasets:[{
        label:"Savings",
        data:[12000,19000,30000,25000,22000],
        backgroundColor: "#00694B",
    }]
}
const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
