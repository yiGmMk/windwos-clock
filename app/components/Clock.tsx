export default function Clock({ time }: { time: Date }) {
  return (
    <div className="w-[400px] bg-[#c3c7cb] border border-[#87888f] shadow-[inset_1px_1px_0px_#ffffff,1px_1px_3px_rgba(0,0,0,0.25)]">
      <div className="bg-[#000080] text-white px-2 py-0.5 text-sm flex items-center">
        <span>Clock - Beijing Time</span>
        <div className="ml-auto flex gap-1">
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">_</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">□</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">×</button>
        </div>
      </div>
      
      <div className="aspect-square relative bg-[#c3c7cb] p-8 border-t border-[#87888f]">
        {/* Minute Markers */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#000000]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 6}deg) translate(-50%, calc(-50% + 160px))`,
            }}
          />
        ))}
        
        {/* Hour Markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-[#008080]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translate(-50%, calc(-50% + 160px))`,
            }}
          />
        ))}
        
        {/* Hour Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-2 h-24 bg-black origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${
              ((time.getHours() % 12) * 360) / 12 +
              (time.getMinutes() * 30) / 60
            }deg)`,
          }}
        />
        
        {/* Minute Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-2 h-32 bg-black origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${
              (time.getMinutes() * 360) / 60 +
              (time.getSeconds() * 6) / 60
            }deg)`,
          }}
        />
        
        {/* Second Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-1 h-36 bg-black origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${(time.getSeconds() * 360) / 60}deg)`,
          }}
        />
        
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-center mt-2 text-xl font-bold">
        {time.toLocaleTimeString('zh-CN', { hour12: false })}
      </div>
    </div>
  )
}

