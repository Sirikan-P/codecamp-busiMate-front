import {z} from "zod"

export const profileSchema = z.object({
  online: z.any() ,
  firstName: z.string().min(3, "firstname more than 3 characters") ,
  lastName: z.string().min(3, "Lastname more than 3 characters") ,
  idCard: z.string().min(13, "id card number more than 13 characters") ,
  phoneNumber: z.string().min(10, "phone number more than 10 characters") ,
  age: z.any() ,
  gender: z.any() ,
  carRegNo:z.any() ,
  carType: z.any() ,
  hasWheelChair: z.any() ,
  hasAssist: z.any() ,  
  profileImageUrl: z.any()
})