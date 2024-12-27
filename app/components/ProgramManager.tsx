import { Paintbrush, Terminal, NotepadTextIcon as Notepad, Calendar } from 'lucide-react'

export default function ProgramManager() {
  return (
    <div className="w-[800px] h-[600px] bg-[#c3c7cb] border border-[#87888f] shadow-[inset_1px_1px_0px_#ffffff,1px_1px_3px_rgba(0,0,0,0.25)]">
      <div className="bg-[#000080] text-white px-2 py-0.5 text-sm flex items-center font-bold">
        <span>Program Manager</span>
        <div className="ml-auto flex gap-1">
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">_</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">□</button>
          <button className="border border-white w-4 h-3 flex items-center justify-center text-[10px] leading-none">×</button>
        </div>
      </div>
      <div className="p-4 flex flex-wrap gap-4">
        <ProgramGroup name="Main" icon={<Terminal size={32} />} />
        <ProgramGroup name="Accessories" icon={<Paintbrush size={32} />} />
        <ProgramGroup name="Games" icon={<Notepad size={32} />} />
        <ProgramGroup name="StartUp" icon={<Calendar size={32} />} />
      </div>
    </div>
  )
}

function ProgramGroup({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="w-24 h-20 bg-[#c3c7cb] flex flex-col items-center justify-center cursor-pointer">
      <div className="w-12 h-12 bg-[#c3c7cb] border-2 border-[#000000] mb-1 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-center">{name}</span>
    </div>
  )
}

