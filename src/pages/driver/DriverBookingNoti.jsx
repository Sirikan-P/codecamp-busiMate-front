import React, { useEffect } from "react";
import useDriverStored from "../../store/driver-store";
import useNotifyStored from "../../store/notify-store";
import { useNavigate } from "react-router";
import elder03 from "../../assets/elder03.jpg";

//socket
import io from "socket.io-client";
import MapReciveNoti from "../../components/driver/MapReciveNoti";
const socket = io("http://localhost:8877", {
  // autoConnect: false
});

function DriverBookingNoti() {
  const driver = useDriverStored((state) => state.driver);

  const socketData = useNotifyStored((state) => state.socketData);
  const actionSetSocketData = useNotifyStored(
    (state) => state.actionSetSocketData
  );
  const actionClearSocketUsersReq = useNotifyStored(
    (state) => state.actionClearSocketUsersReq
  );
  const actionClearSocketData = useNotifyStored(
    (state) => state.actionClearSocketData
  );

  useEffect(() => {
    console.log("test test", driver.id);
    socket.on("U" + driver.id, (data) => {
      // if(sender=="USER") {
      console.log("effect at driver", data);
      actionSetSocketData(data);
      // }
      //global storage
    });
  }, []);

  console.log("socket from user", socketData); //array

  const navigate = useNavigate();
  const hdlDriversubmit = (booking) => {
    const data = { ...booking, result: "ACCEPT" };
    // const data = {
    //   driverId: '1',
    //   name: "driver1",
    //   userId: '2',
    //   bookingId: bookingId,
    //   result:'ACCEPT'
    // }
    console.log(data);
    actionClearSocketData(booking.id);
    actionClearSocketUsersReq(booking.id);
    socket.emit("driver_noti", data);
    //navigate('/driver/booking')
  };

  const hdlDriverReject = (booking) => {
    const data = { ...booking, result: "REJECT" };
    actionClearSocketData(booking.id);
    actionClearSocketUsersReq(booking.id);
    socket.emit("driver_noti", data);
    navigate("/driver/booking");
  };

  // maps
  



  return (
    <div className="flex flex-col place-items-center bg-cyan-600 h-screen pt-5 pr-5 pl-5 ">
      <div className="bg-white flex flex-col item-center  w-full h-full pt-20 p-5 gap-10 rounded-md ">
        <div className="text-3xl text-cyan-600 font-semibold">New Booking</div>
        <div className="flex w-full justify-center">
        <img src={elder03} alt="" className="w-40 " />
        </div>
        {(socketData) &&
        <div className="flex gap-5 w-full text-cyan-600 font-semibold justify-center place-items-center p-5 border-1 border-cyan-200 rounded-md ">
          {socketData?.map((item, index) => (
          <div key={index} className="gap-5 flex flex-col">
            <p>Booking ID: {item.id}</p>
            <p>appointmentDate: {item.appointmentDate}</p>
            <p>Booking patient: {item.patient.firstName}</p>
            <div>
            <MapReciveNoti bookingData={item} />
            </div>
            <div className="flex gap-5">
              <button onClick={() => hdlDriversubmit(item)} className="btn bg-cyan-600 text-white">
                {" "}
                SEND ACCEPT{" "}
              </button>
              <button onClick={() => hdlDriverReject(item)} className="btn text-cyan-600">
                {" "}
                SEND REJECT{" "}
              </button>
            </div>
          </div>
          ))}
        </div>
         } 
      </div>
    </div>
  );
}

export default DriverBookingNoti;

