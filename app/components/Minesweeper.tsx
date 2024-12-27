import { Flag } from 'lucide-react'

export default function Minesweeper() {
  const grid = [
    [0, 1, '*', 1, 0, 0, 1, '*'],
    [0, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    ['*', 1, 0, 1, 1, 1, 0, 0],
    [2, 2, 0, 1, '*', 1, 0, 0],
    [1, '*', 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 1, '*', 1, 1, '*'],
  ]

  const revealedCells = [
    [true, true, false, true, true, true, false, false],
    [true, true, true, true, true, true, false, false],
    [true, true, true, true, true, true, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ]

  const flaggedCells = [
    [false, false, true, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ]

  return (
    <div className="w-[200px] bg-[#c3c7cb] border border-[#87888f] shadow-[inset_1px_1px_0px_#ffffff,1px_1px_3px_rgba(0,0,0,0.25)]">
      <div className="bg-[#000080] text-white px-2 py-0.5 text-sm flex items-center">
        <span>Minesweeper</span>
        <div className="ml-auto flex gap-1">
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">_</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">□</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">×</button>
        </div>
      </div>
      <div className="p-2">
        <div className="bg-[#c0c0c0] border-t border-l border-[#ffffff] border-r border-b border-[#808080] p-2 mb-2 flex justify-between">
          <div className="bg-black text-red-600 px-2 font-bold">010</div>
          <button className="bg-[#c0c0c0] border-t border-l border-[#ffffff] border-r border-b border-[#808080] w-8 h-8">
            🙂
          </button>
          <div className="bg-black text-red-600 px-2 font-bold">000</div>
        </div>
        <div className="grid grid-cols-8 gap-px">
          {grid.map((row, i) => 
            row.map((cell, j) => (
              <button 
                key={`${i}-${j}`} 
                className={`w-6 h-6 flex items-center justify-center text-xs font-bold
                  ${revealedCells[i][j] 
                    ? 'bg-[#c0c0c0] border border-[#808080]' 
                    : 'bg-[#c0c0c0] border-t border-l border-[#ffffff] border-r border-b border-[#808080]'
                  }`}
              >
                {flaggedCells[i][j] && !revealedCells[i][j] && (
                  <Flag size={14} className="text-red-600" />
                )}
                {revealedCells[i][j] && cell !== 0 && cell !== '*' && (
                  <span className={`
                    ${cell === 1 ? 'text-blue-600' : ''}
                    ${cell === 2 ? 'text-green-600' : ''}
                    ${cell === 3 ? 'text-red-600' : ''}
                    ${cell === 4 ? 'text-purple-600' : ''}
                  `}>
                    {cell}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

