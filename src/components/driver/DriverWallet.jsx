// import React, { useEffect, useState } from "react";
// import { actionGetDriverWallet } from "../../api/wallet";
// import DriverWalletCard from "./DriverWalletCard";

// function DriverWallet(props) {
//   //JS
//   // const { driver } = props;
//   // const [myWallet, setMyWallet] = useState([]);

//   const mockDrivevData = [
//     {
//       id: 3,
//       type: "INCOME",
//       amount: 100,
//       date: "2025-03-13T08:27:47.718Z",
//       description: "Completed Ride #A123",
//     },
//     {
//       id: 2,
//       type: "OUTCOME",
//       amount: 50,
//       date: "2025-03-13T05:41:25.689Z",
//       description: "Platform Fee",
//     },
//     {
//       id: 1,
//       type: "INCOME",
//       amount: 100,
//       date: "2025-03-13T05:38:35.767Z",
//       description: "Completed Ride #A122",
//     },
//   ];

//   // const getMyWallet = async () => {
//   //   try {
//   //     const token =
//   //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQyMDUwNDQ0LCJleHAiOjE3NDMzNDY0NDR9.LlBUSVelok5Pk8ecWjdhk0fGvovX-uyVvuKUIb3I6Ks";

//   //     const res = await actionGetDriverWallet(token);
//   //     const { result } = res.data;
//   //     setMyWallet(result);
//   //     console.log(myWallet);
//   //   } catch (error) {
//   //     return "fail";
//   //   }
//   // };

//   // useEffect(() => {
//   //   getMyWallet();
//   // }, []);
//   // <div>
//   //     {" "}
//   //     DriverWallet
//   //     <p>wallet : {myWallet?.wallet}</p>
//   //     {driverWallet.map((el) => (
//   //       <DriverWalletCard key={el.id} wallet={el} />
//   //     ))}
//   //   </div>

//   // const driverWallet = myWallet?.DriverWallet ? myWallet?.DriverWallet : [];

//   return (
//     <div className="min-h-screen bg-cyan-700 overflow-auto">
//       <p>TEST</p>
//     </div>
//   );
// }

// export default DriverWallet;

import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Edit,
  Star,
  Award,
  Shield,
  Clock,
} from "lucide-react";

function DriverWallet() {
  const [activeTab, setActiveTab] = useState("wallet");

  const mockDrivevData = [
    {
      id: 3,
      type: "INCOME",
      amount: 100,
      date: "2025-03-13T08:27:47.718Z",
      description: "Completed Ride #A123",
    },
    {
      id: 3,
      type: "INCOME",
      amount: 100,
      date: "2025-03-13T08:27:47.718Z",
      description: "Completed Ride #A123",
    },
    {
      id: 3,
      type: "INCOME",
      amount: 100,
      date: "2025-03-13T08:27:47.718Z",
      description: "Completed Ride #A123",
    },
    {
      id: 2,
      type: "OUTCOME",
      amount: 50,
      date: "2025-03-13T05:41:25.689Z",
      description: "Platform Fee",
    },
    {
      id: 1,
      type: "INCOME",
      amount: 100,
      date: "2025-03-13T05:38:35.767Z",
      description: "Completed Ride #A122",
    },
  ];

  return (
    <div className="card bg-base-100 shadow-xl p-6 my-6">
      <h2 className="card-title flex text-2xl text-rose-800 items-center">
        Driver Wallet
      </h2>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="">
              <div>
                <div className="stat-title">Current Balance</div>
                <div className="stat-value text-success">฿ 150</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-1 border-cyan-600"></div>

        <div className="space-y-4">
          {mockDrivevData.map((entry) => (
            <div
              key={entry.id}
              className="bg-base-200 p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="font-medium text-rose-800">
                      ID: {entry.id}{" "}
                    </span>
                    <span className="font-medium text-cyan-700">
                      - {entry.description}
                    </span>
                    <p className="text-sm opacity-70">
                      {new Date(entry.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-xl font-bold ${
                    entry.type === "INCOME" ? "text-success" : "text-error"
                  }`}
                >
                  {entry.type === "INCOME" ? "+" : "-"}฿{entry.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriverWallet;
