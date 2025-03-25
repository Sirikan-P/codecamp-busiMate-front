import React from 'react'
import useDriverStored from '../../store/driver-store'
import { createAlert } from "../../utils/createAlert"
import { useForm } from "react-hook-form"
import DriverAvatar from '../../components/driver/DriverAvatar'
import DriverFileInput from '../../components/driver/driverForm/DriverFileInput'
import DriverFormInput from '../../components/driver/driverForm/DriverFormInput'
import DriverButtons from '../../components/driver/driverForm/DriverButtons'
import DriverHeader from '../../components/driver/DriverHeader'
import DriverToggleInput from '../../components/driver/driverForm/DriverToggleInput'
import DriverSelectInput from '../../components/driver/driverForm/DriverSelectInput'
import { useNavigate } from 'react-router'

//validator
import { profileSchema } from "../../utils/driverValidators"
import { zodResolver } from "@hookform/resolvers/zod"

function DriverEditProfile() {
  const token = localStorage.getItem("driverToken")
  
  //zustand : global state  
  const driver = useDriverStored(state => state.driver)
  const actionUpdateDriverWithZustand = useDriverStored( (state) => state.actionUpdateDriverWithZustand)

   //react hook form
   const { register, handleSubmit, formState, reset, setValue, watch } = useForm({
      //use zod validate
      resolver: zodResolver(profileSchema)
  })
  const { isSubmitting, errors } = formState
//----------------------------------------
const arrayGender = ["MALE", "FEMALE", "OTHER"]
const arrayCartype = ["SEETS_4", "SEETS_7", "SEETS_9"]

const navigate = useNavigate()
//----------------------------------------
    const hdlSubmit = async(value)=>{
    
      const {...newData} = value
      //console.log(newData)
      newData.online =  (newData.online) ?  "ONLINE":"OFFLINE"
      newData.hasWheelChair =  (newData.hasWheelChair) ?  "HAVE":"NOHAVE"
      newData.hasAssist =  (newData.hasAssist) ?  "HAVE":"NOHAVE"
      
      const formDriverData = new FormData()
      Object.keys(newData).forEach(key =>{
        //console.log(key, newData[key] , newData[key].length)
        if(key === "profileImageUrl" ){
          if (newData[key].length !==0) {
            formDriverData.append(key, newData[key][0])
          }
        } else {
          formDriverData.append(key, newData[key])
        }
      })

      //console.log("fromdata",Object.entries(FormData))

      const res = await actionUpdateDriverWithZustand(token,formDriverData)
      //console.log("res",res)
      if(res.success){
        createAlert("success", "save driver profile success")
        navigate('/driver')
      }else{
        createAlert("info","something wrong")
      }
  }
 

  return (
    <div className="flex flex-col p-6 bg-cyan-600">
    <div className="bg-white p-6 flex flex-col rounded-lg justify-center w-full h-full m-auto shadow-2xl">
      <h1 className=" text-center m-4 pb-4 text-2xl font-semibold text-rose-800">
          Edit Your Infomation
      </h1>

      <div className=" bg-white px-4 py-2 gap-8 my-4 shadow-2xl rounded-md">  
          <DriverHeader driver={driver} />
      </div>  
     
  
      <div className=" bg-white px-4 py-2 gap-8 my-4 shadow-2xl rounded-md">  
          <div className='flex flex-col justify-center w-full h-[100px] m-auto font-semibold text-rose-800'> 
            UPDATE PROFILE
          </div> 
            <form onSubmit ={ handleSubmit(hdlSubmit) } >
              <div className="flex flex-col gap-2 py-2"> 
                 <DriverFileInput register={register} name="profileImageUrl" errors={errors} label="Profile Image"  />  
              </div>            
              <div className="flex flex-col gap-2 py-2">                              

                <DriverToggleInput register={register} name={"online"} defaultValue={driver.online || "OFFLINE"} errors={errors} label="Online Status :" type="checkoffline" setValue={setValue} watch={watch} /> 
                <DriverFormInput register={register} name={"firstName"} defaultValue={driver.firstName || ""} errors={errors} label="Firstname :" /> 
                <DriverFormInput register={register} name={ "lastName"} defaultValue={driver.lastName || ""} errors={errors} label="Lastname : " />
                <DriverFormInput register={register} name={ "phoneNumber"} defaultValue={driver.phoneNumber || ""} errors={errors} label="Phone : " />
                <DriverFormInput register={register} name={ "age"} defaultValue={driver.age || ""} errors={errors} label="Age : " />              
                <DriverSelectInput register={register} name={"gender"} defaultValue={driver.gender || "MALE"} errors={errors} label={"GENDER :"} ar={arrayGender} />
                <DriverFormInput register={register} name={ "idCard"} defaultValue={driver.idCard || "" } errors={errors} label="ID card :" />
                <DriverFormInput register={register} name={ "carRegNo"} defaultValue={driver.carRegNo || ""}  errors={errors} label="Car Reg No :" />
                <DriverSelectInput register={register} name={"carType"} defaultValue={driver.carType || "SEETS_4"} errors={errors} label={"Car Type"} ar={arrayCartype} />
                <DriverToggleInput register={register} name={"hasWheelChair"} defaultValue={driver.hasWheelChair || "HAVE"} errors={errors} label="Has Wheel Chair :" type="checkHave" setValue={setValue} watch={watch} /> 
                <DriverToggleInput register={register} name={"hasAssist"} defaultValue={driver.hasAssist || "HAVE"} errors={errors} label="Has Assist :" type="checkHave" setValue={setValue} watch={watch} /> 
              </div>

             
              <div className="flex justify-center">
                <DriverButtons isSubmitting={ isSubmitting } label={ "Save Change"} />
              </div>
            </form>           
          </div>  
          </div>   
    </div>
  )
}

export default DriverEditProfile