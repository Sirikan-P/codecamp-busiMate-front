import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import DriverLocationMarker from '../../components/driver/DriverLocationMarker'
import useDriverStored from '../../store/driver-store'
import DriverAddressCards from '../../components/driver/DriverAddressCards'
import { useForm } from 'react-hook-form'
import DriverFormInput from '../../components/driver/driverForm/DriverFormInput'
import DriverButtons from '../../components/driver/driverForm/DriverButtons'



function DriverAddAddress() {
  const driver = useDriverStored(state => state.driver)
  
  //react hook form
  const { register, handleSubmit, formState, reset, setValue } = useForm({
  })
  const { isSubmitting, errors } = formState

 
//----------------------------------------
  const hdlSubmit = async(value)=>{

    const {...newData} = value
    createAlert("info","test ka")
  }

  return (
    <div>DriverAddAddress

      <div>Form
        <div> select location</div>
        <MapContainer className='h-[50vh]'
          center={[13.750, 100.499]}
          zoom={10} >
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

        <div>
          <form onSubmit ={ handleSubmit(hdlSubmit) } >
          <p> New Address :  </p>
              <DriverFormInput register={register} name={"address"} errors={errors} label="address :" /> 

            <div className="flex justify-center">
                <DriverButtons isSubmitting={ isSubmitting } label={ "SAVE"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DriverAddAddress