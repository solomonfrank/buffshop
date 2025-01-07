import { Cell, Legend, Pie, PieChart, Sector } from "recharts";

const UserStatsDonut = () => {
  const data = [
    { name: "New Users", value: 75 },
    { name: "Active Users", value: 25 },
    { name: "Inactive Users", value: 25 },
  ];
  const COLORS = ["#AEA32D", "#949391", "#FFBE0A"];

  interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }
  const renderCustomizedLabel: React.FC<CustomLabelProps> = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }): JSX.Element => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[1.6rem] leading-[19.54px] font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={10}
        />
      </g>
    );
  };

  return (
    <div className="">
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={170}
          cy={200}
          innerRadius={90}
          outerRadius={140}
          paddingAngle={8}
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
          activeIndex={[0, 1, 2]}
          activeShape={renderActiveShape}
          startAngle={-180}
          endAngle={180}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="left"
          wrapperStyle={{
            color: "#fff",
            paddingTop: "20px",
            paddingInline: "2rem",
            textAlign: "center",
          }}
        />
      </PieChart>
    </div>
  );
};

export default UserStatsDonut;
