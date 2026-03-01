function ExpenseList({ expenses, deleteExpense, setEditingExpense }) {
  
  //sort by date
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="grid gap-4">
      {sortedExpenses.map((exp) => (
        <div
          key={exp.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{exp.title}</h3>
            <p className="text-gray-500">₹{exp.amount}</p>
            <p className="text-sm text-gray-400">
              {exp.date} • <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{exp.category}</span>
            </p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => setEditingExpense(exp)}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteExpense(exp.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ExpenseList;