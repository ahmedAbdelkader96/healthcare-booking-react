import { useState } from "react";
import styles from "../styles/DoctorsGrid.module.css";

export default function DoctorGridItem({ doctor, onConfirmAppointment }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleBookAppointment = () => {
    setIsModalOpen(true);
  };

  const handleConfirmAppointment = () => {
    if (selectedTimeSlot) {
      onConfirmAppointment(doctor, selectedTimeSlot); // Save the appointment
      setConfirmationMessage(
        `Appointment confirmed with ${doctor.name} at ${selectedTimeSlot}`
      );
      setIsModalOpen(false);
      setSelectedTimeSlot(""); // Reset the selected time slot
    } else {
      setConfirmationMessage("Please select a time slot before confirming.");
    }
  };

  const closeConfirmationMessage = () => {
    setConfirmationMessage("");
  };

  return (
    <>
      <div className={styles.grid_item}>
        <div className={styles.grid_item_image_container}>
          {isLoading && <div className={styles.shimmer}></div>}
          <img
            src={doctor.image}
            alt={doctor.name}
            onLoad={() => setIsLoading(false)}
            className={isLoading ? styles.hidden : ""}
          />
        </div>

        <div className={styles.grid_item_content}>
          <h2>{doctor.name}</h2>
          <h3>{doctor.specialty}</h3>
          <h4>{doctor.location}</h4>
          {/* <p>Availability:</p>
      <ul>
        {doctor.availability.map((time, index) => (
          <li key={index}>{new Date(time).toLocaleString()}</li>
        ))}
      </ul> */}

          <button
            className={styles.book_button}
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h5>Book Appointment with {doctor.name}</h5>
            <h6>Select a time slot:</h6>
            {doctor.availability.map((time, index) => (
              <div key={index}>
                <label>
                  <input
                    className={styles.time_slot_input}
                    type="radio"
                    name="timeSlot"
                    value={time}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  />
                  {new Date(time).toLocaleString()}
                </label>
              </div>
            ))}

            <div className={styles.modal_buttons}>
              <button
                className={styles.book_button}
                onClick={handleConfirmAppointment}
              >
                Confirm
              </button>
              <button
                className={styles.book_button}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationMessage && (
        <div className={styles.alert_overlay}>
          <div className={styles.alert_box}>
            <p>{confirmationMessage}</p>
            <button onClick={closeConfirmationMessage}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
