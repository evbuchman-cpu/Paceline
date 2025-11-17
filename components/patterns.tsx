export function TopographicPattern() {
  return (
    <div
      className="absolute inset-0 w-full h-full opacity-[0.20]"
      style={{
        backgroundImage: "url(/patterns/topographic-pattern.jpg)",
        backgroundRepeat: "repeat",
        backgroundSize: "400px 400px",
      }}
      aria-hidden="true"
    />
  )
}

export function TrailMarkerDots() {
  return (
    <div className="flex items-center justify-center gap-2 my-8" aria-hidden="true">
      <div className="w-2 h-2 rounded-full bg-[#C87350]" />
      <div className="w-2 h-2 rounded-full bg-[#C87350]" />
      <div className="w-2 h-2 rounded-full bg-[#C87350]" />
    </div>
  )
}
