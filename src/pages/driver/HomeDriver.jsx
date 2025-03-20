import React, { useEffect, useState } from "react";
import DriverDashboard from "../../components/driver/DriverDashboard";
import DriverWallet from "../../components/driver/DriverWallet";
import { actionGetDriver } from "../../api/driver";
import useDriverStored from "../../store/driver-store";
import DriverHeader from "../../components/driver/DriverHeader";

function HomeDriver() {
  const token = localStorage.getItem("token");

  //zustand : global state
  const driver = useDriverStored((state) => state.driver);
  const actionGetDriverWithZustand = useDriverStored(
    (state) => state.actionGetDriverWithZustand
  );

  //useEffect : get driver data find current  driver
  useEffect(() => {
    actionGetDriverWithZustand(token);
  }, []);

  return (
    <div>
      <div className="bg-cyan-600 p-6">
        <DriverHeader driver={driver} />
        <DriverDashboard driver={driver} />
        <DriverWallet driver={driver} />
      </div>
    </div>
  );
}

export default HomeDriver;
