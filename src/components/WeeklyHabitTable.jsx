import { useHabits } from '../hooks/useHabits'
import { format, subDays } from 'date-fns'

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i)
    days.push({
      iso: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEE M/d'), // e.g., Mon 6/3
    })
  }
  return days
}

export default function WeeklyHabitTable() {
  const { habits } = useHabits()
  const days = getLast7Days()

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left text-white border border-gray-700">
        <thead>
          <tr>
            <th className="p-2 border border-gray-700">Habit</th>
            {days.map((day) => (
              <th key={day.iso} className="p-2 border border-gray-700 text-center">
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Habit rows will go here */}
        </tbody>
      </table>
    </div>
  )
}
