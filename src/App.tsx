import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Navbar } from "@/components/Navbar"
import { ProgramPage } from "@/pages/ProgramPage"
import { ModulesPage } from "@/pages/ModulesPage"
import { ModuleDetailPage } from "@/pages/ModuleDetailPage"
import { OutputPage } from "@/pages/OutputPage"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="arv-workshop-theme">
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ProgramPage />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:slug" element={<ModuleDetailPage />} />
              <Route path="/output" element={<OutputPage />} />
            </Routes>
          </main>
          <footer className="border-t py-6 mt-8">
            <div className="container text-center text-xs text-muted-foreground">
              <p>Gamified Learning Workshop · July 30, 2026 · WVSU Calinog Campus</p>
              <p className="mt-1">Resource Person: Mr. Mark Joseph J. Solidarios</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
