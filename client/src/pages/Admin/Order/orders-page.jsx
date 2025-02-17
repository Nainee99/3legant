import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "2323",
    customer: "John Alexander",
    email: "alex@example.com",
    amount: 983.0,
    status: "delivered",
    date: "07.05.2020",
    items: 2,
  },
  // Add more orders...
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase()) ||
      order.id.includes(search);
    const matchesStatus = status === "all" || order.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(order.status)}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`orders/${order.id}`}>View Details</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
