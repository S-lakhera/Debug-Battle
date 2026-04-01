import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      priority: "Medium",
    }
  });

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completed: false,
    };

    addHabit(payload);
    console.log(payload);
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onCommit)} className="flex flex-col gap-4 text-slate-700">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-slate-700">Habit Name</label>
        <input 
          {...register("name")} 
          id="name" 
          placeholder="e.g. Morning Exercise" 
          className="w-full border border-slate-300 px-3 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-400 font-sans" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="goalValue" className="text-sm font-semibold text-slate-700">Daily Goal</label>
          <input 
            {...register("goalValue")} 
            id="goalValue" 
            placeholder="30" 
            className="w-full border border-slate-300 px-3 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-400 font-sans" 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="unit" className="text-sm font-semibold text-slate-700">Unit</label>
          <select 
            {...register("unit")} 
            id="unit" 
            className="w-full bg-white border border-slate-300 px-3 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-700 font-sans cursor-pointer"
          >
            <option value="Minutes">Minutes</option>
            <option value="Pages">Pages</option>
            <option value="Reps">Reps</option>
            <option value="Liters">Liters</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="startDate" className="text-sm font-semibold text-slate-700">Start Date</label>
          <input 
            type="date"
            {...register("startDate")} 
            id="startDate"
            placeholder="01-04-2026" 
            className="w-full border border-slate-300 px-3 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-700 font-sans" 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-semibold text-slate-700">Category</label>
          <select 
            {...register("category")} 
            id="category" 
            className="w-full bg-white border border-slate-300 px-3 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-700 font-sans cursor-pointer"
          >
            <option value="Mindset">Mindset</option>
            <option value="Health">Health</option>
            <option value="focus">Focus</option>
            <option value="growth">Growth</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="motivation" className="text-sm font-semibold text-slate-700">Motivation</label>
        <textarea 
          {...register("motivation")} 
          id="motivation" 
          rows="2"
          placeholder="Why is this important to you?" 
          className="w-full border border-slate-300 px-3 py-2.5 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-400 resize-none font-sans" 
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-semibold text-slate-700">Priority Level</label>
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <input 
              type="radio" 
              value="Low" 
              {...register("priority")} 
              className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer" 
            />
            Low
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900 transition-colors">
            <input 
              type="radio" 
              value="Medium" 
              {...register("priority")} 
              className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer" 
            />
            Medium
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <input 
              type="radio" 
              value="High" 
              {...register("priority")} 
              className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer" 
            />
            High
          </label>
        </div>
      </div>

      <button 
        type="submit" 
        className="mt-3 w-full py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-lg transition-colors flex justify-center items-center shadow-sm"
      >
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;