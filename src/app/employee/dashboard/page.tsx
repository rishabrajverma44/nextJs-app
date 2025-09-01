"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import type { JobSeeker } from "../../../types/employer";
import { getUserDetails } from "@/actions/employee/actions";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DashboardEmployee = () => {
  const [chartdata] = useState<JobSeeker[]>([]);

  useEffect(() => {
    const featchData = async function () {
      const getChart = await getUserDetails();
      console.log(getChart);
    };
    featchData();
  }, []);

  const statusCounts = chartdata.reduce((acc: Record<string, number>, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Applications",
        data: Object.values(statusCounts),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Job Application Status",
      },
    },
  };

  return (
    <>
      <div className="chartContainer">
        <div className="chart">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </>
  );
};

export default DashboardEmployee;
