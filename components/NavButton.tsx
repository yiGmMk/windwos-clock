import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function NavButton() {
  return (
    <div className="fixed top-4 left-4 z-10 flex flex-col gap-2">
      <Link
        href="https://nav.programnotes.cn"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-black/10 dark:bg-white/10 
          backdrop-blur-sm rounded-lg hover:bg-black/20 dark:hover:bg-white/20 
          transition-all duration-200 flex items-center gap-2 text-sm"
      >
        <Image
          src="/red.svg"
          alt="AI导航"
          width={16}
          height={16}
          className="w-4 h-4"
        />
        AI导航
      </Link>
      <Link
        href="/"
        className="px-4 py-2 bg-black/10 dark:bg-white/10 
          backdrop-blur-sm rounded-lg hover:bg-black/20 dark:hover:bg-white/20 
          transition-all duration-200 flex items-center gap-2 text-sm"
      >
        <Image
          src="/window.svg"
          alt="home"
          width={16}
          height={16}
          className="w-4 h-4"
        />
        Home
      </Link>
      <Link
        href="/v2"
        className="px-4 py-2 bg-black/10 dark:bg-white/10 
          backdrop-blur-sm rounded-lg hover:bg-black/20 dark:hover:bg-white/20 
          transition-all duration-200 flex items-center gap-2 text-sm"
      >
        <Image
          src="/window.svg"
          alt="V2"
          width={16}
          height={16}
          className="w-4 h-4"
        />
        V2
      </Link>
      <Link
        href="/v3"
        className="px-4 py-2 bg-black/10 dark:bg-white/10 
          backdrop-blur-sm rounded-lg hover:bg-black/20 dark:hover:bg-white/20 
          transition-all duration-200 flex items-center gap-2 text-sm"
      >
        <Image
          src="/window.svg"
          alt="V3"
          width={16}
          height={16}
          className="w-4 h-4"
        />
        V3.1
      </Link>
      <Link
        href="/v3.2"
        className="px-4 py-2 bg-black/10 dark:bg-white/10 
          backdrop-blur-sm rounded-lg hover:bg-black/20 dark:hover:bg-white/20 
          transition-all duration-200 flex items-center gap-2 text-sm"
      >
        <Image
          src="/window.svg"
          alt="V3"
          width={16}
          height={16}
          className="w-4 h-4"
        />
        V3.2
      </Link>
    </div>
  )
}