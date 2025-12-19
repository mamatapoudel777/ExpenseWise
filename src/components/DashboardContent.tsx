import React from "react";
import LineChart from "../components/Line";
import PieChart from "./Pie";
import BarChart from "./Bar";
import { DollarSign, TrendingUp, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "pink";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between border border-gray-100">
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </p>
      </div>

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[color]}`}
      >
        {React.cloneElement(icon as React.ReactElement, {
        })}
      </div>
    </div>
  );
};

const DashboardContent: React.FC = () => {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Dashboard
      </h1>

      {/* ===== Row 1: Stats + Charts ===== */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-6">
          <StatCard
            title="Total Revenue"
            value="$54,715"
            icon={<DollarSign />}
            color="blue"
          />
          <StatCard
            title="Income"
            value="$34,152"
            icon={<TrendingUp />}
            color="green"
          />
          <StatCard
            title="Expense"
            value="$15,903"
            icon={<DollarSign />}
            color="red"
          />
          <StatCard
            title="Happy Customers"
            value="15k"
            icon={<Users />}
            color="pink"
          />
        </div>

        {/* Bar Chart */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Product Views
          </h2>
          <div className="h-48">
            <BarChart />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Users By Device
          </h2>
          <PieChart />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <p className="text-3xl font-bold text-gray-900">
              $349.36M
            </p>
          </div>

          <div className="h-56 relative">
            <LineChart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
