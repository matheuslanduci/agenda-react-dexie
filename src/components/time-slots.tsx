const timeSlots = new Array(24).fill(0).map((_, i) => i)

export function TimeSlots() {
  return (
    <div className="h-full pb-14 w-[72px] border-r px-4">
      {timeSlots.map((hour) => (
        <div key={hour} className="h-[60px] text-right flex items-center justify-center">
          {hour}:00
        </div>
      ))}
    </div>
  )
}
