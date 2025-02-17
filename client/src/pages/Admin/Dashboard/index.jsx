import { DollarSign, Package, ShoppingCart } from "lucide-react";
import { StatsCard } from "./_components/stats-card";
import { SalesChart } from "./_components/sales-chart";
import { OrdersTable } from "./_components/orders-table";

const salesData = [
  { month: "Jan", sales: 900 },
  { month: "Feb", sales: 1100 },
  { month: "Mar", sales: 1200 },
  { month: "Apr", sales: 1000 },
  { month: "May", sales: 800 },
  { month: "Jun", sales: 700 },
  { month: "Jul", sales: 900 },
  { month: "Aug", sales: 1000 },
  { month: "Sep", sales: 1100 },
  { month: "Oct", sales: 1300 },
  { month: "Nov", sales: 1000 },
  { month: "Dec", sales: 1200 },
];

const orders = [
  {
    id: 2323,
    name: "Devon Lane",
    email: "devon@example.com",
    amount: 778.35,
    status: "delivered",
    date: "07.05.2020",
  },
  {
    id: 2458,
    name: "Darrell Steward",
    email: "darrell@example.com",
    amount: 219.78,
    status: "delivered",
    date: "03.07.2020",
  },
  {
    id: 6289,
    name: "Darlene Robertson",
    email: "darlene@example.com",
    amount: 928.41,
    status: "cancelled",
    date: "23.03.2020",
  },
  {
    id: 3869,
    name: "Courtney Henry",
    email: "courtney@example.com",
    amount: 90.51,
    status: "pending",
    date: "04.07.2020",
  },
  {
    id: 1247,
    name: "Eleanor Pena",
    email: "eleanor@example.com",
    amount: 275.43,
    status: "delivered",
    date: "10.03.2020",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Sales"
          value="$19,626,058.20"
          icon={DollarSign}
        />
        <StatsCard title="Total Orders" value="3290" icon={ShoppingCart} />
        <StatsCard title="Total Products" value="322" icon={Package} />
      </div>

      {/* Sales Chart */}
      <div className="mb-6">
        <SalesChart data={salesData} />
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Latest Orders</h2>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
