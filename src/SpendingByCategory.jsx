import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Rectangle } from 'recharts';

// Fixed hue per category (never reassigned by rank) — see dataviz skill's categorical palette.
const CATEGORY_COLORS = {
  food: '#2a78d6',
  housing: '#eb6834',
  utilities: '#1baf7a',
  transport: '#eda100',
  entertainment: '#e87ba4',
  salary: '#008300',
  other: '#4a3aa7',
};
const FALLBACK_COLOR = '#e34948';

function formatCurrency(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function CategoryBar({ payload, ...rest }) {
  const color = CATEGORY_COLORS[payload.category] || FALLBACK_COLOR;
  return <Rectangle {...rest} fill={color} radius={[0, 4, 4, 0]} />;
}

function SpendingByCategory({ transactions }) {
  const totalsByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      return totals;
    }, {});

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <BarChart
        data={data}
        layout="vertical"
        responsive
        style={{ width: '100%', height: Math.max(180, data.length * 44) }}
        margin={{ top: 8, right: 56, left: 8, bottom: 8 }}
        barCategoryGap={10}
      >
        <CartesianGrid horizontal={false} stroke="#e1e0d9" />
        <XAxis
          type="number"
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12, fill: '#898781' }}
          stroke="#c3c2b7"
        />
        <YAxis
          type="category"
          dataKey="category"
          width={100}
          tickLine={false}
          axisLine={false}
          tickFormatter={capitalize}
          tick={{ fontSize: 13, fill: '#0b0b0b' }}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(value), 'Spent']}
          labelFormatter={capitalize}
          cursor={{ fill: '#f5f5f5' }}
        />
        <Bar
          dataKey="amount"
          shape={CategoryBar}
          barSize={20}
          isAnimationActive={false}
          label={{ position: 'right', formatter: formatCurrency, fill: '#52514e', fontSize: 12 }}
        />
      </BarChart>
    </div>
  );
}

export default SpendingByCategory;
