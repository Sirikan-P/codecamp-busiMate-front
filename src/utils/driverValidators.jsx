import {z} from "zod"

export const profileSchema = z.object({
  firstname: z.string().min(3, "firstname more than 3 characters") ,
  lastname: z.string().min(3, "Lastname more than 3 characters") ,
  idcardNumber: z.string().min(13, "id card number more than 13 characters") ,
  phoneNumber: z.string().min(10, "phone number more than 10 characters") ,
  shopName: z.string().min(3, "shop name more than 3 characters") ,
  address: z.string().min(3, "address number more than 3 characters") ,
  profileImage: z.any()
})