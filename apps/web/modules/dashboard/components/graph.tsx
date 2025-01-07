"use client";
import {
  Area,
  AreaChart,
  CartesianAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const tickFormatter = (number: number) => {
  if (number > 1000000000) {
    return "₦" + (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return "₦" + (number / 1000000).toString() + "M";
  } else if (number > 1000) {
    return "₦" + (number / 1000).toString() + "K";
  } else {
    return "₦" + number.toString();
  }
};

const CustomTooltip = () => {
  return (
    <div className="w-[44px] h-[12.37px] inline-block rounded-[2px] text-center text-black bg-brand-default font-medium text-[8px] leading-[9px]">
      ₦85,000
    </div>
  );
};

const data = [
  {
    name: "1 Oct",
    pv: 60,
  },
  {
    name: "2 Oct",
    pv: 60,
  },
  {
    name: "3 Oct",
    pv: 125,
  },
  {
    name: "4 Oct",
    pv: 60,
  },
  {
    name: "5 Oct",
    pv: 95,
  },
  {
    name: "6 Oct",
    pv: 80,
  },
  {
    name: "7 Oct",
    pv: 200,
  },
  {
    name: "8 Oct",
    pv: 75,
  },
  {
    name: "9 Oct",
    pv: 95,
  },
  {
    name: "10 Oct",
    pv: 170,
  },
  {
    name: "11 Oct",
    pv: 125,
  },
  {
    name: "12 Oct",
    pv: 120,
  },
];

const arr = [];

for (let i = 30; i >= 0; i--) {
  arr.push({
    amount: i + 1,
    value: i + Math.random(),
  });
}

const AreaGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        // width="10
        height={180}
        data={data}
        className="rechart-cs"
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#AEA32D" stopOpacity={1} />
            <stop
              offset="100%"
              stopColor="rgba(255, 255, 255, 1)"
              stopOpacity={0.176942}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} opacity={0.5} />
        <CartesianAxis axisLine={false} tickLine={false} tick={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={tickFormatter}
          tickCount={5}
          allowDecimals={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          offset={0}
          cursor={{ stroke: "#FFBE0A", strokeWidth: 1, strokeDashoffset: 1 }}
        />
        <Area
          // type="monotone"
          dataKey="pv"
          stroke="#FFBE0A"
          strokeWidth={2}
          fill="url(#colorUv)" //Add the id 'colorUv' which is used in linearGradient
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaGraph;
