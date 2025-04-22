export default class DoctorModel {
  constructor({ id, name, image, specialty, availability, location }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.specialty = specialty;
    this.availability = availability;
    this.location = location;
  }

  // Method to serialize the doctor for saving or transferring data
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      specialty: this.specialty,
      availability: this.availability,
      location: this.location,
    };
  }

  // Static method to deserialize a doctor from JSON
  static fromJSON(json) {
    if (!json) {
      throw new Error("Invalid JSON data for DoctorModel");
    }
    return new DoctorModel({
      id: json.id,
      name: json.name,
      image: json.image,
      specialty: json.specialty,
      availability: json.availability,
      location: json.location,
    });
  }
}