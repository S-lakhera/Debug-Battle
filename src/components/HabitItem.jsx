import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(habit);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates?.includes(today);
  const currentStreak = getStreak(habit.completedDates || []);

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-x flex flex-col mb-4">
        <input
          className="w-full border border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-indigo-500 mb-3 text-sm font-medium text-slate-800"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          placeholder="Habit Name"
        />
        <div className="flex gap-3 mb-4">
           <input
             className="w-1/2 border border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-indigo-500 text-sm text-slate-700"
             value={editData.goalValue}
             onChange={(e) => setEditData({ ...editData, goalValue: e.target.value })}
             placeholder="Goal"
           />
           <select 
             className="w-1/2 border border-slate-300 px-3 py-2 rounded-lg outline-none focus:border-indigo-500 text-sm bg-white text-slate-700"
             value={editData.unit}
             onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
           >
             <option value="Minutes">Minutes</option>
             <option value="Pages">Pages</option>
             <option value="Reps">Reps</option>
             <option value="Liters">Liters</option>
           </select>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-3">
          <button onClick={() => setEditing(false)} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
          <button onClick={handleSave} className="bg-[#4F46E5] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-[#4338CA] transition-colors">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-3 shadow-sm font-sans flex flex-col transition-all hover:shadow-md ${isDoneToday ? 'opacity-75' : ''}`}>
      {/* Top Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mr-3">
            {habit.category || 'Uncategorized'}
          </span>
          <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
            {habit.priority || 'Medium'}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-slate-800">{currentStreak}</span>
            <span className="text-orange-500 font-bold text-xs" style={{transform: "translateY(-1px)"}}>^^</span>
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Streak
          </span>
        </div>
      </div>

      {/* Habit Title */}
      <h3 className={`text-xl font-bold text-slate-800 mb-1 ${isDoneToday? "line-through":""}`}>{habit.name}</h3>

      {/* Divider */}
      <div className="w-full h-px bg-slate-100 my-4"></div>

      {/* Footer / Controls */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Goal
          </p>
          <p className="text-sm font-semibold text-slate-800">
            {habit.goalValue || 0} <span className="lowercase">{habit.unit || ''}</span>
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={() => setEditing(true)} 
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteHabit(habit.id)} 
            className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
          >
            Delete
          </button>
          <button 
            onClick={() => toggleHabit(habit.id)} 
            className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors border ${
              isDoneToday 
                ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50' 
                : 'bg-[#593cfb] text-white border-[#593cfb] hover:bg-[#4a2ee0]'
            }`}
          >
            {isDoneToday ? 'Undo' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;