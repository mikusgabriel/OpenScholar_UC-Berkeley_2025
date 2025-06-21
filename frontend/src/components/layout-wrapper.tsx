import type React from "react"
import Header from "./header"

interface LayoutWrapperProps {
    children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    return (
        <>
            <Header />
            <main className="flex-1 overflow-hidden">
                <div className="h-full p-4">{children}</div>
            </main>
        </>
    )
}
