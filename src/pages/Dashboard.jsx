import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, Friend</h1>
        <p className="text-gray-500 mt-1">Here’s what happened recently</p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total" value="₹18000" />
        <StatCard title="You Owe" value="₹2000" />
        <StatCard title="Owed to You" value="₹8000" />
        <StatCard title="Net" value="₹6000" />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* PIE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Spending by Category</h3>

          <div className="flex justify-center">
            <div className="w-[260px] h-[260px]">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        boxWidth: 12,
                        font: { size: 12 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* LINE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Monthly Trend</h3>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* BAR */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Group Comparison</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* INSIGHTS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Insights</h3>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="bg-gray-50 p-3 rounded-xl">
              Smart insights will appear here.
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              Try adding expenses in groups.
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
              Export CSV
            </button>
            <button className="px-4 py-2 rounded-xl border text-sm">
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h2 className="text-2xl font-extrabold tracking-tight">{value}</h2>
    </div>
  );
}

/* ---------- CHART DATA ---------- */

const pieData = {
  labels: ["Food", "Travel", "Other"],
  datasets: [
    {
      data: [12000, 4200, 1800],
      backgroundColor: ["#f97316", "#7c3aed", "#06b6d4"],
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Expenses",
      data: [800, 1200, 1050, 1000, 600, 700, 720, 1150],
      borderColor: "#7c3aed",
      tension: 0.4,
      fill: false,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

const barData = {
  labels: ["Goa Trip", "Flat Rent"],
  datasets: [
    {
      data: [6000, 12000],
      backgroundColor: "#22c55e",
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};
