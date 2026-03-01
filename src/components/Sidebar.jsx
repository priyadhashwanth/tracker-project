 function Sidebar() {
  return (
    <div className="w-64 bg-indigo-600 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>

      <ul className="space-y-4">
        <li className="hover:bg-indigo-500 p-2 rounded cursor-pointer">
          Dashboard
        </li>
        <li className="hover:bg-indigo-500 p-2 rounded cursor-pointer">
          Expenses
        </li>
        <li className="hover:bg-indigo-500 p-2 rounded cursor-pointer">
          Reports
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;