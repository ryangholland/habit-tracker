function ProgressBar({ progress }) {
  return (
    <div className="mt-4 flex items-center gap-2 w-full">
      <span className="w-12 text-right text-sm font-medium text-black dark:text-white">
        {progress}%
      </span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-700 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
