import React from "react";

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-600 mb-4 h-16 overflow-y-auto">
        {task.description || "No description provided."}
      </p>

      <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded hover:bg-blue-50 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
