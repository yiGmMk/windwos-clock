'use client';

import React, { useState, useEffect } from 'react';

// --- SVG ICONS COMPONENTS ---

const IconFloppy = () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-black">
        <path d="M2 2h20v20H2V2zm2 2v6h16V4H4zm4 2h8v2H8V6zm-4 14h16v-8H4v8zm2-2h12v-4H6v4z" />
    </svg>
);

const IconFolder = () => (
    <svg viewBox="0 0 24 24" className="w-12 h-10 fill-none stroke-black stroke-2">
        <path d="M2 4h6l2 2h12v14H2V4z" />
        <line x1="2" y1="8" x2="22" y2="8" />
    </svg>
);

const IconTrash = () => (
    <svg viewBox="0 0 24 24" className="w-10 h-12 fill-none stroke-black stroke-2">
        <path d="M4 6h16M8 6V4h8v2M6 6v14h12V6" />
        <line x1="10" y1="10" x2="10" y2="16" />
        <line x1="14" y1="10" x2="14" y2="16" />
        <line x1="6" y1="9" x2="18" y2="9" />
    </svg>
);

const IconHardDisk = () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-black stroke-2">
        <rect x="2" y="4" width="20" height="12" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <rect x="4" y="12" width="4" height="2" fill="black" />
        <path d="M2 16h20l-2 4H4l-2-4z" />
    </svg>
);

const IconBee = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black">
        <path d="M4 8h4v2H4zm6 0h4v2h-4zm6 0h2v4h-2v-2h-2v2h-4v-2H8v2H6v-2H4v6h16V8z" />
        <path d="M6 12h2v2H6zm4 0h4v2h-4zm6 0h2v2h-2z" fill="white" />
    </svg>
);

// --- UI COMPONENTS ---

const DitherPattern = () => (
    <div className="w-full h-full opacity-30" style={{
        backgroundImage: 'radial-gradient(black 1px, transparent 1px)',
        backgroundSize: '3px 3px'
    }}></div>
);

const WindowFrame = ({ title, children, className, width, height, zIndex = 10 }: any) => (
    <div
        className={`absolute bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] ${className}`}
        style={{ width, height, zIndex }}
    >
        {/* Title Bar */}
        <div className="h-6 border-b-2 border-black flex justify-between items-center bg-white">
            <div className="w-6 h-6 border-r-2 border-black flex items-center justify-center relative bg-white">
                <div className="absolute inset-0 p-1"><div className="w-full h-full border border-black bg-white relative"><div className="absolute top-0 left-0 w-full h-0.5 bg-black"></div></div></div>
            </div>
            <div className="flex-1 h-full flex items-center justify-center relative overflow-hidden">
                <DitherPattern />
                <span className="bg-white px-2 relative z-10 font-bold text-lg tracking-widest uppercase">{title}</span>
            </div>
            <div className="w-6 h-6 border-l-2 border-black flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black"></div>
            </div>
        </div>

        {/* Content Area */}
        <div className="relative h-[calc(100%-24px)] w-full overflow-hidden">
            {children}

            {/* Scroll Bars (Decoration) */}
            <div className="absolute right-0 top-0 w-6 h-full border-l-2 border-black flex flex-col justify-between bg-white">
                <div className="h-6 border-b-2 border-black flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-black"></div>
                </div>
                <div className="flex-1 relative"><DitherPattern /></div>
                <div className="h-6 border-t-2 border-black flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-black"></div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-6 border-t-2 border-black flex justify-between bg-white">
                <div className="w-6 border-r-2 border-black flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-black"></div>
                </div>
                <div className="flex-1 relative"><DitherPattern /></div>
                <div className="w-6 border-l-2 border-black bg-black"></div> {/* Corner box */}
            </div>
        </div>
    </div>
);

// --- CLOCK LOGIC ---

const AnalogClock = () => {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null; // Prevent hydration mismatch

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    return (
        <div className="relative w-full h-full bg-white overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
                opacity: 0.15
            }}></div>

            {/* Clock Face Numbers */}
            <div className="absolute inset-0 rounded-full m-4 border-2 border-black bg-white shadow-sm flex items-center justify-center">
                {[...Array(12)].map((_, i) => {
                    const num = i + 1;
                    const rotation = num * 30;
                    // Simple math to position numbers in a circle
                    const angle = (rotation - 90) * (Math.PI / 180);
                    const radius = 42; // percentage
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);

                    return (
                        <div key={num} className="absolute font-bold text-xl" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                            {num}
                        </div>
                    );
                })}

                {/* Center Nut */}
                <div className="absolute w-4 h-4 bg-yellow-600 rounded-full border border-black z-50 shadow-md"></div>

                {/* Hands */}
                {/* Hour */}
                <div className="absolute bg-black z-20 rounded-full origin-bottom"
                    style={{
                        width: '6px',
                        height: '25%',
                        bottom: '50%',
                        left: 'calc(50% - 3px)',
                        transform: `rotate(${hourDeg}deg)`
                    }}>
                    <div className="absolute -top-2 -left-1 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-black"></div>
                </div>

                {/* Minute */}
                <div className="absolute bg-black z-30 rounded-full origin-bottom"
                    style={{
                        width: '4px',
                        height: '35%',
                        bottom: '50%',
                        left: 'calc(50% - 2px)',
                        transform: `rotate(${minuteDeg}deg)`
                    }}>
                    <div className="absolute -top-2 -left-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-black"></div>
                </div>

                {/* Second */}
                <div className="absolute bg-black z-40 origin-bottom"
                    style={{
                        width: '1px',
                        height: '40%',
                        bottom: '50%',
                        left: '50%',
                        transform: `rotate(${secondDeg}deg)`
                    }}></div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

export default function RetroDesktop() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
            {/* The Main "Board" / Monitor */}
            <div className="relative w-[500px] h-[700px] bg-[#2fa046] border border-black shadow-2xl overflow-hidden select-none font-vt323 text-black">

                {/* Top Menu Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-white border-b-2 border-black flex items-center px-2 z-50 text-xl">
                    <div className="mr-6 font-bold cursor-pointer hover:underline">Desk</div>
                    <div className="bg-black text-white px-3 h-full flex items-center cursor-pointer relative group">
                        File
                        {/* Dropdown Menu */}
                        <div className="absolute top-8 left-0 bg-white border-2 border-black text-black w-64 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] p-1 leading-tight">
                            <div className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer">Open</div>
                            <div className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer font-bold">Show Info...</div>
                            <div className="h-[1px] bg-black my-1 border-b border-black border-dotted"></div>
                            <div className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer font-bold">New Folder...</div>
                            <div className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer">Close</div>
                            <div className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer font-bold">Close Window</div>
                            <div className="h-[1px] bg-black my-1 border-b border-black border-dotted"></div>
                            <div className="px-4 py-1 text-gray-400 pointer-events-none">Format...</div>
                        </div>
                    </div>
                    <div className="ml-6 cursor-pointer hover:underline">View</div>
                    <div className="ml-6 cursor-pointer hover:underline">Options</div>
                </div>

                {/* Desktop Icons */}
                <div className="absolute top-16 left-4 flex flex-col items-center gap-1">
                    <IconFloppy />
                    <span className="bg-white px-1 text-sm border border-black">FLOPPY A</span>
                </div>

                <div className="absolute top-40 left-4 flex flex-col items-center gap-1">
                    <IconFloppy />
                    <span className="bg-black text-white px-1 text-sm">FLOPPY DISK</span>
                </div>

                <div className="absolute bottom-4 left-4 flex flex-col items-center gap-1 z-0">
                    <IconTrash />
                    <span className="bg-white px-1 text-sm border border-black">TRASH</span>
                </div>

                <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 z-0">
                    <IconHardDisk />
                    <span className="bg-white px-1 text-sm border border-black">HARD DISK</span>
                </div>

                <div className="absolute top-1/2 left-16 z-0 opacity-50">
                    <IconBee />
                </div>

                {/* Background Window (Files) */}
                <WindowFrame
                    title=""
                    className="top-28 right-[-20px]"
                    width="300px"
                    height="200px"
                    zIndex={5}
                >
                    <div className="p-4 flex justify-around pt-8">
                        <div className="flex flex-col items-center">
                            <IconFolder />
                            <span className="mt-1 uppercase">Space</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <IconFolder />
                            <span className="mt-1 uppercase">Time</span>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-6 border-b border-black bg-white px-2">
                        {/* Fake Path */}
                        C:\...
                    </div>
                </WindowFrame>

                {/* Main Clock Window */}
                <WindowFrame
                    title="CLOCK"
                    className="top-56 left-1/2 -translate-x-1/2"
                    width="280px"
                    height="280px"
                    zIndex={20}
                >
                    <div className="w-[calc(100%-24px)] h-[calc(100%-24px)] relative">
                        <AnalogClock />
                    </div>
                </WindowFrame>

                {/* Tic Tac Toe Window */}
                <WindowFrame
                    title="by" // Trying to match the clipped title in the image
                    className="bottom-20 left-2"
                    width="240px"
                    height="180px"
                    zIndex={15}
                >
                    <div className="flex h-full w-[calc(100%-24px)]">
                        {/* Game Board */}
                        <div className="w-2/3 border-r-2 border-black flex items-center justify-center p-2 relative">
                            {/* Grid Lines */}
                            <div className="absolute w-full h-2 bg-black top-1/3"></div>
                            <div className="absolute w-full h-2 bg-black top-2/3"></div>
                            <div className="absolute h-full w-2 bg-black left-1/3"></div>
                            <div className="absolute h-full w-2 bg-black left-2/3"></div>

                            {/* X and 0 placeholder */}
                            <span className="absolute top-[10%] left-[60%] font-bold text-2xl">0</span>
                            <span className="absolute top-[45%] left-[45%] font-bold text-2xl">X</span>
                        </div>

                        {/* Sidebar Buttons */}
                        <div className="w-1/3 flex flex-col bg-[#c41c1c] p-1 gap-1 border-l-2 border-black relative">
                            <DitherPattern />
                            {['Start', 'Setup', 'Score', 'Info'].map((text) => (
                                <div key={text} className="bg-white border-2 border-black text-center text-sm cursor-pointer hover:bg-gray-200 z-10 relative shadow-sm">
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </WindowFrame>

            </div>
        </div>
    );
}