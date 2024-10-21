"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { setTheme } = useTheme()

  return (
    <header className="bg-background/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/10 border-b border-primary/20">
      <div className="container flex items-center justify-between p-4">
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-primary hover:text-primary/80">Home</Link></li>
            <li><Link href="#" className="text-primary hover:text-primary/80">Discord</Link></li>
            <li><Link href="#" className="text-primary hover:text-primary/80">Pricing</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-background/50 border-primary/50 hover:bg-primary/20">
            Sign Up
          </Button>
          <Button variant="outline" className="bg-background/50 border-primary/50 hover:bg-primary/20">
            Sign In
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-background/50 border-primary/50 hover:bg-primary/20">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-md">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}