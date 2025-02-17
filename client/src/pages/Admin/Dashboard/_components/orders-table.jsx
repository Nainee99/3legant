import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

export function OrdersTable({ orders }) {
  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell className="text-right">
                ${order.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getStatusColor(order.status)}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Cancel order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
