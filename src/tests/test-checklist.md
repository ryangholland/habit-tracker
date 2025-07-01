# Test Coverage Checklist

This document tracks the test coverage status of the Daily Habit Tracker application. It includes components, context providers, hooks, and utilities. The goal is to achieve high-quality coverage across all critical logic and user-facing functionality.

---

## Component Coverage

| Component                      | Status  | Notes |
|-------------------------------|---------|-------|
| AddHabitForm                  | ✅      | Covered. Revisit to verify guest/Supabase logic still matches current code. |
| HabitItem                     | ✅      | Covered. Includes checkbox interaction. |
| HabitList                     | ⚠️      | Partially covered. Needs sorting assertions. |
| HabitSortLabel                | ❌      | Very simple. Should test label rendering. |
| QuoteCard                     | ❌      | Needs test for daily quote rendering. |
| EditPastDaysDialog            | ❌      | Complex logic. Needs tests for cell interaction and guest/Supabase flows. |
| DeleteHabitDialog             | ❌      | Test dialog visibility and confirm behavior. |
| ConfirmationDialog            | ❌      | Unit test for button click handlers and open/close behavior. |
| ProgressBar                   | ❌      | Test correct rendering of progress percentage. |
| Tabs                          | ⚠️      | Basic tests exist. Revisit active tab class logic. |
| Header                        | ❌      | Needs tests for guest/user display and logout menu. |
| Footer                        | ❌      | Optional. Can test copyright/link. |
| GeneralSettings               | ❌      | Toggle switches, sort dropdown, danger zone buttons. |
| HabitNameEditor               | ❌      | Edit, save, cancel interaction. |
| ActiveDaySelector             | ❌      | Test "Every Day" and individual toggle logic. |
| HabitSettingsItem             | ❌      | Expand/collapse, edit, delete, clear logic. |
| HabitSettings                 | ❌      | Integration test for multiple setting items. |
| StatsSummary                  | ✅      | Covered. Includes edge case handling. |
| WeeklyHabitTable              | ❌      | Test rendering and checkmark display. |
| HabitHeatmap                  | ✅      | Covered. Tooltip content tested. |

---

## Context Providers

| Context Provider              | Status  | Notes |
|------------------------------|---------|-------|
| HabitProvider                | ✅      | Covered. Check Supabase path behavior. |
| SettingsProvider             | ❌      | Test dark mode, quote toggle, and persistence to localStorage. |
| DeleteDialogProvider         | ❌      | Simple context. Test open/close behavior. |
| AuthProvider                 | ❌      | Optional. Could simulate login/logout flow. |

---

## Custom Hooks

| Hook                          | Status  | Notes |
|------------------------------|---------|-------|
| useProgress                  | ✅      | Covered. |
| useToggleHabitStatus         | ❌      | Needs full coverage. Different paths for guest vs Supabase. |
| useHabits                    | ❌      | Thin wrapper — may not need direct test. |
| useDeleteDialog              | ❌      | Simple. Could test default context behavior. |
| useToday                     | ❌      | Simple date utility. Optional. |

---

## Utility Functions

| Utility Module               | Status  | Notes |
|-----------------------------|---------|-------|
| habitUtils.js               | ✅      | Fully tested. |
| dateUtils.js                | ❌      | Test return structure of getLast7Days. |
| tooltipUtils.js             | ❌      | Test shape of returned tooltip attributes. |
| quotes.js                   | ❌      | Test quote selection for fixed dates. |

---

## Status Key

- ✅ Covered and verified
- ⚠️ Partially covered or needs update
- ❌ No test coverage yet

---

## Next Steps

1. Re-run and verify all existing tests pass
2. Prioritize high-impact or complex areas for new tests (e.g. `EditPastDaysDialog`, `HabitSettings`)
3. Incrementally work through uncovered areas using this checklist