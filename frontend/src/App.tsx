import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import MarketPlacePage from "./pages/MarketplacePage";
import AccountPage from "./pages/AccountPage";
import PullRequestsPage from "./pages/PullRequestPage";
import PapersPage from "./pages/PapersPage";
import PaperDetailPage from "./pages/PaperDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/papers" replace />} />
        <Route path="/marketplace" element={<MarketPlacePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path='/papers/:title/pull-request' element={<PullRequestsPage />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/papers/:title" element={<PaperDetailPage />} />
        <Route path="/papers/:title/edit" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
