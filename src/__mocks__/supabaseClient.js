export const supabase = {
  from: (tableName) => {
    const chain = {
      insert: () => ({
        select: () => ({
          single: async () => ({
            data: {
              id: 1,
              name: "Workout",
              active_days: [0, 1, 2, 3, 4, 5, 6],
              habit_history: [],
            },
            error: null,
          }),
        }),
      }),
      select: () => chain,
      eq: () =>
        Promise.resolve({
          data: [],
          error: null,
        }),
    };
    return chain;
  },
};
