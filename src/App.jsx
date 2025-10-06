import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <Login onNavigate={setCurrentPage} />;
      case "register":
        return <Register onNavigate={setCurrentPage} />;
      default:
        return <Login onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;
