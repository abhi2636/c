import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientType: "New Patient",
    appointmentType: "",
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    date: "",
    timeSlot: "",
    department: "",
    doctor: "",
    uhid: "",
  });

  const [uhid, setUHID] = useState("");
  const [isRevisit, setIsRevisit] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentRes = await axios.get("http://localhost:3000/v1/appointments/departments");
        const doctorRes = await axios.get("http://localhost:3000/v1/appointments/doctors");
        const timeSlotRes = await axios.get("http://localhost:3000/v1/appointments/timeslots");

        setDepartments(departmentRes.data || []);
        setDoctors(doctorRes.data || {});
        setTimeSlots(timeSlotRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePatientTypeChange = (e) => {
    setFormData({ ...formData, patientType: e.target.value });
    setIsRevisit(e.target.value === "Revisit Patient");
  };

  const handleSearchUHID = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/appointments/patients/${formData.uhid}`);
      if (response.data) {
        setFormData({ ...formData, ...response.data });
      } else {
        alert("No records found for the provided UHID.");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Error occurred while searching for UHID.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.patientType === "New Patient") {
        const response = await axios.post("http://localhost:3000/v1/appointments/patients", formData);
        setUHID(response.data.uhid);
        alert("Appointment booked successfully!");
      } else {
        await axios.put(`http://localhost:3000/v1/appointments/patients/${formData.uhid}`, formData);
        alert("Revisit appointment updated successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleFormSubmit}>
        <h1 className="text-2xl font-bold mb-4 text-green-900">Book an Appointment</h1>

        <div className="mb-4">
          <label className="font-semibold">Patient Type</label>
          <select
            className="block w-full p-2 border rounded"
            value={formData.patientType}
            onChange={handlePatientTypeChange}
          >
            <option>New Patient</option>
            <option>Revisit Patient</option>
          </select>
        </div>

        {isRevisit && (
          <div className="mb-4">
            <label className="font-semibold">Search by UHID</label>
            <input
              type="text"
              className="block w-full p-2 border rounded"
              value={formData.uhid}
              onChange={(e) => setFormData({ ...formData, uhid: e.target.value })}
            />
            <button
              type="button"
              className="mt-2 px-4 py-2 text-white bg-green-500 rounded"
              onClick={handleSearchUHID}
            >
              Search
            </button>
          </div>
        )}

        <div className="mb-4">
          <label className="font-semibold">First Name</label>
          <input
            type="text"
            className="block w-full p-2 border rounded"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Last Name</label>
          <input
            type="text"
            className="block w-full p-2 border rounded"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Department</label>
          <select
            className="block w-full p-2 border rounded"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Doctor</label>
          <select
            className="block w-full p-2 border rounded"
            value={formData.doctor}
            onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
          >
            <option value="">Select Doctor</option>
            {doctors[formData.department]?.map((doc, index) => (
              <option key={index}>{doc}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Time Slot</label>
          <select
            className="block w-full p-2 border rounded"
            value={formData.timeSlot}
            onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="block w-full py-2 text-white bg-green-500 rounded"
        >
          Submit
        </button>
      </form>

      {uhid && (
        <div className="mt-4 p-4 bg-green-100 border border-green-500 rounded">
          <strong>UHID Assigned:</strong> {uhid}
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
