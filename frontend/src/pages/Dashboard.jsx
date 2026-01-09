import { useState, useEffect, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // <--- Import Toast
import Swal from "sweetalert2"; // <--- Import SweetAlert

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch tasks"); // Error Toast
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/tasks/${editingId}`, formData);
        toast.success("Task updated successfully!"); // Success Toast
        setEditingId(null);
      } else {
        await API.post("/tasks", formData);
        toast.success("Task created successfully!"); // Success Toast
      }

      setFormData({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  // --- NEW SWEETALERT DELETE LOGIC ---
  const handleDelete = async (id) => {
    // SweetAlert Confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));

        // Success Alert
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const handleEdit = (task) => {
    setFormData({ title: task.title, description: task.description });
    setEditingId(task._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode enabled", { icon: "✏️" }); // Custom Icon Toast
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // ... (Rest of the JSX remains exactly the same as before) ...
  // Be sure to include the return statement and rest of the UI code here.

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // ... Paste the previous JSX return here ...
    // It is identical to the previous step, just ensure functions above are replaced.
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">
          Task<span className="text-gray-800">Manager</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 hidden md:block">
            Welcome, <b>{user?.name}</b>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Input Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10 border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {editingId ? "✏️ Update Task" : "➕ Create New Task"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              placeholder="Task Title"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Description (Optional)"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                  editingId
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editingId ? "Update" : "Add Task"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: "", description: "" });
                    toast("Cancelled edit", { icon: "❌" });
                  }}
                  className="px-4 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Your Tasks ({filteredTasks.length})
          </h2>
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            className="px-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">
            Loading your tasks...
          </p>
        ) : (
          /* Task Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400 bg-white rounded-lg border border-dashed border-gray-300">
                {searchQuery
                  ? "No tasks match your search."
                  : "You have no tasks yet. Create one above!"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
