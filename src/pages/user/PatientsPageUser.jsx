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
      const res = await axiosInstance.delete(
        `/user/patient/delete/${patientId}`
      );
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
    <div className="flex flex-col justify-center w-full h-screen place-items-center pb-15 bg-cyan-600 ">
      <div className="bg-white h-screen m-5 rounded-lg shadow-lg p-8">
        {/* title */}
        <div className="text-2xl font-bold  text-cyan-800 mb-20">
          PatientsPageUser
        </div>

        {PatientsPageUser?.map((patient) => {
          return (
            <div className="flex flex-col w-80 gap-5 p-5 mb-5 mt-5 rounded-lg border-1 border-cyan-200">
              <div className="flex gap-10">
                {/* Patient Details */}
                <div className="flex flex-col">
                  <div className="flex gap-2 font-semibold">
                    <div className="text-cyan-600 text-2xl">
                      {patient.firstName}
                    </div>
                    <div className="text-cyan-600 text-2xl">
                      {patient.lastName}
                    </div>
                  </div>
                  <div className="text-cyan-600 text-xl">Age : {patient.age}</div>
                  <div  className="text-cyan-600 text-xl">Gender : {patient.gender}</div>
                  <div  className="text-cyan-600 text-xl">Health : {patient.healthCondition}</div>
                  <div  className="text-cyan-600 text-md">{patient.address}</div>
                </div>
              </div>
              {/* edit btn */}
              <div className="gap-5 flex">
              <button
                  className="bg-cyan-700 w-40  text-lg pr-5 pl-5 text-slate-300 p-2 rounded-md mt-5 "
                  onClick={() => hdlEdit(patient.id)}
                >
                  Edit
                </button>
              <button 
               className="bg-slate-200 w-40  text-lg pr-5 pl-5 text-cyan-600 p-2 rounded-md mt-5 "
              onClick={() => hdlDelete(patient.id)}>Delete</button>

              </div>
            </div>
            
          );
        })}
        <div className="flex justify-center">
          <button
            className="bg-cyan-700 w-60 text-xl text-slate-300 p-2 rounded-md mt-5 h-[64px] shadow-2xl"
            onClick={hdlClick}
          >
            + Add Patients
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientsPageUser;
