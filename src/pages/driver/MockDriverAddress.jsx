import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import DriverLocationMarker from "../../components/driver/DriverLocationMarker";
import useDriverStored from "../../store/driver-store";
import DriverAddressCards from "../../components/driver/DriverAddressCards";
import { useNavigate } from "react-router";
import DriverHeader from "../../components/driver/DriverHeader";
import { createAlert } from "../../utils/createAlert";

// Change map position when driverCurrentLatLng changes
function ChangeCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center]);
  return null;
}

function MockDriverAddress() {
  const token = localStorage.getItem("token");

  const driver = useDriverStored((state) => state.driver);
  const driverAddress = useDriverStored((state) => state.driverAddress);
  const actionGetDriverWithZustand = useDriverStored(
    (state) => state.actionGetDriverWithZustand
  );
  const driverCurrentLatLng = useDriverStored(
    (state) => state.driverCurrentLatLng
  );

  const actionDeleteDriverAddressWithZustand = useDriverStored(
    (state) => state.actionDeleteDriverAddressWithZustand
  );
  const actionUpdateDriverAddressWithZustand = useDriverStored(
    (state) => state.actionUpdateDriverAddressWithZustand
  );

  const navigate = useNavigate();

  const hdlAddAddress = () => {
    navigate("/driver/address/add");
  };

  useEffect(() => {
    actionGetDriverWithZustand(token);
  }, []);

  const hdlSetUse = async (addressId) => {
    try {
      const value = {
        id: addressId,
        status: "USE",
      };
      const res = await actionUpdateDriverAddressWithZustand(token, value);

      return { success: true, res };
    } catch (error) {
      return "fail";
    }
  };

  const hdlDelete = async (addressId) => {
    try {
      const res = await actionDeleteDriverAddressWithZustand(token, addressId);
      if (res) {
        createAlert("info", "Delete complete");
      }
      return { success: true, res };
    } catch (error) {
      return "fail";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h1 className="text-lg font-bold text-cyan-600">
            Driver Current Address
          </h1>
          <DriverHeader driver={driver} />
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={hdlAddAddress}
            className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition"
          >
            + Add New Address
          </button>
        </div>

        {/* Current Location */}
        <div>
          <h1 className="text-rose-700 font-semibold pb-2 text-xl">
            Current Location
          </h1>
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Map Section */}
        <div className="relative mt-4 rounded-md overflow-hidden shadow-md">
          <MapContainer
            className="h-[300px] w-full"
            center={driverCurrentLatLng}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeCenter center={driverCurrentLatLng} />
            <Marker position={driverCurrentLatLng}>
              <Popup>Driver's Current Location</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Address List */}
        <div className="mt-6 space-y-4 :">
          {driverAddress.map((el) => (
            <DriverAddressCards
              key={el.id}
              address={el}
              hdlDelete={hdlDelete}
              hdlSetUse={hdlSetUse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MockDriverAddress;
