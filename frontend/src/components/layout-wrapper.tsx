import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "./header"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Card className="flex-1 bg-white border-orange-200">
              <CardContent className="h-full p-6">{children}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
