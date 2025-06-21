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
                <Card className="bg-white border-orange-200">
                    <CardContent className="p-6">{children}</CardContent>
                </Card>
            </div>
        </div>
    )
}
