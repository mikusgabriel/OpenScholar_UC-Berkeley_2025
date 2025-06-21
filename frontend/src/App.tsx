import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
