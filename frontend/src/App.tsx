import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import MarketPlacePage from "./pages/MarketplacePage";
import AccountPage from "./pages/AccountPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EditorPage />} />
                <Route path="/marketplace" element={<MarketPlacePage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </Router>
    );
}

export default App;
