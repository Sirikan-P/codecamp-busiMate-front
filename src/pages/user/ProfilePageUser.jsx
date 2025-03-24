import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";
import useHospitalStore from "../../store/hospital-store";

const ProfilePageUser = () => {
  const checkAuth = userAuthStore((state) => state.checkAuth);
  const authUser = userAuthStore((state) => state.authUser);
  const fetchGetPatients = userAuthStore((state) => state.fetchGetPatients);
  const patients = userAuthStore((state) => state.patients);

  const fetchHospitalData = useHospitalStore(
    (state) => state.fetchHospitalData
  );
  const fetchGetUserAddress = userAuthStore(
    (state) => state.fetchGetUserAddress
  );

 console.log("patients", patients);
  useEffect(() => {
    checkAuth();
    fetchGetPatients();
    fetchHospitalData();
  }, []);

  const navigate = useNavigate();
  const hdlEdit = () => {
    navigate("/user/setting");
  };
  const hdlSelect =() =>{
    navigate("/user/patients");
  }
  console.log("authUser", authUser);  
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "#f0f0f0",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>Myprofile</div>
          <button
            style={{
              backgroundColor: "#e0e0e0",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
            }}
          >
            MAKE APPOINTMENT
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#e0e0e0",
              marginRight: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Placeholder for Profile Image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>{authUser?.result?.firstName+"  " +authUser?.result?.lastName }</div>
            <div>{authUser?.result?.phoneNumber}</div>
            <div>Bkk, Thailand</div>
          </div>
        </div>

        <button
          style={{
            backgroundColor: "#e0e0e0",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            alignSelf: "flex-start",
            marginBottom: "20px",
          }}
          onClick={hdlEdit}
        >
          PROFILE
        </button>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              backgroundColor: "#e0e0e0",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            {/* Placeholder for VISA Card */}
            <div style={{ fontSize: "2em", textAlign: "center" }}>VISA</div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Patients
          </div>

          {patients?.map((patient) => {
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
                    <svg
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
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{patient.firstName + " " +patient.lastName }</div>
                    <div>{patient.address}</div>
                  </div>
                </div>
                <div>
                  <button
                    style={{
                      backgroundColor: "#e0e0e0",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      marginRight: "5px",
                    }}
                    onClick={hdlSelect}
                  >
                    Select
                  </button>
                 
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ProfilePageUser;



