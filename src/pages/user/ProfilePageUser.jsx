import { useEffect } from "react";
import useHospitalStore from "../../store/hospital-store";
import { userAuthStore } from "../../store/userAuthStore";

const ProfilePageUser = () => {
  const fetchHospitalData = useHospitalStore(
    (state) => state.fetchHospitalData
  );
  const fetchGetUserAddress = userAuthStore(
    (state) => state.fetchGetUserAddress
  );

  useEffect(() => {
    
    fetchHospitalData();
  }, []);


  return <div>

  </div>;
};
export default ProfilePageUser;
