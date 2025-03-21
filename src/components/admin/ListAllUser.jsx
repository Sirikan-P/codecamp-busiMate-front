// rfce
import React from "react";
import { actionUpdateUserData } from "../../api/adminManageUser";
import { createAlert } from "../../utils/createAlert";

const ListAllUser = (props) => {
  const { userData, token, hdlGetUserDataAll } = props;
  // console.log("userData ==== ", userData);
  // console.log("token ==== ", token)

  const hdlUpdateUserStatus = async (e, id) => {
    const status = e.target.value
    if (!token) {
      createAlert("error", "Token is undefined!")
      return
    }
    try {
      console.log("e.target.value ==== ", e.target.value)
      console.log("user.id ==== ", id)
      const result = await actionUpdateUserData(token, id, {status})
      console.log("result ==== ", result)
      hdlGetUserDataAll()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4 border-2">
        <div className="flex items-center space-x-2 ">
          <img
            src={userData.profileImage}
            alt={`Profile picture of ${userData.firstName} ${userData.lastName}`}
            className="rounded-full"
            width="50"
            height="50"
          />
          <div className="border-2">
            <p className="font-semibold">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-gray-500">{userData.phoneNumber}</p>
          </div>
        </div>
        <div className="flex flex-col border-2">
          <label htmlFor="#">Status</label>
          <select
            onChange={(e) => hdlUpdateUserStatus(e, userData.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              userData.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : userData.status === "INACTIVE"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700" // เพิ่มเงื่อนไข default
            }`}
            defaultValue={userData.status}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ListAllUser;
