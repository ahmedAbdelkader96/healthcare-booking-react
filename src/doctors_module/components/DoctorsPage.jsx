import { useState, useEffect } from "react";
import doctors from "../../data/doctors.jsx";
import SearchBar from "./SearchBar";
import DoctorsGrid from "./DoctorsGrid";
import AppointmentModel from "../../appointments_module/models/AppointmentModel.jsx"; // Import the Appointment model
import Header from "./Header.jsx";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [appointments, setAppointments] = useState(() => {
    // Load appointments from localStorage on initial render
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments
      ? JSON.parse(savedAppointments).map(AppointmentModel.fromJSON) // Deserialize appointments
      : [];
  });

  const handleFilter = () => {
    const filtered = doctors.filter((doctor) => {
      const matchesName = doctor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSpecialty = specialty
        ? doctor.specialty === specialty
        : true;
      const matchesAvailability = availability
        ? doctor.availability.some((time) => {
            const hour = new Date(time).getHours();
            if (availability === "Morning") return hour >= 6 && hour < 12;
            if (availability === "Afternoon") return hour >= 12 && hour < 18;
            if (availability === "Evening") return hour >= 18 && hour < 24;
            return true;
          })
        : true;

      return matchesName && matchesSpecialty && matchesAvailability;
    });

    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleFilter();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm, specialty, availability]);

  const handleConfirmAppointment = (doctor, timeSlot) => {
    const newAppointment = new AppointmentModel(doctor, timeSlot); // Use the Appointment model

    // Update state and save to localStorage
    setAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments, newAppointment];
      localStorage.setItem(
        "appointments",
        JSON.stringify(
          updatedAppointments.map((appointment) => appointment.toJSON())
        ) // Serialize appointments
      );
      return updatedAppointments;
    });
  };

  return (
    <>
      <Header />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFilter={({ specialty, availability }) => {
          setSpecialty(specialty);
          setAvailability(availability);
        }}
      />

      <DoctorsGrid
        filteredDoctors={filteredDoctors}
        onConfirmAppointment={handleConfirmAppointment}
      />
    </>
  );
}
