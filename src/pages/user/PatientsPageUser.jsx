import React, { useEffect } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../lib/axios";

function PatientsPageUser() {
  const checkAuth = userAuthStore((state) => state.checkAuth);
  const fetchGetPatients = userAuthStore((state) => state.fetchGetPatients);
  const PatientsPageUser = userAuthStore((state) => state.patients);


  useEffect(() => {
    checkAuth();
    fetchGetPatients();
  }, []);

  const navigate = useNavigate();
  const hdlEdit = (patientId) => {
    // console.log("patientId", patientId);
    navigate(`/user/settingpatients/${patientId}`);
  };
 const hdlDelete = async (patientId) => {
    try {
      const res = await axiosInstance.delete(`/user/patient/delete/${patientId}`);
      fetchGetPatients();
    } catch (error) {
      console.log(error);
    }
  };

  const hdlClick = () => {
    // console.log("patientId", patientId);
    navigate(`/user/patients/add`);
  };

  

  console.log("PatientsPageUser", PatientsPageUser);
  return (
    <div>
      <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
        PatientsPageUser
      </div>

      {PatientsPageUser?.map((patient) => {
        return (
          <div
            style={{
              backgroundColor: "#f8f8f8",
              padding: "15px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#e0e0e0",
                  marginRight: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Placeholder for Patient Image */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg> */}
              </div>
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {patient.firstName + " " + patient.lastName}
                </div>
                <div>{patient.age}</div>
                <div>{patient.gender}</div>
                <div>{patient.healthCondition}</div>
                <div>{patient.address}</div>
              </div>
              <button onClick={()=>hdlDelete(patient.id)}>Delete</button>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#e0e0e0",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                }}
                onClick={() => hdlEdit(patient.id)}
              >
                Edit
              </button>
         
            </div>
          </div>
          
        );
      })}
       <button className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300"
       onClick={hdlClick}
       >
            + Add Patients
          </button>
    </div>
  );
}

export default PatientsPageUser;
