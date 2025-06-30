const sortLabelMap = {
  default: "Default",
  "name-asc": "Name (A–Z)",
  "name-desc": "Name (Z–A)",
  "incomplete-first": "Incomplete First",
  "complete-first": "Complete First",
};

function HabitSortLabel({ sortOrder }) {
  const label = sortLabelMap[sortOrder] || "Default";

  return (
    <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-2 text-right">
      Sorted: {label}
    </p>
  );
}

export default HabitSortLabel;
