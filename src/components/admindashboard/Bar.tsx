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
        label:"Sales",
        data:[120,190,300,250,220],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
