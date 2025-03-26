import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router';
import useUserBookingStore from "../../../store/booking-store";

function ReviewDriver() {
  const showOneBook = useUserBookingStore((state) => state.showOneBook);
  const userBooking = useUserBookingStore((state) => state.userbooking);

  const [rating, setRating] = useState("A");
  const [review, setReview] = useState("")

  console.log(showOneBook);
  const id = showOneBook.id
  const token = localStorage.getItem("userToken")

  async function handleAddReview() {
    if (!review.trim()) {
      toast.error('Please Input Review')
    }
    const data = {
      rate: rating,
      message: review,
      bookingId: Number(id) 
    }
    console.log(data);

    try {
      const response = await axios.post('http://localhost:8877/api/user/review', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 201) {
        toast.success('Review submitted successfully!');
        setTimeout(() => {
          window.location.href = "/user"; 
        }, 3000); 
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
    
  }
  return (
    <div className=" w-full h-screen flex justify-center bg-cyan-600 pb-15">
    <div className="flex flex-col mt-10 p-5 pt-10 w-90 bg-white rounded-md shadow-2xl">
      <h2 className="text-m text-cyan-500 mb-5 text-center">How was experience with the driver ?</h2>
      <h2 className="text-m text-cyan-500 mb-5 text-center">{showOneBook.driver.firstName} {showOneBook.driver.lastName}</h2>

      <div className="rating mb-5 justify-center w-full">
        <input type="radio" name="rating-1" className="mask mask-star bg-amber-300" aria-label="1 star" onClick={()=>{setRating("E")}}/>
        <input type="radio" name="rating-1" className="mask mask-star bg-amber-300" aria-label="2 star" onClick={()=>{setRating("D")}}/>
        <input type="radio" name="rating-1" className="mask mask-star bg-amber-300" aria-label="3 star" onClick={()=>{setRating("C")}}/>
        <input type="radio" name="rating-1" className="mask mask-star bg-amber-300" aria-label="4 star" onClick={()=>{setRating("B")}}/>
        <input type="radio" name="rating-1" className="mask mask-star bg-amber-300" aria-label="5 star" onClick={()=>{setRating("A")}}/>
      </div>

      <textarea
        placeholder="Write review here"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="bg-gray-100 w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 mb-4"
      />
      <div className='w-full flex justify-center'>
        <button
          onClick={(handleAddReview)}
          className="btn btn-soft btn-info">Submit</button>
      </div>
    </div> 
    </div>

  );
}

export default ReviewDriver