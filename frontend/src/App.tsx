function App() {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-orange-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-black text-xl font-semibold">Research Paper Editor</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">

        </div>
      </div>
    </div>
  );
}

export default App;
