import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="/placeholder.svg"
                alt=""
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="/properties" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Properties
            </Link>
            <Link href="/#about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="/#contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Button asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

