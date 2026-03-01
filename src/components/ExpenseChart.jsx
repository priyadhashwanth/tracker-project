import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ExpenseChart({ expenses }) {

  const categoryData = Object.values(
    expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = {
          name: exp.category,
          value: 0,
        };
      }
      acc[exp.category].value += Number(exp.amount);
      return acc;
    }, {})
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6 flex justify-center">
      <PieChart width={400} height={300}>
        <Pie
          data={categoryData}
          dataKey="value"
          outerRadius={100}
          label
        >
          {categoryData.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}