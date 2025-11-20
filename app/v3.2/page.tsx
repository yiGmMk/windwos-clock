'use client';

import React, { useState, useEffect } from 'react';

// --- SVG ICONS (RISC OS Style) ---

const IconFolder = ({ label, badge }: { label: string, badge?: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center w-20 mb-4">
        <div className="relative w-12 h-10">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-[#5b9bd5] stroke-black stroke-1 drop-shadow-sm">
                <path d="M2 4h6l2 2h12v14H2V4z" />
                <rect x="4" y="8" width="16" height="10" fill="#9dc3e6" />
            </svg>
            {badge && <div className="absolute inset-0 flex items-center justify-center">{badge}</div>}
        </div>
        <span className="mt-1 text-xs font-bold text-black font-sans text-center leading-tight">{label}</span>
    </div>
);

const IconApp = ({ label, color = "#d9d9d9", icon }: { label: string, color?: string, icon?: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center w-20 mb-4">
        <div className="w-10 h-10 border border-black shadow-sm relative flex items-center justify-center" style={{ backgroundColor: color }}>
            {icon}
        </div>
        <span className="mt-1 text-xs font-bold text-black font-sans text-center leading-tight">{label}</span>
    </div>
);

const ScrollBar = ({ horizontal = false }) => {
    if (horizontal) {
        return (
            <div className="h-5 w-full border-t border-black bg-[#e1e1e1] flex flex-row justify-between items-center px-1 relative">
                <div className="absolute left-0 top-0 bottom-0 w-6 border-r border-black flex items-center justify-center bg-[#d1d1d1]">←</div>
                <div className="absolute right-6 top-0 bottom-0 w-6 border-l border-black flex items-center justify-center bg-[#d1d1d1]">→</div>
                <div className="absolute right-0 top-0 bottom-0 w-6 border-l border-black flex items-center justify-center bg-[#d1d1d1]">□</div>
                <div className="mx-8 h-3 w-1/3 bg-[#b0b0b0] border border-black rounded-full"></div>
            </div>
        )
    }
    return (
        <div className="w-6 h-full border-l border-black bg-[#e1e1e1] flex flex-col justify-between items-center py-1 relative">
            <div className="absolute top-0 left-0 right-0 h-6 border-b border-black flex items-center justify-center bg-[#d1d1d1]">↑</div>
            <div className="absolute bottom-6 left-0 right-0 h-6 border-t border-black flex items-center justify-center bg-[#d1d1d1]">↓</div>
            <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-black flex items-center justify-center bg-[#d1d1d1]">□</div>
            <div className="my-8 w-3 h-1/3 bg-[#b0b0b0] border border-black rounded-full"></div>
        </div>
    )
};

// --- WINDOW COMPONENT ---

const RiscWindow = ({ title, children, className, width, height, zIndex = 10, withScroll = true, bg = "bg-white" }: any) => (
    <div
        className={`absolute flex flex-col border border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] ${className}`}
        style={{ width, height, zIndex }}
    >
        {/* Title Bar */}
        <div className="h-7 bg-[#dcdcdc] border-b border-black flex justify-between items-center select-none">
            <div className="w-7 h-full border-r border-black flex items-center justify-center bg-[#e1e1e1] hover:bg-white cursor-pointer">
                <div className="w-3 h-3 border border-black bg-white relative">
                    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-[10px] font-bold">×</div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center font-sans font-bold text-sm tracking-wide text-black">
                {title}
            </div>
            <div className="w-7 h-full border-l border-black flex items-center justify-center bg-[#e1e1e1] hover:bg-white cursor-pointer">
                <div className="w-3 h-3 border border-black bg-white"></div>
            </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 relative overflow-hidden ${bg} flex`}>
            <div className="flex-1 relative overflow-hidden">
                {children}
            </div>
            {withScroll && <ScrollBar />}
        </div>
        {withScroll && <ScrollBar horizontal />}
    </div>
);

// --- CLOCK COMPONENT ---

const RiscClock = () => {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    return (
        <div className="w-full h-full bg-[#f0f0f0] relative select-none flex items-center justify-center">
            {/* Clock Face */}
            <div className="w-[90%] h-[90%] relative rounded-full bg-white border border-gray-300 shadow-inner">

                {/* Ticks */}
                {[...Array(60)].map((_, i) => {
                    const isHour = i % 5 === 0;
                    const angle = (i * 6 - 90) * (Math.PI / 180);
                    // Radius for positioning
                    const r = 48; // percent
                    const x = 50 + r * Math.cos(angle);
                    const y = 50 + r * Math.sin(angle);

                    return (
                        <div
                            key={i}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${isHour ? 'bg-[#1a3c96] w-2 h-2 sm:w-3 sm:h-3' : 'bg-black w-0.5 h-0.5 rounded-full'}`}
                            style={{ left: `${x}%`, top: `${y}%` }}
                        />
                    );
                })}

                {/* Hands Container */}
                <div className="absolute inset-0">

                    {/* Hour Hand (Grey, tapered) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full origin-bottom z-10"
                        style={{ height: '30%', transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}>
                        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[40px] border-l-transparent border-r-transparent border-b-gray-500 opacity-90"></div>
                    </div>

                    {/* Minute Hand (Grey, tapered, longer) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full origin-bottom z-20"
                        style={{ height: '42%', transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}>
                        <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[60px] border-l-transparent border-r-transparent border-b-gray-500 opacity-90"></div>
                    </div>

                    {/* Second Hand (Red, thin) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full origin-bottom z-30 bg-[#cc0000]"
                        style={{ width: '1px', height: '45%', transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }}>
                    </div>

                    {/* Center Cap */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cc0000] border-2 border-[#d4af37] z-40 shadow-sm"></div>
                </div>

            </div>
        </div>
    );
};

// --- APP COMPONENTS ---

export default function RiscOSDesktop() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4 font-sans">
            {/* The Monitor/Board Area */}
            <div className="relative w-[600px] h-[750px] bg-[#a0a0a0] border-2 border-gray-400 shadow-2xl overflow-hidden select-none text-black">

                {/* 1. BACKGROUND ADFS WINDOW (Layer 1) */}
                <RiscWindow
                    title="ADFS::App1.$"
                    width="580px"
                    height="400px"
                    className="top-2 left-2"
                    zIndex={1}
                    bg="bg-[#d9d9d9]"
                >
                    <div className="p-4 grid grid-cols-5 gap-2 content-start">
                        <IconApp label="!FontPrint" color="#e6e6e6" icon={<div className="text-xl">🖨️</div>} />
                        <IconFolder label="!Fonts" badge={<span className="font-serif font-bold text-white bg-black px-0.5 text-[8px]">F</span>} />
                        <IconApp label="!PrintEdit" color="#e6e6e6" icon={<div className="text-xl">📝</div>} />
                        <IconApp label="!Printer" color="#e6e6e6" icon={<div className="text-xl">📠</div>} />
                        <div className="w-20"></div> {/* Spacer */}

                        <IconFolder label="!Scrap" badge={<div className="w-2 h-2 bg-white rotate-45"></div>} />
                        <IconApp label="!SetIcons" icon={<div className="grid grid-cols-2 w-full h-full"><div className="bg-red-500"></div><div className="bg-blue-500"></div></div>} />
                        <IconApp label="!Squash" icon={<div className="text-green-600 font-bold text-lg">↔</div>} />
                        <IconFolder label="!System" badge={<span className="text-yellow-300 font-bold">!</span>} />
                        <div className="w-20"></div>

                        <IconApp label="DrawDem" icon={<div className="text-red-500 text-xl">△</div>} />
                    </div>
                </RiscWindow>

                {/* 2. PAINT WINDOW (Layer 2 - Bottom Left) */}
                <RiscWindow
                    title="Paint"
                    width="300px"
                    height="300px"
                    className="bottom-16 left-4"
                    zIndex={5}
                    bg="bg-[#a0a0a0]" // Darker grey for canvas bg
                >
                    <div className="flex h-full">
                        {/* Toolbar */}
                        <div className="w-10 bg-[#d9d9d9] border-r border-black flex flex-col gap-1 p-1 items-center">
                            <div className="w-6 h-6 border border-black bg-white flex items-center justify-center">✏️</div>
                            <div className="w-6 h-6 border border-black bg-white flex items-center justify-center">🖌️</div>
                            <div className="w-6 h-6 border border-black bg-white flex items-center justify-center">⬛</div>
                            <div className="w-6 h-6 border border-black bg-white flex items-center justify-center">⭕</div>
                        </div>
                        {/* Canvas */}
                        <div className="flex-1 bg-[#708090] relative overflow-hidden border-inset p-2">
                            <div className="absolute top-4 left-4 w-32 h-20 border-2 border-red-500"></div>
                            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-400"></div>
                            {/* Pixel noise to simulate the image content */}
                            <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+")' }}></div>
                        </div>
                    </div>
                </RiscWindow>

                {/* 3. CALCULATOR (Layer 3 - Bottom Right) */}
                <RiscWindow
                    title="Calculator"
                    width="180px"
                    height="240px"
                    className="bottom-24 right-2"
                    zIndex={6}
                    bg="bg-[#d9d9d9]"
                >
                    <div className="p-2 flex flex-col h-full">
                        <div className="bg-white border border-black h-8 mb-2 text-right px-1 font-mono text-xl">0.</div>
                        <div className="grid grid-cols-4 gap-1 flex-1">
                            {['C', '/', '*', '-'].map(k => <button key={k} className={`border border-black ${k === 'C' ? 'bg-red-600 text-white' : 'bg-[#bfbfbf]'}`}>{k}</button>)}
                            {['7', '8', '9', '+'].map(k => <button key={k} className="border border-black bg-[#e6e6e6]">{k}</button>)}
                            {['4', '5', '6', '='].map(k => <button key={k} className="border border-black bg-[#e6e6e6]">{k}</button>)}
                            {['1', '2', '3', '.'].map(k => <button key={k} className="border border-black bg-[#e6e6e6]">{k}</button>)}
                            <button className="col-span-2 border border-black bg-[#e6e6e6]">0</button>
                        </div>
                    </div>
                </RiscWindow>

                {/* 4. PALETTE (Layer 4 - Top Right) */}
                <RiscWindow
                    title="Palette"
                    width="160px"
                    height="220px"
                    className="top-8 right-8"
                    zIndex={25}
                    bg="bg-[#d9d9d9]"
                >
                    <div className="p-1 flex flex-col gap-1">
                        <div className="h-3 bg-gray-300 border border-black relative"><div className="absolute right-0 h-full w-4 bg-black"></div></div>
                        <div className="h-3 bg-gray-300 border border-black relative"><div className="absolute right-2 h-full w-4 bg-black"></div></div>
                        <div className="h-3 bg-gray-300 border border-black relative"><div className="absolute left-0 h-full w-4 bg-black"></div></div>

                        <div className="h-8 bg-gradient-to-r from-white via-gray-500 to-black border border-black my-1"></div>

                        <div className="grid grid-cols-4 gap-0.5 border border-black bg-black p-0.5">
                            {['#fff', '#ddd', '#bbb', '#999', '#777', '#555', '#333', '#000',
                                '#00f', '#0f0', '#f00', '#ff0', '#0ff', '#f0f', '#fa0', '#004'].map((c, i) => (
                                    <div key={i} className="w-full h-5" style={{ backgroundColor: c }}>
                                        {i === 7 && <span className="text-white text-[8px] flex justify-center items-center h-full">7</span>}
                                    </div>
                                ))}
                        </div>

                        <div className="grid grid-cols-4 gap-0.5 text-[9px] font-bold mt-1">
                            <button className="border border-black bg-white">Bor</button>
                            <button className="border border-black bg-white">Ms1</button>
                            <button className="border border-black bg-white">Ms2</button>
                            <button className="border border-black bg-white">Ms3</button>
                        </div>
                    </div>
                </RiscWindow>

                {/* 5. MAIN CLOCK (Layer 5 - Center Top) */}
                <RiscWindow
                    title="Clock"
                    width="260px"
                    height="260px"
                    className="top-32 left-1/2 -translate-x-1/2"
                    zIndex={30}
                    withScroll={false}
                >
                    <RiscClock />
                </RiscWindow>

                {/* MOUSE CURSOR */}
                <div className="absolute bottom-40 right-40 z-[100]">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-md">
                        <path d="M0 0 L0 16 L4 12 L8 20 L10 19 L6 11 L12 11 Z" fill="#2b4f81" stroke="white" strokeWidth="1" />
                    </svg>
                </div>

                {/* BOTTOM ICON BAR */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#d9d9d9] border-t border-white flex items-end justify-between px-2 pb-1 z-50">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-8 h-4 border border-black bg-[#c0c0c0] relative">
                                <div className="absolute top-1 left-1 right-1 h-1 bg-black"></div>
                            </div>
                            <span className="text-[10px] font-bold">:0</span>
                        </div>
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-6 h-6 bg-white border border-black flex items-center justify-center text-xs font-bold relative">
                                <div className="absolute -top-1 -right-1 w-full h-full border border-black bg-white z-0"></div>
                                <div className="relative z-10 bg-white border border-black w-full h-full flex items-center justify-center">Apps</div>
                            </div>
                            <span className="text-[10px] font-bold mt-1">Apps</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Palette Icon */}
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-6 h-6 grid grid-cols-2 grid-rows-2 border border-black">
                                <div className="bg-red-500"></div>
                                <div className="bg-blue-500"></div>
                                <div className="bg-yellow-500"></div>
                                <div className="bg-green-500"></div>
                            </div>
                        </div>
                        {/* Calculator Icon */}
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-6 h-6 bg-gray-700 grid grid-cols-3 gap-px p-0.5 border border-black">
                                {[...Array(9)].map((_, i) => <div key={i} className="bg-white rounded-[1px]"></div>)}
                            </div>
                        </div>
                        {/* Display Icon */}
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-6 h-6 bg-black relative overflow-hidden border border-white shadow-sm">
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-600"></div>
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-yellow-400"></div>
                            </div>
                        </div>
                        {/* Acorn/Green Icon */}
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-6 h-6 bg-[#d9d9d9] text-green-700 font-bold text-xl flex items-center justify-center border border-black rounded-full">
                                🌰
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}