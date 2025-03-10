import React, { useState } from 'react';
import { Target, Check, Plus, Trash2 } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
}

export default function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Reduce Carbon Footprint",
      target: 1000,
      current: 820,
      unit: "kg",
      deadline: "2024-12-31"
    },
    {
      id: 2,
      title: "Energy Savings",
      target: 50000,
      current: 35000,
      unit: "₹",
      deadline: "2024-12-31"
    },
    {
      id: 3,
      title: "Solar Generation",
      target: 5000,
      current: 3200,
      unit: "kWh",
      deadline: "2024-12-31"
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: 0,
    unit: '',
    deadline: ''
  });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setGoals([
      ...goals,
      {
        id: Date.now(),
        ...newGoal,
        current: 0
      }
    ]);
    setShowAddGoal(false);
    setNewGoal({ title: '', target: 0, unit: '', deadline: '' });
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sustainability Goals</h2>
        <button
          onClick={() => setShowAddGoal(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-yellow-600 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Goal
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-sm text-gray-600">Target: {goal.target} {goal.unit}</p>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round((goal.current / goal.target) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Current: {goal.current} {goal.unit}</span>
              <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Value
                  </label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={e => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={newGoal.unit}
                    onChange={e => setNewGoal({ ...newGoal, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={e => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}