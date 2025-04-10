'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '@/lib/api';
import { TaskCard } from '@/components/tasks/TaskCard';
import { CreateTaskForm } from '@/components/tasks/CreateTaskForm';
import { useToast } from '@/components/ui/use-toast';
import { TaskStatus } from '../enums';

export default function DashboardPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  // React Query client
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(1, 100),
  });

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Task created successfully' });
      setShowForm(false);
      queryClient.invalidateQueries(['tasks']); // Refetch tasks
    },
    onError: () => {
      toast({ 
        title: 'Error', 
        description: 'Failed to create task', 
        variant: 'destructive' 
      });
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) => 
      updateTaskStatus(taskId, { status }),
    onSuccess: () => {
      toast({ title: 'Success', description: 'Task status updated' });
      queryClient.invalidateQueries(['tasks']); // Refetch tasks
    },
  });

  // Delete task mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Task deleted' });
      queryClient.invalidateQueries(['tasks']); // Refetch tasks
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {showForm ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Hide Form
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </>
            )}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 border-0 rounded-xl bg-white shadow-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 -mx-6 -mt-6 mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
            <CreateTaskForm 
              onSubmit={(values) => createMutation.mutate(values)} 
              isLoading={createMutation.isPending}
            />
          </div>
        )}

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-white rounded-xl shadow-lg">
            <p className="text-red-500">Error loading tasks</p>
            <Button 
              onClick={() => queryClient.invalidateQueries(['tasks'])}
              variant="outline"
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={(taskId, status) =>
                    updateStatusMutation.mutate({ taskId, status })
                  }
                  onDelete={(taskId) => deleteMutation.mutate(taskId)}
                />
              ))
            ) : (
              <div className="p-8 text-center bg-white rounded-xl shadow-lg">
                <p className="text-gray-600">No tasks available</p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Task
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
