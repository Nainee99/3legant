import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EmptyState from "./EmptyState";

const orders = [
  {
    id: "#3456_768",
    date: "October 17, 2023",
    status: "Delivered",
    price: 1234.0,
  },
  {
    id: "#3456_980",
    date: "October 11, 2023",
    status: "Delivered",
    price: 345.0,
  },
  {
    id: "#3456_120",
    date: "August 24, 2023",
    status: "Delivered",
    price: 2345.0,
  },
  {
    id: "#3456_030",
    date: "August 12, 2023",
    status: "Delivered",
    price: 845.0,
  },
];

export default function Orders() {
  if (orders.length === 0) {
    return (
      <EmptyState
        type="orders"
        message="You haven't placed any orders yet. Start shopping to see your orders here."
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">Orders History</h2>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number ID</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${order.price.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
