import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

export default function App() {
  // Load expenses from localStorage
  const [expenses, setExpenses] = useState(() => {
    try{
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];

  }catch{
    return[];
  }
  });

  const [editingExpense, setEditingExpense] = useState(null);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses]);

  // ADD EXPENSE
  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  // DELETE EXPENSE WITH CONFIRMATION
  const deleteExpense = (id) => {
    if (window.confirm("Are you sure to delete this expense?")) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  // UPDATE EXPENSE
  const updateExpense = (id, updatedData) => {
    setExpenses(
      expenses.map((exp) => (exp.id === id ? { ...exp, ...updatedData } : exp))
    );
    setEditingExpense(null);
  };
//spent amount calculation
  const categories = ["Food", "Travel", "Shopping", "Bills", "Other"];

// Compute total per category
const categoryTotals = categories.map((cat) => {
  const total = expenses
    .filter((exp) => exp.category === cat)
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  return { category: cat, total };
});

//total spent

const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Smart Expense Tracker
        </h1>

        {/* Expense Form */}
        <ExpenseForm
          addExpense={addExpense}
          editingExpense={editingExpense}
          updateExpense={updateExpense}
        />

        {/* Pie Chart */}
        <ExpenseChart expenses={expenses} />

        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
          setEditingExpense={setEditingExpense}
        />
      </div>

      

      

<div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
  {categoryTotals.map((ct) => (
    <div
      key={ct.category}
      className="bg-white p-4 rounded-xl shadow flex flex-col items-center"
    >
      <span className="text-gray-500">{ct.category}</span>
      <span className="text-lg font-bold">₹{ct.total}</span>
    </div>
  ))}
</div>



<h2 className="text-xl font-bold mb-4">
  Total Spent: ₹{totalSpent}
</h2>

    </div>
  );
}