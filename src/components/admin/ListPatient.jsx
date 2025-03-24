// rafce
import React from "react";
import moment from "moment";
import numeral from "numeral";
import { DockIcon, FileEdit, PaperclipIcon, StarIcon } from "lucide-react";
import { createAlert } from "../../utils/createAlert";
import { actionUpdateUserData } from "../../api/adminManageUser";

const ListPatient = (props) => {
  const { patientData, token, hdlGetPatientDataAll } = props;
  console.log("patientData ==== ", patientData);

  // ********* patientData stats calculation
  const showDate = (anyDate) => {
    return moment(anyDate).format("YYYY-MM-DD");
  };
  // console.log("type of patientData.createdAt ==== ", typeof(patientData.createdAt))
  // console.log("patientData.createdAt ==== ", patientData.createdAt)

  const countBooking = (bookingArray) => {
    return bookingArray.length;
  };

  const sumBookingPrice = (bookings) => {
    let totalPriceSum = 0;
    bookings.forEach((booking) => {
      totalPriceSum += parseFloat(booking.totalPrice);
    });
    return numeral(totalPriceSum).format("0,0");
  };

  const calRating = () => {
    let totalRating = 0;
    let reviewCount = 0;

    if (patientData && patientData.bookings) {
      patientData.bookings.forEach((booking) => {
        if (booking.reviews && booking.reviews.length > 0) {
          booking.reviews.forEach((review) => {
            let ratingValue = 0;
            switch (review.rate) {
              case "A":
                ratingValue = 5;
                break;
              case "B":
                ratingValue = 4;
                break;
              case "C":
                ratingValue = 3;
                break;
              case "D":
                ratingValue = 2;
                break;
              case "E":
                ratingValue = 1;
                break;
              default:
                ratingValue = 0;
            }
            totalRating += ratingValue;
            reviewCount++;
          });
        }
      });
    }

    if (reviewCount === 0) {
      return 0; // ไม่มี reviews ให้ return 0
    }

    return numeral(totalRating / reviewCount).format(0, 0.0); // คำนวณค่าเฉลี่ยและ return
  };

  const findLastestReview = (bookings) => {
    let latestReviewMessage = null;
    let latestReviewId = -1;

    bookings.forEach((booking) => {
      if (booking.reviews && booking.reviews.length > 0) {
        booking.reviews.forEach((review) => {
          if (review.id > latestReviewId) {
            latestReviewId = review.id;
            latestReviewMessage = review.message;
          }
        });
      }
    });

    return latestReviewMessage;
  };

  const countAllReport = () => {
    let totalReports = 0;
    if (patientData && patientData.bookings) {
      patientData.bookings.forEach((booking) => {
        if (booking.reports) {
          totalReports += booking.reports.length;
        }
      });
    }
    return totalReports;
  }

  const countInProcessReport = () => {
    let inProcessReports = 0;
    if (patientData && patientData.bookings) {
      patientData.bookings.forEach((booking) => {
        if (booking.reports) {
          booking.reports.forEach((report) => {
            if (report.status === "IN_PROCESS") {
              inProcessReports++;
            }
          });
        }
      });
    }
    return inProcessReports;
  }

  // ******** handle function
  const hdlUpdatePatientStatus = async (e, id) => {
    const status = e.target.value;
    if (!token) {
      createAlert("error", "Token is missing");
    }
    try {
      console.log("e.target.value ==== ", e.target.value);
      console.log("patientData.user.id ==== ", patientData.user.id);
      const result = await actionUpdateUserData(token, id, { status });
      console.log("result ==== ", result);
      hdlGetPatientDataAll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* List up patient */}
      <div className="bg-slate-300 rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          {/* Patient profileimage, name, phone, age, gender, created at */}
          <div className="flex flex-col">
            <div className="text-center">
              <h3>Patient id: {patientData.id}</h3>
            </div>
            <div className="flex">
              <div className="relative">
                <img
                  src={patientData.profileImage}
                  alt={`Profile picture of ${patientData.firstName}  ${patientData.lastName}`}
                  className="w-20 h-20 rounded-full object-cover border"
                />
              </div>
              <div>
                <h3>{`${patientData.firstName} ${patientData.lastName}`}</h3>
                <h3>{patientData.phoneNumber}</h3>
                <h3>{`อายุ: ${patientData.age} ปี`}</h3>
                <h3>{`เพศ: ${patientData.gender}`}</h3>
                <h3>{`เริ่มสมาชิก: ${showDate(patientData.createdAt)}`}</h3>
              </div>
            </div>
          </div>
          {/* User profileimage, name, email, phone, address */}
          <div className="flex flex-col">
            <div className="text-center">
              <h3>User id: {patientData.user.id} </h3>
            </div>
            <div className="flex">
              <div className="relative">
                <img
                  src={patientData.user.profileImage}
                  alt={`Profile picture of ${patientData.user.firstName}  ${patientData.user.lastName}`}
                  className="w-20 h-20 rounded-full object-cover border"
                />
              </div>
              <div>
                <h3>{`${patientData.user.firstName} ${patientData.user.lastName}`}</h3>
                <h3>{patientData.user.phoneNumber}</h3>
                <h3>{`${patientData.user.email}`}</h3>
                <div className="flex gap-1">
                <h3>Status: </h3>
                <select
                  onChange={(e) =>
                    hdlUpdatePatientStatus(e, patientData.user.id)
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    patientData.user.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : patientData.user.status === "INACTIVE"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700" // เพิ่มเงื่อนไข default
                  }`}
                  defaultValue={patientData.user.status}
                  >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                  </div>
                <h3>{`เริ่มสมาชิก: ${showDate(
                  patientData.user.createdAt
                )}`}</h3>
              </div>
            </div>
          </div>
          {/* Total Booking & Total spend for booking */}
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h3>Total Booking</h3>
              {countBooking(patientData.bookings)}
            </div>
            <div>
              <h3>Total Price</h3>
              {sumBookingPrice(patientData.bookings)}
            </div>
          </div>
          {/* Rating Result & Monitor Review Latest Data */}
          <div className="flex flex-col text-center gap-4">
            <div>Rating: {calRating(patientData.bookings)} </div>
            <div className="gap-1">
              <h3>Lastest Review</h3>
              <div className="max-w-[200px] overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                {findLastestReview(patientData.bookings)}
              </div>
              <div>
                <button className=" btn bg-slate-300 gap-1">
                  <DockIcon />
                  <h3>click for all reviews</h3>
                </button>
              </div>
            </div>
          </div>
          {/* Report status */}
            <div className="flex flex-col text-center gap-4">
              <h3>Report Status</h3>
              <h3>{`Total Report: ${countAllReport()} cases`}</h3>
              <h3>{`InProcess ${ countInProcessReport() } cases`}</h3>
              <button className="btn bg-slate-300 gap-1">
                <FileEdit />
                <h3>click for detail</h3>
              </button>
            </div>

        </div>
      </div>
    </>
  );
};

export default ListPatient;
