import { Input } from "@headlessui/react";

function AddHabitForm() {
  return (
    <form className="flex bg-gray-800 rounded-md shadow-md">
      <Input
        name="habit_name"
        type="text"
        placeholder="Add a habit"
        className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </form>
  );
}

export default AddHabitForm;
