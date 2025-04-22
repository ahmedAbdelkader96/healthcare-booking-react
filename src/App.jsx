import DoctorsPage from "./doctors_module/components/DoctorsPage.jsx";
import AppointmentsPage from "./appointments_module/components/AppointmentsPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DoctorsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
