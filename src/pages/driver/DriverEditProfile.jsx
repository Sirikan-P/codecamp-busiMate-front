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



function DriverEditProfile() {
  const token = localStorage.getItem("token")
  
  //zustand : global state  
  const driver = useDriverStored(state => state.driver)
  const actionUpdateDriverWithZustand = useDriverStored( (state) => state.actionUpdateDriverWithZustand)

   //react hook form
   const { register, handleSubmit, formState, reset, setValue, watch } = useForm({
  })
  const { isSubmitting, errors } = formState
//----------------------------------------
const arrayGender = ["MALE", "FEMALE", "OTHER"]

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
      }else{
        createAlert("info","something wrong")
      }
  }
 

  return (
    <div className='flex flex-col '>DriverEditProfilesss
          <DriverHeader driver={driver} />
         <div className='flex flex-col justify-center w-full h-[100px] m-auto bg-amber-200'> 
           < DriverAvatar className='flex w-24 h-24 rounded-full ' 
                                    menu = {false}
                                    imgSrc = {driver?.profileImageUrl}/>

          </div>   
          <div className='flex flex-col justify-center w-full h-full m-auto py-2' >
            <form onSubmit ={ handleSubmit(hdlSubmit) } >
            <DriverFileInput register={register} name="profileImageUrl" errors={errors} label="Profile Image"  />
              
              <div className="flex flex-col gap-2 py-2">                              

                <DriverToggleInput register={register} name={"online"} defaultValue={driver.online || "OFFLINE"} errors={errors} label="online :" type="checkoffline" setValue={setValue} watch={watch} /> 
                <DriverFormInput register={register} name={"firstName"} defaultValue={driver.firstName || ""} errors={errors} label="firstname :" /> 
                <DriverFormInput register={register} name={ "lastName"} defaultValue={driver.lastName || ""} errors={errors} label="lastname : " />
                <DriverFormInput register={register} name={ "phoneNumber"} defaultValue={driver.phoneNumber || ""} errors={errors} label="phone : " />
                <DriverFormInput register={register} name={ "age"} defaultValue={driver.age || ""} errors={errors} label="age : " />              
            
                <DriverSelectInput register={register} name={"gender"} defaultValue={driver.gender || "MALE"} errors={errors} label={"GENDER"} ar={arrayGender} />
                <DriverFormInput register={register} name={ "idCard"} defaultValue={driver.idCard || "" } errors={errors} label="ID card Number" />

                <DriverFormInput register={register} name={ "carRegNo"} defaultValue={driver.carRegNo || ""}  errors={errors} label="car Reg No" />
                <DriverFormInput register={register} name={ "carType"} defaultValue={driver.carType || ""}  errors={errors} label="carType" />
               
                <DriverToggleInput register={register} name={"hasWheelChair"} defaultValue={driver.hasWheelChair || "HAVE"} errors={errors} label="hasWheelChair :" type="checkHave" setValue={setValue} watch={watch} /> 
                <DriverToggleInput register={register} name={"hasAssist"} defaultValue={driver.hasAssist || "HAVE"} errors={errors} label="hasAssist :" type="checkHave" setValue={setValue} watch={watch} /> 
              </div>
              <div className="flex justify-center">
                <DriverButtons isSubmitting={ isSubmitting } label={ "SAVE"} />
              </div>
            </form> 
          
          </div>  

    </div>
  )
}

export default DriverEditProfile