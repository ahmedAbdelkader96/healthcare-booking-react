import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css"; // Import CSS module

export default function Header() {
  const navigate = useNavigate();


  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, [appointments]);

  return (
    <header className={styles.header}>
      <h1>Doctor Appointment System</h1>

      <button
        className={styles.appointments_button}
        onClick={() => navigate("/appointments")} // Navigate to appointments page
      >
        View Appointments
        {appointments.length > 0 && (
          <span className={styles.badge}>{appointments.length}</span>
        )}
      </button>
    </header>
  );
}