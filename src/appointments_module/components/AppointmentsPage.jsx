import { useEffect, useState } from "react";
import AppointmentsList from "./AppointmentsList";
import AppointmentModel from "../models/AppointmentModel"; // Import the Appointment model
import styles from "../styles/AppointmentsPage.module.css"; // Import styles

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(() => {
    // Load appointments from localStorage on initial render
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments
      ? JSON.parse(savedAppointments).map(AppointmentModel.fromJSON) // Deserialize appointments
      : [];
  });

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      setAppointments(
        JSON.parse(savedAppointments).map(AppointmentModel.fromJSON)
      ); // Deserialize appointments
    }
  }, []);

  const deleteAppointment = (appointmentToDelete) => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = prevAppointments.filter(
        (appointment) =>
          appointment.time !== appointmentToDelete.time ||
          appointment.doctor.id !== appointmentToDelete.doctor.id
      );
      localStorage.setItem(
        "appointments",
        JSON.stringify(
          updatedAppointments.map((appointment) => appointment.toJSON())
        )
      );
      return updatedAppointments;
    });
  };

  return (
    <div>
      <h1 className={styles.title}>My Appointments ({appointments.length})</h1>
      <AppointmentsList
        appointments={appointments}
        onDelete={deleteAppointment}
      />
    </div>
  );
}
