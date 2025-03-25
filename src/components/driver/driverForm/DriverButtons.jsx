import { Loader } from 'lucide-react'
import React from 'react'


function DriverButtons({isSubmitting ,label }) {
  return (
    <button  
        className="btn w-52 text-white font-semibold  text-md my-2 bg-cyan-600 border-0  rounded-md
                    hover:cursor-pointer"
                    >
                        { isSubmitting 
                        ? <div className="
                                        gap-2"> 
                            <Loader className='animate-spin'/> 
                            <p> Loading... </p>
                            </div>
                        : <p>  {label} </p> 
                        }
                    </button>
  )
}

export default DriverButtons