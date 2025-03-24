//rfce
import React, { useEffect, useState } from "react";
import {
  actionFindPatientByName,
  actionGetPatientDataAll,
} from "../../api/adminManageUser";
import { Search } from "lucide-react";
import ListPatient from "../../components/admin/ListPatient";
import { createAlert } from "../../utils/createAlert";

function Patients1() {
  const [patientDataAll, setPatientDataAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MTg1NDQwNCwiZXhwIjoxNzQzMTUwNDA0fQ.ZFoevBdOJnZPEKmQFFuu6j-nwqUN0-U6EF_E30y5vc0";

  // ******** Patient Data Fetching
  const hdlGetPatientDataAll = async () => {
    try {
      const result = await actionGetPatientDataAll(token);
      console.log("result ==== ", result.data.data);
      if (result.data.data.length == 0) {
        createAlert("info", "Cannot find out Booking Data");
      } else {
        setPatientDataAll(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hdlGetPatientDataAll();
  }, []);

  // ******** Search Patient by name
  const hdlSearchPatient = async () => {
    console.log("searchTerm ====", searchTerm);
    try {
      const result3 = await actionFindPatientByName(token, searchTerm);
      console.log("result3 ==== ", result3.data.data);

      if (result3.data.data.length == 0) {
        createAlert("info", "Cannot find out patient name");
      } else {
        setSearchResult(result3.data.data);
      }
    } catch (error) {
      console.error("Failed to find patientByName:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients Monitor</h1>
      </div>

      {/* Search box */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Patient by name..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    hdlSearchPatient(); // เรียกฟังก์ชันค้นหา
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Driver List */}
        <div className="mt-4">
          {(searchResult.length ? searchResult : patientDataAll).map(
            (patientData) => (
              <ListPatient
                key={patientData.id}
                patientData={patientData}
                token={token}
                hdlGetPatientDataAll={hdlGetPatientDataAll}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Patients1;
