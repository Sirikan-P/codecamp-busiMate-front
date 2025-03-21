import React, { useEffect, useState } from "react";
import Select from "react-select";
import { userAuthStore } from "../../store/userAuthStore";

export default function SelectPatient({handlePatientChange}) {
  const fetchGetPatients = userAuthStore((state) => state.fetchGetPatients);

  const patients = userAuthStore((state) => state.patients) || [];
  console.log("Patients", patients.patients);

  useEffect(() => {
    fetchGetPatients();
  }, []);

  const patientData = patients.patients || [];

  const patientOptions = patientData.map((patient) => ({
    value: patient.id,
    label: patient.firstName,
  }));

 const handleSelect = (e) => {
  handlePatientChange(e.value);
 }


  return (
    <div>
      <Select
        className="text-cyan-600"
        options={patientOptions}
        placeholder="Select Patient"
        onChange={handleSelect}
      />
    </div>
  );
}
