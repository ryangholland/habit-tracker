function StatsSection({ title, children }) {
  return (
    <section className="mt-6 md:mt-12 flex flex-col gap-2">
      <h3 className="text-xl text-gray-700 dark:text-gray-300 text-center">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default StatsSection;
