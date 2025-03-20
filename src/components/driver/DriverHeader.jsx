import React from "react";

function DriverHeader(props) {
  const { driver } = props;
  return (
    <div>
      {driver?.firstName || "test"} {driver?.lastName || "test"}{" "}
    </div>
  );
}

export default DriverHeader;
