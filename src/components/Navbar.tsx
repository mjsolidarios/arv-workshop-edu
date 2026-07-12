import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark")
    else setTheme("light")
  }

  const navLinks = [
    { href: "/", label: "Program" },
    { href: "/modules", label: "Modules" },
    { href: "/examples", label: "Examples" },
    { href: "/output", label: "Output" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/"
    return location.pathname === href || location.pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-2">
        <div className="mr-1 sm:mr-2 flex min-w-0 shrink">
          <Link to="/" className="flex items-center space-x-2 min-w-0">
            <span className="font-bold text-sm sm:text-base leading-tight truncate">
              ARV Workshop 2026
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80 px-2.5 py-1.5 rounded-md",
                isActive(link.href)
                  ? "text-foreground bg-accent"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 md:flex-none items-center justify-end gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="order-2 md:order-none md:hidden h-10 w-10"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="order-1 md:order-none h-10 w-10"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t bg-background px-4 py-3 space-y-1 max-h-[calc(100dvh-3.5rem)] overflow-y-auto"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block text-base font-medium px-3 py-3 rounded-md transition-colors min-h-[44px]",
                isActive(link.href)
                  ? "bg-accent text-foreground"
                  : "text-foreground/70 hover:bg-muted active:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
