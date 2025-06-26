'use client'
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const menuItems = [
  { id: 1, name: 'Home', path: '/Home' },
  { id: 2, name: 'History', path: '/History' },
  { id: 3, name: 'Pricing', path: '/Pricing' },
  { id: 4, name: 'Profile', path: '/Profile' },
]

function AppHeader() {
  return (
    <header className="w-full bg-transparent py-2 px-4 md:py-4 md:px-8 flex items-center justify-between fixed top-0 left-0 z-50" style={{background: 'rgba(255,255,255,0.95)'}}>
      {/* Logo always visible */}
      <div className="flex items-center">
        <Link href={'/'}>
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-[36px] h-[36px] md:w-[70px] md:h-[70px]" />
        </Link>
      </div>

      {/* Nav links: hidden on mobile, shown on md+ */}
      <nav className="hidden md:flex space-x-8 lg:space-x-12">
        {menuItems.map(option => (
          <Link key={option.id} href={option.path} className="text-base md:text-xl font-semibold text-gray-800 hover:text-blue-600">
            {option.name}
          </Link>
        ))}
      </nav>

      {/* Hamburger menu: only on mobile */}
      <div className="flex items-center">
        <div className="md:hidden ml-2">
          <MobileMenu />
        </div>
        {/* UserButton: only on md+ */}
        <div className="hidden md:block ml-2">
          <UserButton/>
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 py-4 z-50">
          {menuItems.map(option => (
            <Link key={option.id} href={option.path} className="text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={() => setOpen(false)}>
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default AppHeader