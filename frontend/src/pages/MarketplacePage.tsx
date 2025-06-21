import LayoutWrapper from "@/components/layout-wrapper"

export default function MarketplacePage() {
  return (
    <LayoutWrapper>
      <div className="h-full flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Marketplace</h2>
        <p className="text-center mb-6">
          Discover and purchase research templates, tools, and resources from the community.
        </p>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-orange-200 rounded-lg">
            <h3 className="font-medium mb-2">Templates</h3>
            <p className="text-sm text-gray-500">Research paper templates and formats</p>
          </div>
          <div className="p-4 border border-orange-200 rounded-lg">
            <h3 className="font-medium mb-2">Tools</h3>
            <p className="text-sm text-gray-500">Research and writing tools</p>
          </div>
          <div className="p-4 border border-orange-200 rounded-lg">
            <h3 className="font-medium mb-2">Resources</h3>
            <p className="text-sm text-gray-500">Guides, tutorials, and references</p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
