import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import { createAlert } from "../../utils/createAlert";
import "leaflet/dist/leaflet.css";
import { useForm } from "react-hook-form";
import DriverFormInput from "../../components/driver/driverForm/DriverFormInput";
import DriverButtons from "../../components/driver/driverForm/DriverButtons";
import { useNavigate } from "react-router";
import useUserStored from "../../store/user-store";
import UserHeader from "../../components/user/UserHeader";
import { actionCreateUserAddress } from "../../api/user";
import UserLocationMarker from "../../components/user/UserLocationMarker";

function UserAddAddress() {
  const token = localStorage.getItem("token");
  const user = useUserStored((state) => state.user);
  const userSelectLatLng = useUserStored((state) => state.userSelectLatLng);

  //react hook form
  const { register, handleSubmit, formState, reset, setValue } = useForm({});
  const { isSubmitting, errors } = formState;

  const navigate = useNavigate();

  //----------------------------------------
  const hdlSubmit = async (value) => {
    try {
      const { ...newData } = value;

      console.log(userSelectLatLng);
      newData.lat = userSelectLatLng.lat;
      newData.long = userSelectLatLng.lng;
      console.log("aa", newData);

      const res = await actionCreateUserAddress(token, newData);
      const { result } = res.data;
      createAlert("info", "add complete");
      navigate("/user/address");
      return { success: true, result }; //object
    } catch (error) {
      return { success: false, error: error.response?.data?.message }; //object
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-600 p-5">
      <div className="bg-white w-full max-w-md p-6 m-5 pt-20 rounded-lg shadow-lg h-screen">
        <div className="font-semibold  text-cyan-700  text-4xl flex gap-5">
          Add New Address
          <UserHeader user={user} />
        </div>

        <div>
          <div>please select location</div>
          {/* แผนที่ */}
          <MapContainer
            className="h-[50vh] "
            center={[13.75, 100.499]}
            zoom={10}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <UserLocationMarker />
            <Marker position={[13.75, 100.499]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          {/*จบ แผนที่ */}
          <div>
            <form onSubmit={handleSubmit(hdlSubmit)}>
              <p> New Address : </p>
              <DriverFormInput
                register={register}
                name={"address"}
                errors={errors}
                label="address :"
              />

              <div className="flex justify-center">
                <DriverButtons isSubmitting={isSubmitting} label={"SAVE"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAddAddress;
