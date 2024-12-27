export default function Calculator() {
  return (
    <div className="w-[200px] bg-[#c3c7cb] border border-[#87888f] shadow-[inset_1px_1px_0px_#ffffff,1px_1px_3px_rgba(0,0,0,0.25)]">
      <div className="bg-[#000080] text-white px-2 py-0.5 text-sm flex items-center">
        <span>Calculator</span>
        <div className="ml-auto flex gap-1">
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">_</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">□</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">×</button>
        </div>
      </div>
      <div className="p-2">
        <div className="bg-white border border-[#87888f] p-1 mb-2 h-8 text-right text-xl">0.</div>
        <div className="grid grid-cols-5 gap-1">
          {['Bksp', 'CE', 'C', 'MC', '7', '8', '9', '/', 'sqrt', '4', '5', '6', '*', '%', '1', '2', '3', '-', '1/x', '0', '+/-', '.', '+', '='].map((btn) => (
            <button key={btn} className="bg-[#c3c7cb] border border-[#87888f] shadow-[inset_1px_1px_0px_#ffffff] p-1 text-xs">
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

