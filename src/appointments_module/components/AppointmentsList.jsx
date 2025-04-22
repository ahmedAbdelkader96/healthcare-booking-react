import styles from "../styles/AppointmentsPage.module.css";

export default function AppointmentsList({ appointments, onDelete }) {
  return (
    <div>
      {appointments.length === 0 ? (
        <p>No appointments reserved yet.</p>
      ) : (
        <div className={styles.appointments_list}>
          {appointments.map((appointment) => (
            <div
              className={styles.appointment_item}
              key={`${appointment.doctor.id}-${appointment.time}`}
            >
              <img
                src={appointment.doctor.image}
                alt={appointment.doctor.name}
              />
              <div className={styles.appointment_details}>
                <h1>{appointment.doctor.name}</h1>
                <h2>{new Date(appointment.time).toLocaleString()}</h2>
              </div>

              <>
                {window.innerWidth <= 700 ? (
                  <button onClick={() => onDelete(appointment)}>X</button>
                ) : (
                  <button onClick={() => onDelete(appointment)}>Delete</button>
                )}
              </>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
