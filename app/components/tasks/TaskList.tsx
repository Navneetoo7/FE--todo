import React from "react";
import { Task } from "@/app/types";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="py-4"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {task.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{task.description}</p>
              <p className="mt-1 text-xs text-gray-400">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
