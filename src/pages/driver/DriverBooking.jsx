import React, { useEffect, useState } from 'react'
import useDriverStored from '../../store/driver-store'
import DriverHeader from '../../components/driver/DriverHeader'
import { actionGetDriverBooking } from '../../api/driverBooking'
import DriverBookingCards from '../../components/driver/DriverBookingCards'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function DriverBooking() {
  const token = localStorage.getItem("driverToken")
  const [myBooking,setMyBooking] = useState([])
  const [bookingStatus,setBookingStatus] = useState("UP_COMING")
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;
    
  //zustand : global state  
  const driver = useDriverStored(state => state.driver)
  //const actionGetDriverWithZustand = useDriverStored( state=> state.actionGetDriverWithZustand)

  const getMybooking =  async(status)=>{     
    try {

      const res = await actionGetDriverBooking(token,status)
      const { result } = res.data
      
      setMyBooking( result )
      console.log(myBooking)
    } catch (error) {
        return ("fail")
    }
  }

  const hdlStatusClick = (status)=> {
    if (status ==1){
      setBookingStatus("UP_COMING")
    }else if (status==2)
    { setBookingStatus("IN_PROCESS")}
    else if (status==3) {
      setBookingStatus("COMPLETE")
    }
  }

 // Paginate the bookings
 const indexOfLastBooking = currentPage * bookingsPerPage;
 const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
 const currentBookings = myBooking.slice(indexOfFirstBooking, indexOfLastBooking);


 // Handle page change
 const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
 // Calculate the total number of pages
 const totalPages = Math.ceil(myBooking.length / bookingsPerPage);


  //useEffect : get driver data find current  driver
  useEffect( ()=>{getMybooking(bookingStatus)} ,[bookingStatus])

  return (
    <div className="bg-cyan-600 w-full h-full p-5 flex flex-col gap-5">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-center pt-10 text-slate-200 ">
          { bookingStatus } BOOKING
        
          <div className="dropdown dropdown-left">
            <div tabIndex={0} role="button" className="btn m-1 rounded-full"> ... </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li onClick={ ()=>hdlStatusClick(1)}><a>Up Coming</a></li>
              <li onClick={ ()=>hdlStatusClick(2)}><a>In Process</a></li>
              <li onClick={ ()=>hdlStatusClick(3)}><a>Complete</a></li>
            </ul>
          </div>
        </h1>
        <DriverHeader driver={driver} />
      </div> 
      <div className="bg-white p-5 rounded-md">           
        <div className="flex flex-col gap-10 m-5">              
          {myBooking.map(el => (
              <DriverBookingCards key={el.id} booking={el} />
              ))
          }  
        </div>
      </div> 

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4 items-center">
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn border-none text-xl font-semibold bg-cyan-200 rounded-md text-cyan-700"
        >
          <ChevronLeft />
        </div>
        <div className="text-cyan-700 text-xl">
          Page {currentPage} of {totalPages}
        </div>
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn border-none bg-cyan-200 text-xl font-semibold rounded-md text-cyan-700"
        >
          <ChevronRight />
        </div>
      </div>       
    </div>
  )
}

export default DriverBooking