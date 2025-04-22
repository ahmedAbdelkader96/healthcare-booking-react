import styles from "../styles/SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import specialties from "../../data/specialties";
import availabilities from "../../data/availabilities";

export default function SearchBar({ searchTerm, setSearchTerm, onFilter }) {
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");

  const handleFilter = (updatedSpecialty, updatedAvailability) => {
    onFilter({
      specialty: updatedSpecialty ?? specialty,
      availability: updatedAvailability ?? availability,
    });
  };

  return (
    <div className={styles.search_bar}>
      <div className={styles.input_wrapper}>
        <FaSearch className={styles.search_icon} />
        <input
          type="text"
          placeholder="Search for a doctor"
          className={styles.search_input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.filters_container}>
        <select
          className={styles.filter_dropdown}
          value={specialty}
          onChange={(e) => {
            const selectedSpecialty = e.target.value;
            setSpecialty(selectedSpecialty);
            handleFilter(selectedSpecialty, null); // Trigger filter with updated specialty
          }}
        >
          <option value="">All Specialties</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <select
          className={styles.filter_dropdown}
          value={availability}
          onChange={(e) => {
            const selectedAvailability = e.target.value;
            setAvailability(selectedAvailability);
            handleFilter(null, selectedAvailability); // Trigger filter with updated availability
          }}
        >
          <option value="">All Availability</option>
          {availabilities.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
