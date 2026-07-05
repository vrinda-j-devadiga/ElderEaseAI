import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import AIAssistant from "./pages/AIAssistant";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

<Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/medicines" element={<Medicines />} />

        <Route path="/appointments" element={<Appointments />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/statistics" element={<Statistics />} />

        <Route path="/ai" element={<AIAssistant />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;