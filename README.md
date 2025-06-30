# Daily Habit Tracker

This is a habit tracking web application built with React and Supabase. It allows users to create daily habits, track their progress over time, and visualize their consistency. The app includes features like habit sorting, completion history, motivational quotes, and both guest mode (localStorage) and authenticated mode (Supabase).

This project was built as a portfolio piece to demonstrate modern React practices, clean code organization, and thoughtful UI/UX design.

---

## Features

- Add, edit, and delete daily habits
- Mark habits as complete each day
- View habit history in a weekly table and calendar heatmap
- Track streaks, completion averages, and most completed habits
- Sort habits by name or completion status
- Toggle dark mode and motivational quotes
- Clear habit history or delete all data
- Guest mode (data stored locally)
- Authenticated mode with Supabase backend
- Fully responsive design
- Unit and component tests using Vitest and React Testing Library

---

## Tech Stack

- **Frontend**: React (with Vite), Tailwind CSS, Headless UI
- **State Management**: React Context and custom hooks
- **Backend**: Supabase (auth and database)
- **Testing**: Vitest, React Testing Library
- **Tooling**: ESLint, Prettier, Conventional Commits

---

## Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/ryangholland/habit-tracker.git
cd habit-tracker
npm install
```

### 2. Set environment variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your Supabase project settings.

### 3. Start the development server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Running Tests

```bash
npm run test
```

Runs all unit and component tests using Vitest.

---

## Purpose

This project was created to demonstrate:

- Modular, scalable React architecture
- Clean UI state management using Context and custom hooks
- Responsive design and component reuse
- Integration with a real backend (Supabase)
- Testing best practices with Vitest and React Testing Library

---

## Author

**Ryan Holland**  
[Your portfolio link]  
[LinkedIn profile link]  
[GitHub: @ryangholland](https://github.com/ryangholland)

---

## License

This project is open-source under the MIT License.
