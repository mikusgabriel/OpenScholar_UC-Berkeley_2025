import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import MarketPlacePage from "./pages/MarketplacePage";
import AccountPage from "./pages/AccountPage";
import PullRequestsPage from "./pages/PullRequestPage";
import PapersPage from "./pages/PapersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/papers" replace />} />
        <Route path="/marketplace" element={<MarketPlacePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path='/pull-request' element={<PullRequestsPage />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/papers/:id" element={<PapersPage />} />
        <Route path="/papers/:id/editor" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
