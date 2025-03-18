import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/auth-store'
import { actionCurrentUser } from '../api/auth'


function ProtectRoutes ( {el , allows } ) {
    //console.log('hello protect route ')
    const [ok,setOk] = useState(null)
    //const user = useAuthStore((state)=> state.user )
    const token = useAuthStore((state)=> state.token)
        // console.log(user.role)
        // console.log(token)

    useEffect( ()=>{
        checkPermission()
    } ,[] ) 
    const checkPermission = async () => {
        //function body        
        try {
            const res = await actionCurrentUser(token)
            const role = res.data.result.role //role from backend 
            console.log(role)

            setOk(allows.includes(role)) //usestate 

        } catch (error) {
            console.log(error)
            setOk(false) //usestate
        }
    }


    console.log(ok)
    if (ok ===null) {
        return <h1>Loading...</h1>
    }
    if(!ok) {
        return <h1>Unauthorized </h1>
    }
  return el 
}

export default ProtectRoutes