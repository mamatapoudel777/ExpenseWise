import { Pie } from "react-chartjs-2";
import{
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement,Tooltip,Legend);
const PieChart: React.FC = () => {
 const data = {
    labels:["Jan","Feb","Mar","Apr","May"],
    datasets:[{
        label:"Sales",
        data:[120,190,300,250,220],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
        borderWidth: 1,    }]
 }
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };
  return <Pie data={data} options={options} />;
};

export default PieChart;