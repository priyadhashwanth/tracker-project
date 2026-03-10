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

//view for dashboard

const[view,setView]=useState("expenses");

//monthly expenses

const [selectedMonth, setSelectedMonth] = useState("All");
 const monthlyExpenses =
  selectedMonth === "All"
    ? expenses
    : expenses.filter((e) => {
        const month = new Date(e.date).getMonth() + 1;
        return month === Number(selectedMonth);
      });
const monthlyTotal = monthlyExpenses.reduce(
  (sum, e) => sum + Number(e.amount),
  0
);


  return(
 <div className="flex">

      <Sidebar view={view} setView={setView} />

      <div className="flex-1 p-6">

        {/* EXPENSES */}
        {view === "expenses" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>

            {/* Month Filter */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border p-2 rounded mb-4"
            >
              <option value="All">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <div className="bg-white p-4 rounded-xl shadow mb-4">
              <h2 className="text-gray-500 text-sm">Monthly Expense</h2>
              <p className="text-2xl font-bold text-indigo-600">
                ₹{monthlyTotal}
              </p>
            </div>

            <ExpenseForm
              addExpense={addExpense}
              editingExpense={editingExpense}
              updateExpense={updateExpense}
            />

            <ExpenseList
              expenses={monthlyExpenses}
              deleteExpense={deleteExpense}
              setEditingExpense={setEditingExpense}
            />
          </>
        )}

        {/* REPORTS */}
        {view === "reports" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <ExpenseChart expenses={expenses} />

            {/* Category totals */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
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

            {/* Total spent */}
            <div className="bg-white p-4 rounded-xl shadow mb-6">
              <h2 className="text-gray-500 text-sm">Total Spent</h2>
              <p className="text-2xl font-bold text-indigo-600">
                ₹{totalSpent}
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}