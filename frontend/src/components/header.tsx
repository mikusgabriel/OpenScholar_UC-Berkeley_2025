import { Link, useLocation } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

export default function Header() {
  const location = useLocation()
  const pathname = location.pathname

  const navLinks = [
    { href: "/", label: "Papers" },
    { href: "/account", label: "My Account" },
    { href: "/marketplace", label: "Marketplace" },
  ]

  return (
    <header className="border-b border-gray-800 bg-orange-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-black text-xl font-semibold">Research Paper Editor</h1>
              <Badge variant="secondary" className="bg-green-900 text-green-100">
                Active
              </Badge>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                    pathname === link.href ? "text-orange-600 border-b-2 border-orange-600 pb-1" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />0 characters
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-3 flex gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                pathname === link.href ? "text-orange-600" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
