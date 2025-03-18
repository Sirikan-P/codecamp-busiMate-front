import React from "react";
import { actionUpdateDriverData } from "../../api/adminManageDriver";
import { createAlert } from "../../utils/createAlert";
import { Phone } from "lucide-react";

const ListAllDriver = (props) => {
  const { driverData, token, hdlGetDriverDataAll } = props;
  // console.log("driverData ==== ", driverData);
  // console.log("token ==== ", token)

  const hdlUpdateDriverStatus = async (e, id) => {
    const status = e.target.value;
    if (!token) {
      createAlert("error", "Token is undefined!");
      return;
    }
    try {
      console.log("e.target.value ==== ", e.target.value);
      console.log("driver.id ==== ", id);
      const result = await actionUpdateDriverData(token, id, { status });
      console.log("result ==== ", result);
      hdlGetDriverDataAll();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={driverData.id}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={driverData.profileImageUrl}
                alt={`Profile picture of ${driverData.firstName} ${driverData.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              {/* <span
                          className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                            driver.available ? "bg-green-400" : "bg-gray-400"
                          }`}
                        /> */}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {driverData.firstName}
                {driverData.lastName}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                <span>{driverData.phoneNumber}</span>
              </div>
              {/* <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{driver.currentLocation}</span>
                        </div> */}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">Rating:</span>
              {/* <span className="text-sm font-semibold text-blue-600">
                          {driver.rating}
                        </span> */}
            </div>
            <select
              onChange={(e) => hdlUpdateDriverStatus(e, driverData.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                driverData.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : driverData.status === "INACTIVE"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700" // เพิ่มเงื่อนไข default
              }`}
              defaultValue={driverData.status}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAllDriver;
