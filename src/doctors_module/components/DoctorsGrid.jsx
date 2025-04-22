import DoctorGridItem from "./DoctorGridItem";
import styles from "../styles/DoctorsGrid.module.css";

export default function DoctorsGrid({ filteredDoctors, onConfirmAppointment }) {
  return (
    <div className={styles.grid_container}>
      {filteredDoctors.map((doctor) => (
        <DoctorGridItem
          key={doctor.id}
          doctor={doctor}
          onConfirmAppointment={onConfirmAppointment} // Pass the handler
        />
      ))}
    </div>
  );
}
