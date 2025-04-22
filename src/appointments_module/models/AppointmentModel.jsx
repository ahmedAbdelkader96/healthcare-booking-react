import DoctorModel from "../../doctors_module/models/DoctorModel.jsx";

export default class AppointmentModel {
  constructor(doctor, timeSlot) {
    if (!(doctor instanceof DoctorModel)) {
      throw new Error("doctor must be an instance of DoctorModel");
    }
    this.doctor = doctor;
    this.time = timeSlot;
  }

  toJSON() {
    return {
      doctor: this.doctor.toJSON(), // Serialize the doctor
      time: this.time,
    };
  }

  static fromJSON(json) {
    return new AppointmentModel(
      DoctorModel.fromJSON(json.doctor), // Deserialize the doctor
      json.time
    );
  }
}