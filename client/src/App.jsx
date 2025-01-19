import { EthProvider } from "./contexts/EthContext";
import SignIn from "./components/signin";
import UniversityManagement from "./components/UniversityManagement";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <EthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/University" element={<UniversityManagement />} />
        </Routes>
      </BrowserRouter>
    </EthProvider>
  );
}

export default App;
