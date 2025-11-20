"use client";

import React, { useState, useEffect } from "react";

type ThemeKey = "GEM" | "RISC" | "AMIGA" | "WIN31";

export default function RetroClock() {
    const [theme, setTheme] = useState<ThemeKey>("GEM");
    const [time, setTime] = useState<Date | null>(null); // 避免服务端渲染不一致

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return <div className="bg-black h-screen w-full"></div>;

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    // --- 样式配置系统 ---

    // 背景颜色与桌面
    const bgStyles: Record<ThemeKey, string> = {
        GEM: "bg-[#357a35]", // Atari ST 经典绿
        RISC: "bg-[#808080]", // RISC OS 灰
        AMIGA: "bg-[#0050a0]", // Workbench 1.3 蓝
        WIN31: "bg-[#c0c0c0]", // Win3.1 灰
    };

    // 窗口外框风格
    const windowFrameStyles: Record<ThemeKey, string> = {
        GEM: "bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.5)]",
        RISC: "bg-[#d8d8d8] border border-gray-500 shadow-lg",
        AMIGA: "bg-white border-2 border-[#0050a0] shadow-[8px_8px_0_rgba(0,0,0,0.2)] relative",
        WIN31: "bg-white border-[3px] border-[#c0c0c0] outline outline-1 outline-black shadow-[2px_2px_0_black,-1px_-1px_0_white]", // 伪3D边框
    };

    // 标题栏风格
    const renderTitleBar = () => {
        switch (theme) {
            case "GEM":
                return (
                    <div className="flex items-center justify-between border-b-2 border-black p-1 bg-white h-8">
                        <div className="w-5 h-5 border-2 border-black bg-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-black"></div>
                        </div>
                        <span className="font-[family-name:var(--font-pixel)] text-2xl tracking-wider">CLOCK</span>
                        <div className="w-5 h-5 border-2 border-black bg-white flex items-center justify-center">
                            <div className="w-3 h-3 border border-black"></div>
                        </div>
                    </div>
                );
            case "AMIGA":
                return (
                    <div className="flex items-center justify-between bg-white border-b-2 border-[#0050a0] px-1 h-6">
                        <div className="w-4 h-4 bg-[#0050a0] border border-white ml-1"></div>
                        <span className="text-[#0050a0] font-bold font-[family-name:var(--font-pixel)] text-xl">Clock V2.22</span>
                        <div className="flex gap-1">
                            <div className="w-4 h-4 border border-[#0050a0] flex items-center justify-center text-[10px] leading-none font-bold text-[#0050a0]">▣</div>
                            <div className="w-4 h-4 border border-[#0050a0] flex items-center justify-center text-[10px] leading-none font-bold text-[#0050a0]">▫</div>
                        </div>
                    </div>
                );
            case "WIN31":
                return (
                    <div className="flex items-center justify-between bg-[#000084] p-1 h-8">
                        <div className="w-6 h-5 bg-[#c0c0c0] shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_black] flex items-center justify-center">
                            <div className="w-3 h-1 bg-black"></div>
                        </div>
                        <span className="text-white font-bold font-[family-name:var(--font-pixel)] tracking-wide">Clock</span>
                        <div className="flex gap-0.5">
                            <div className="w-5 h-5 bg-[#c0c0c0] shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_black] flex items-center justify-center text-[10px]">▼</div>
                            <div className="w-5 h-5 bg-[#c0c0c0] shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_black] flex items-center justify-center text-[10px]">▲</div>
                        </div>
                    </div>
                );
            case "RISC":
                return (
                    <div className="bg-[#ffefdb] border-b border-gray-400 px-2 py-1 flex items-center justify-between h-8">
                        <span className="text-black font-bold font-sans text-sm">Clock</span>
                        <div className="w-5 h-5 bg-[#aa0000] text-white flex items-center justify-center font-bold text-xs border border-gray-600 shadow-sm">×</div>
                    </div>
                );
        }
    };

    // 表盘刻度渲染
    const renderMarkers = () => {
        return [...Array(12)].map((_, i) => {
            const deg = i * 30;
            const isQuarter = i % 3 === 0;

            // 调整刻度距离中心的距离
            const distance = theme === 'GEM' ? 'inset-2' : 'inset-1';

            return (
                <div
                    key={i}
                    className={`absolute w-full h-full ${distance} flex justify-center`}
                    style={{ transform: `rotate(${deg}deg)` }}
                >
                    {/* GEM: 线条 */}
                    {theme === "GEM" && (
                        <div className="w-1 h-3 bg-black"></div>
                    )}

                    {/* WIN31: 青色/绿色方块 */}
                    {theme === "WIN31" && (
                        <div className={`w-2 h-2 ${isQuarter ? 'bg-[#008080]' : 'bg-[#008080]'} border border-white/20`}></div>
                    )}

                    {/* AMIGA: 菱形 (旋转的正方形) */}
                    {theme === "AMIGA" && (
                        <div className={`w-2 h-2 bg-black transform rotate-45 ${isQuarter ? 'scale-125' : ''}`}></div>
                    )}

                    {/* RISC: 蓝色方块 */}
                    {theme === "RISC" && (
                        <div className="w-2.5 h-2.5 bg-[#0000aa]"></div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className={`w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-300 relative ${bgStyles[theme]}`}>

            {/* --- 模拟桌面背景元素 --- */}
            <DesktopDecor theme={theme} />

            {/* --- 核心时钟窗口 --- */}
            <div className={`
          relative flex flex-col z-20
          ${theme === 'GEM' ? 'w-[300px] h-[340px]' : ''}
          ${theme === 'AMIGA' ? 'w-[280px] h-[360px]' : ''}
          ${theme === 'WIN31' ? 'w-[280px] h-[300px]' : ''}
          ${theme === 'RISC' ? 'w-[260px] h-[300px]' : ''}
          ${windowFrameStyles[theme]}
      `}>

                {/* 1. 标题栏 */}
                {renderTitleBar()}

                {/* 2. 菜单栏 (部分系统) */}
                {theme === "GEM" && (
                    <div className="flex text-xl font-[family-name:var(--font-pixel)] border-b-2 border-black px-2 gap-4 bg-white">
                        <span>File</span><span>View</span><span>Options</span>
                    </div>
                )}
                {theme === "WIN31" && (
                    <div className="flex text-sm font-sans px-2 gap-3 bg-white border-b border-[#c0c0c0] text-black mb-1">
                        <span className="underline">S</span>ettings
                    </div>
                )}

                {/* 3. 时钟主体内容区 */}
                <div className={`flex-1 relative flex items-center justify-center overflow-hidden ${theme === 'GEM' ? 'p-4' : ''}`}>

                    {/* GEM 独特的网格背景 */}
                    {theme === "GEM" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                                backgroundSize: '20px 20px',
                                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)'
                            }}></div>
                    )}

                    {/* AMIGA 右下角的 Resize Gadget */}
                    {theme === "AMIGA" && (
                        <div className="absolute bottom-1 right-1 w-5 h-5 border-t-2 border-l-2 border-[#0050a0] bg-[#0050a0]">
                            <div className="absolute inset-0 bg-white clip-triangle"></div>
                        </div>
                    )}

                    {/* 表盘圆盘 */}
                    <div className={`
            relative rounded-full flex items-center justify-center
            ${theme === 'GEM' ? 'w-56 h-56 bg-white border-2 border-black' : ''}
            ${theme === 'WIN31' ? 'w-48 h-48 bg-[#d4d0c8] border border-gray-500 shadow-inner' : ''} 
            ${theme === 'AMIGA' ? 'w-52 h-52 bg-white border-2 border-black' : ''}
            ${theme === 'RISC' ? 'w-52 h-52 bg-white border border-gray-400' : ''}
          `}>

                        {/* 刻度 */}
                        {renderMarkers()}

                        {/* 指针系统 */}

                        {/* 时针 */}
                        <div
                            className="absolute top-1/2 left-1/2 origin-bottom z-10"
                            style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
                        >
                            {/* 指针样式区分 */}
                            {theme === 'WIN31' && <div className="w-[3px] h-12 bg-black"></div>}
                            {theme === 'GEM' && <div className="w-1.5 h-14 bg-black"></div>}
                            {(theme === 'AMIGA' || theme === 'RISC') && (
                                <div className={`w-2 h-14 ${theme === 'RISC' ? 'bg-gray-600' : 'bg-black'}`} style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                            )}
                        </div>

                        {/* 分针 */}
                        <div
                            className="absolute top-1/2 left-1/2 origin-bottom z-20"
                            style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
                        >
                            {theme === 'WIN31' && <div className="w-[2px] h-20 bg-black"></div>}
                            {theme === 'GEM' && <div className="w-1 h-20 bg-black"></div>}
                            {(theme === 'AMIGA' || theme === 'RISC') && (
                                <div className={`w-1.5 h-22 ${theme === 'RISC' ? 'bg-gray-600' : 'bg-black'}`} style={{ clipPath: 'polygon(50% 0%, 10% 100%, 90% 100%)' }}></div>
                            )}
                        </div>

                        {/* 秒针 */}
                        <div
                            className="absolute top-1/2 left-1/2 origin-bottom z-30"
                            style={{ transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }}
                        >
                            {theme === 'WIN31' && <div className="w-[1px] h-20 bg-black"></div>}
                            {theme === 'GEM' && <div className="hidden"></div>} {/* GEM 通常没有秒针 */}
                            {theme === 'AMIGA' && <div className="w-[2px] h-24 bg-red-600"></div>}
                            {theme === 'RISC' && <div className="w-[2px] h-24 bg-red-600"></div>}
                        </div>

                        {/* 中心轴帽 */}
                        <div className={`absolute w-3 h-3 rounded-full z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              ${theme === 'GEM' ? 'bg-black' : ''}
              ${theme === 'WIN31' ? 'bg-black w-2 h-2' : ''}
              ${theme === 'AMIGA' ? 'bg-red-600 border border-black' : ''}
              ${theme === 'RISC' ? 'bg-red-600' : ''}
            `}></div>

                    </div>
                </div>

                {/* 状态栏 (Amiga/GEM) */}
                {theme === "AMIGA" && (
                    <div className="h-4 bg-white border-t-2 border-[#0050a0] w-full"></div>
                )}

            </div>

            {/* --- 底部切换器 --- */}
            <div className="fixed bottom-10 z-50 flex gap-4 bg-black/50 p-3 rounded-xl backdrop-blur-md border border-white/10">
                {(Object.keys(bgStyles) as ThemeKey[]).map((k) => (
                    <button
                        key={k}
                        onClick={() => setTheme(k)}
                        className={`px-4 py-2 font-[family-name:var(--font-header)] text-xs uppercase tracking-widest border-2 shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all
              ${theme === k ? 'bg-yellow-400 text-black border-white' : 'bg-gray-200 text-gray-600 border-gray-600 hover:bg-white'}
            `}
                    >
                        {k}
                    </button>
                ))}
            </div>

            {/* 版权文字 */}
            <div className="fixed bottom-2 text-white/50 text-xs font-[family-name:var(--font-pixel)]">
                RETRO OS CLOCK SIMULATOR
            </div>

        </div>
    );
}

// --- 装饰组件：图标与背景窗口 ---
function DesktopDecor({ theme }: { theme: ThemeKey }) {
    return (
        <>
            {/* 顶部菜单栏区域 */}
            <div className="absolute top-0 w-full h-8 bg-white border-b border-black z-10 flex items-center px-4 text-sm select-none">
                {theme === 'GEM' && (
                    <div className="w-full h-full bg-white text-black flex items-center border-b-2 border-black font-[family-name:var(--font-pixel)] text-xl gap-6">
                        <strong>Desk</strong> <span>File</span> <span>View</span> <span>Options</span>
                    </div>
                )}
                {theme === 'AMIGA' && (
                    <div className="w-full h-full bg-[#0050a0] text-white flex items-center px-2 border-b-2 border-black font-[family-name:var(--font-pixel)] tracking-wide text-lg">
                        Workbench Release 1.3 <span className="ml-auto">883,450 free memory</span>
                    </div>
                )}
                {theme === 'WIN31' && (
                    <div className="w-full h-full bg-white flex items-center border-b border-[#808080]">
                        <div className="w-4 h-1 bg-black mr-2"></div> <span className="text-[#404040]">Program Manager</span>
                    </div>
                )}
            </div>

            {/* 左侧图标模拟 */}
            <div className="absolute top-16 left-6 flex flex-col gap-8 pointer-events-none opacity-90">

                {/* TRASH ICON */}
                <div className="flex flex-col items-center w-16">
                    {theme === 'GEM' && (
                        <div className="w-10 h-10 border-2 border-black bg-white relative mb-1">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMXYxSDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')]"></div>
                        </div>
                    )}
                    {theme === 'WIN31' && (
                        <div className="w-8 h-10 border border-black bg-white mb-1 shadow-md relative overflow-hidden">
                            <div className="absolute bottom-0 w-full h-1 bg-black"></div>
                            <div className="absolute top-2 left-1 w-6 h-1 bg-black"></div>
                            <div className="absolute top-4 left-1 w-6 h-1 bg-black"></div>
                        </div>
                    )}
                    {theme === 'AMIGA' && (
                        <div className="w-12 h-10 bg-[#0050a0] border-2 border-white mb-1 skew-x-6 shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                            <div className="w-full h-2 bg-white mt-2"></div>
                        </div>
                    )}
                    <span className={`text-xs px-1 ${theme === 'AMIGA' ? 'text-white drop-shadow-md' : 'bg-white text-black'}`}>
                        {theme === 'GEM' ? 'TRASH' : theme === 'AMIGA' ? 'Ram Disk' : 'MS-DOS'}
                    </span>
                </div>

                {/* DISK ICON */}
                <div className="flex flex-col items-center w-16">
                    <div className={`w-12 h-10 border-2 ${theme === 'AMIGA' ? 'border-white bg-[#0050a0]' : 'border-black bg-white'} flex items-center justify-center mb-1`}>
                        <div className="w-8 h-6 border border-gray-500 bg-gray-200"></div>
                    </div>
                    <span className={`text-xs px-1 ${theme === 'AMIGA' ? 'text-white drop-shadow-md' : 'bg-white text-black'}`}>
                        Floppy
                    </span>
                </div>

            </div>
        </>
    );
}