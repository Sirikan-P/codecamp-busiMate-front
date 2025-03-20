import React, { useEffect, useState } from "react";
import { Users, Car, Clock, Star } from "lucide-react";
import { actionGetBookingDataByDate } from "../../api/adminDashboard";
import { createAlert } from "../../utils/createAlert";
import moment from "moment/moment";
import numeral from "numeral";

const mockStats = {
  FIND_DRIVER: 5,
  UP_COMING: 4,
  IN_PROCESS: 10,
  COMPLETE: 1,
};

const Dashboard1 = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [bookingDataByDate, setBookingDataByDate] = useState([]) 

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MTg1NDQwNCwiZXhwIjoxNzQzMTUwNDA0fQ.ZFoevBdOJnZPEKmQFFuu6j-nwqUN0-U6EF_E30y5vc0"

  // **** Booking Data Fetching
  const today = new Date();
  console.log("today ==== ", today)
  // const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const formattedDate=  moment(today).format("YYYY-MM-DD")
  console.log("formattedDate ==== ", formattedDate)

  const hdlGetBookingDataByDate = async () => {
    try {
      const result = await actionGetBookingDataByDate(token, formattedDate)
      console.log("result ==== ", result.data.data)
      if((result.data.data).length==0) {
        createAlert("info", "Cannot find out Booking Data")
      } else {
        setBookingDataByDate(result.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    hdlGetBookingDataByDate()

  },[])


  // **** Booking StatData Calculation
  const totalBooking = bookingDataByDate.length

  const countBookingStatus= (status) => {
    return bookingDataByDate.filter((booking) => booking.bookingStatus === status).length
  }

  const findingDriver = countBookingStatus("FIND_DRIVER")
  // console.log("findingDriver ==== ", findingDriver)
  const findingDriverRatio = numeral(findingDriver/totalBooking).format("0%")
  // console.log("findingDriverRatio ==== ", findingDriverRatio)

  const upComing = countBookingStatus("UP_COMING")
  const upComingRatio = numeral(upComing/totalBooking).format("0%")

  const inProcess = countBookingStatus("IN_PROCESS")
  const inProcessRatio = numeral(inProcess/totalBooking).format("0%")

  const complete = countBookingStatus("COMPLETE")
  const completeRatio = numeral(complete/totalBooking).format("0%")

  
  // **** Const for component of StatCard
  const StatCard = ({ title, value, icon: Icon, trend, color }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <Icon className={`w-6 h-6 text-${color}-600`} />
          <span className="text-sm font-medium">{trend}</span>
        </div>
        <h3 className="text-2xl font-bold mt-4">{value}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <h1>Today: {moment(today).format("llll")}</h1>
      <h1>Today: {formattedDate}</h1>
      <div className="flex flex-col">
        <div className="text-center">
          <h1>Booking Status</h1>
        </div>
        <div className="text-left">
          <h1>Total Booking: {totalBooking} </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Finding Driver"
            value={findingDriver}
            icon={Users}
            trend={findingDriverRatio}
            color="blue"
          />
          <StatCard
            title="On the way to Patient"
            value={upComing}
            icon={Car}
            trend={upComingRatio}
            color="green"
          />
          <StatCard
            title="During processing"
            value={inProcess}
            icon={Clock}
            trend={inProcessRatio}
            color="yellow"
          />
          <StatCard
            title="Complete"
            value={complete}
            icon={Star}
            trend={completeRatio}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};



export default Dashboard1;