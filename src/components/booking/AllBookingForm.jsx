import React, { useEffect, useState } from "react";
import useUserBookingStore from "../../store/booking-store";
import { actionGetOneUserBooking } from "../../api/userBooking";
import { useNavigate } from "react-router";
import ShowOneBooking from "../../pages/user/userBooking/ShowOneBooking";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AllBookingForm() {
  const navigate = useNavigate();
  const fetchAllBookingData = useUserBookingStore(
    (state) => state.fetchAllBookingData
  );
  const allBooking = useUserBookingStore((state) => state.allBooking);
  const setShowOneBook = useUserBookingStore((state) => state.setShowOneBook);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;

  useEffect(() => {
    fetchAllBookingData();
  }, []);

  console.log(allBooking);

  // Fetch one booking action
  const fetchOneBooking = async (id) => {
    const res = await actionGetOneUserBooking(id);
    setShowOneBook(res.data);
    navigate(`/user/booking/get/${id}`);
  };

  // Handle fetching one booking
  const handleShowOneBooking = (id) => {
    fetchOneBooking(id);
  };

  // Paginate the bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = allBooking.slice(indexOfFirstBooking, indexOfLastBooking);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(allBooking.length / bookingsPerPage);

  return (
    <div className="flex flex-col gap-10 m-5">
      {/* Show the bookings for the current page */}
      {currentBookings.map((booking) => (
        <div
          key={booking.id}
          className="p-5 bg-white shadow-2xl rounded-md flex flex-col gap-2"
          onClick={() => handleShowOneBooking(booking.id)}
        >
          {/* Section 1 */}
          <div className="flex justify-between">
            {/* Patient Name */}
            <div className="text-cyan-600">
              <div>{booking.patient.id}</div>
              <label className="text-pink-800 font-semibold text-lg">Patient</label>
              <div className="flex gap-2">
                <div className="text-xl font-semibold">
                  {booking.patient.firstName}
                </div>
                <div className="text-xl font-semibold">
                  {booking.patient.lastName}
                </div>
              </div>
            </div>
            {/* Hospital Name */}
            <div className="text-cyan-600">
              <label className="text-pink-800">Hospital</label>
              <div className="text-lg font-semibold">
                {booking.hospital.name}
              </div>
            </div>
          </div>
          {/* Section 2 */}
          <div className="flex justify-between text-cyan-600">
            {/* Booking Date */}
            <div>
              <label className="text-slate-400">Booking Date</label>
              <div className="font-semibold">{booking.appointmentDate}</div>
            </div>
            {/* Status of Booking */}
            <div>
              <label className=" text-slate-400">Status</label>
              <div className="font-semibold">{booking.bookingStatus}</div>
            </div>
          </div>
        </div>
      ))}

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
  );
}
