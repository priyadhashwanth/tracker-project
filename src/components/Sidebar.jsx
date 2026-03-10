function Sidebar({ view, setView }) {
  return (
    <div className="w-60 bg-blue-700 text-white min-h-screen p-5">

      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <ul className="space-y-3">

        <li
          onClick={() => setView("expenses")}
          className={`cursor-pointer p-2 rounded ${
            view === "expenses" ? "bg-blue-500" : ""
          }`}
        >
          Expenses
        </li>

        <li
          onClick={() => setView("reports")}
          className={`cursor-pointer p-2 rounded ${
            view === "reports" ? "bg-blue-500" : ""
          }`}
        >
          Reports
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;