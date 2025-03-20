import { Bike, ChartNoAxesCombined, House, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { actionGetUserDataAll } from "../../api/adminManageUser";
import ListAllUser from "../../components/admin/ListAllUser";

function AdminGetUser() {
  // JavaScript
  const [userDataAll, setUserDataAll] = useState([]);

  // tokenนี้ใช้ชั่วคราว รอทำzustand ตอนmerge code กับ admin login
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MTg1NDQwNCwiZXhwIjoxNzQzMTUwNDA0fQ.ZFoevBdOJnZPEKmQFFuu6j-nwqUN0-U6EF_E30y5vc0";

  const hdlGetUserDataAll = async () => {
    try {
      const result = await actionGetUserDataAll(token);
      console.log("result.data.data ==== ", result.data.data);
      setUserDataAll(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hdlGetUserDataAll();
  }, []);

  console.log("userDataAll ==== ", userDataAll);

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg ">
        {/* navigator */}
        <nav className="w-full border-2  h-12 bg-gray-200 flex justify-around items-center">
          <a href="#"><span><House /></span></a>
          <a href="#"><span><User /></span></a>
          <a href="#"><span><Bike /></span></a>
          <a href="#"><span><ChartNoAxesCombined /></span>
          </a>
        </nav>
        {/* ---- */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 border-2 ">
          <p className="font-semibold mb-4 text-center">User Account</p>
          <p className=" mb-4 text-center">Added style later</p>
          {/* call componet userDataAll to render all user data */}
          {userDataAll.map((userData) => (
            <ListAllUser
              key={userData.id}
              userData={userData}
              token={token}
              hdlGetUserDataAll={hdlGetUserDataAll}
            />
          ))}
        </div>

        {/* MORE to add */}
      </div>
    </div>
  );
}

export default AdminGetUser;
