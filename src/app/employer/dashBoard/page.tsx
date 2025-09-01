"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import type { chartData } from "../../../types/employer";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DashboardCompany = async ({ data }: { data: Promise<chartData[]> }) => {
  const chartdata = await data;

  const statusCounts =
    chartdata && chartdata.length > 0
      ? chartdata.reduce((acc: Record<string, number>, item) => {
          acc[item.status] = (acc[item.status] || 0) + 1;
          return acc;
        }, {})
      : 0;

  const chartDataGraph = {
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
      tooltip: {
        // callbacks: {
        //   label: function (context: any) {
        //     const status = context.label;
        //     const details = chartdata.filter((item) => item.status === status);
        //     return details.map(
        //       (data) =>
        //         `Company: ${data.company},Role: ${data.role}, Job Type: ${data.jobType}, `
        //     );
        //   },
        // },
      },
    },
  };

  return (
    <>
      <div className="max-h-[400px] flex justify-center">
        <Pie
          className="border rounded-md m-2"
          data={chartDataGraph}
          options={options}
        />
      </div>
    </>
  );
};

export default DashboardCompany;
