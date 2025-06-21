import LayoutWrapper from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

export default function EditorPage() {
    return (
        <LayoutWrapper>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
                    {/* Main Content Section */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <Card className="flex-1 bg-white border-orange-200">
                            <CardContent className="h-full p-6">
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    <p>Main content area</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Side Panel */}
                    <div className="space-y-6">
                        <Card className="bg-orange-100 border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-gray-800 flex items-center gap-2">Repository Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="h-32 flex items-center justify-center text-gray-500">
                                    <p>Repository actions panel</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Export Section */}
                        <Card className="bg-orange-100 border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-gray-800 flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Export Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-16 flex items-center justify-center text-gray-500">
                                    <p>Export options panel</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LayoutWrapper >
    )
}
