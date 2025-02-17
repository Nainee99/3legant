import { useState } from "react";
import {
  Bar,
  Line,
  BarChart,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { BarChart2, LineChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesChart({ data }) {
  // Fixed the useState syntax
  const [chartType, setChartType] = useState("bar");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-base font-medium">
          Sales Statistics
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("bar")}
          >
            <BarChart2 className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("line")}
          >
            <LineChartIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                <Tooltip />
                <Bar dataKey="sales" fill="#EAB308" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#EAB308"
                  strokeWidth={2}
                  dot={{ fill: "#EAB308" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
