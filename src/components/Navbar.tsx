import { Moon, Sun } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else setTheme("light")
  }

  const navLinks = [
    { href: "/", label: "Program" },
    { href: "/modules", label: "Modules" },
    { href: "/output", label: "Workshop Output" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-sm sm:text-base leading-tight">
              ARV Workshop 2026
            </span>
          </Link>
        </div>

        <nav className="flex flex-1 items-center space-x-1 sm:space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors hover:text-foreground/80 px-2 py-1 rounded-md",
                location.pathname === link.href
                  ? "text-foreground bg-accent"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  )
}
