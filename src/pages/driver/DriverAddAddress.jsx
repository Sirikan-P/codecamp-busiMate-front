import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import { createAlert } from "../../utils/createAlert"
import "leaflet/dist/leaflet.css"
import DriverLocationMarker from '../../components/driver/DriverLocationMarker'
import useDriverStored from '../../store/driver-store'
import DriverAddressCards from '../../components/driver/DriverAddressCards'
import { useForm } from 'react-hook-form'
import DriverFormInput from '../../components/driver/driverForm/DriverFormInput'
import DriverButtons from '../../components/driver/driverForm/DriverButtons'
import DriverHeader from '../../components/driver/DriverHeader';
import { useNavigate } from 'react-router'
import { actionCreateDriverAddress } from '../../api/driver'


function DriverAddAddress() {
  const token = localStorage.getItem("driverToken")
  const driver = useDriverStored(state => state.driver)
  const driverSelectLatLng = useDriverStored(state => state.driverSelectLatLng)
  
  //react hook form
  const { register, handleSubmit, formState, reset, setValue } = useForm({
  })
  const { isSubmitting, errors } = formState

  const navigate = useNavigate()
 
//----------------------------------------
  const hdlSubmit = async(value)=>{
    try {
      const {...newData} = value
      
      console.log(driverSelectLatLng)
      newData.lat = driverSelectLatLng.lat
      newData.long = driverSelectLatLng.lng
      console.log("aa",newData)

      const res = await actionCreateDriverAddress(token,newData)
      const { result } = res.data
      createAlert("info","add complete")
      navigate('/driver/address')
      return { success: true , result } //object
    } catch (error) {
      return { success: false, error: error.response?.data?.message} //object
    }

  }

  return (
    <div className="bg-cyan-600 min-h-screen p-4" > 
      <div className=" bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-center font-semibold text-xl text-rose-800  pb-4">
          Add Address
      </h1>
      <div className=" bg-white px-4 py-2 gap-8 my-4 shadow-2xl rounded-md">  
          <DriverHeader driver={driver} />
      </div>  
      <div className="pt-6 border-cyan-600">
          <h1 className="text-center font-semibold text-xl text-rose-800 pb-6">
            Please Select location
          </h1>
        {/* แผนที่ */}
        <MapContainer className='h-[50vh]'
          center={[13.750, 100.499]}
          zoom={13} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          < DriverLocationMarker />
          <Marker position={[13.750, 100.499]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        {/*จบ แผนที่ */}

        <div className=" bg-white px-4 py-2 gap-8 my-4 shadow-2xl rounded-md">
          <form onSubmit ={ handleSubmit(hdlSubmit) } >

              <DriverFormInput register={register} name={"address"} errors={errors} label="New address :" /> 

            <div className="flex justify-center">
                <DriverButtons isSubmitting={ isSubmitting } label={ "SAVE"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DriverAddAddress