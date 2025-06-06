function IconButton({ label, icon: Icon, className, onClick }) {
  return (
    <div className="icon-container p-1">
      <button
        type="button"
        className={`text-gray-600 dark:text-gray-400 hover:cursor-pointer hover:text-black dark:hover:text-white ${className}`}
        aria-label={label}
        onClick={onClick}
      >
        <Icon />
      </button>
    </div>
  );
}

export default IconButton;
