import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import HomePublic from "./pages/HomePublic";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import SupportResources from "./pages/SupportResources";
import SelfEvaluation from "./pages/SelfEvaluation";
import Metas from "./pages/Metas";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePublic />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/support" element={<SupportResources />} />
          <Route path="/self-evaluation" element={<SelfEvaluation />} />"
          <Route path="/meta" element={<Metas />} />"
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
