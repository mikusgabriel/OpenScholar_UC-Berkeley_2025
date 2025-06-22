import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import MarketPlacePage from "./pages/MarketplacePage";
import AccountPage from "./pages/AccountPage";
import PullRequestsPage from "./pages/PullRequestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/marketplace" element={<MarketPlacePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path='/pull-request' element={<PullRequestsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
