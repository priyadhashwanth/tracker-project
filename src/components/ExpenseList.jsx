function ExpenseList({ expenses, deleteExpense, setEditingExpense }) {

  // sort by date (recent first)
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // show message if no expenses
  if (sortedExpenses.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No expenses added yet
      </p>
    );
  }

  return (
    <div className="grid gap-4 mt-6">
      {sortedExpenses.map((exp) => (
        <div
          key={exp.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
        >
          {/* Expense Details */}
          <div>
            <h3 className="font-bold text-lg">{exp.title}</h3>

            <p className="text-gray-600">₹{exp.amount}</p>

            <p className="text-sm text-gray-400">
               {exp.date}
            </p>

            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
              {exp.category}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setEditingExpense(exp)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>

            <button
              onClick={() => deleteExpense(exp.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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