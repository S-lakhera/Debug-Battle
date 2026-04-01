import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll } = useHabit();

  const today = new Date().toISOString().split("T")[0];

  const completedTodayCount = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;
  const totalHabits = habits.length;

  const progressPercent = totalHabits > 0 ? (completedTodayCount / totalHabits) * 100 : 0;

  const topCategory = habits.reduce((acc, h) => {
    const cat = h.category || "None";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const mainFocus = Object.keys(topCategory).length > 0
    ? Object.keys(topCategory).reduce((a, b) => (topCategory[a] > topCategory[b] ? a : b))
    : "None";

  const highPriorityCount = habits.filter((h) => h.priority === "High").length;

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  if (habits.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-10 py-12 flex flex-col items-center justify-center w-3/4 max-w-md shadow-sm">
          <h3 className="text-xl font-medium text-slate-800 mb-2">No habits yet</h3>
          <p className="text-slate-500 text-sm font-sans">Start your journey by adding a new habit above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center ">
      {/* Daily Progress Card */}
      <div className="bg-white border w-2/3 border-slate-200 rounded-xl p-4 mb-8 shadow-sm">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Daily Progress
            </p>
            <h2 className="text-xl font-bold text-slate-800">Keep going</h2>
          </div>
          <span className="text-sm font-medium text-slate-500">
            {completedTodayCount} / {totalHabits}
          </span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="border-t border-slate-100 pt-4 flex gap-12">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Focus
            </p>
            <p className="text-sm font-semibold text-slate-800 capitalize">
              {mainFocus}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Priority
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {highPriorityCount} High Tasks
            </p>
          </div>
        </div>
      </div>

      {/* Your Routine Section */}
      <div className="w-2/3">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
          Your Routine
        </h3>
        <div className="space-y-4">
          {visibleHabits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitList;