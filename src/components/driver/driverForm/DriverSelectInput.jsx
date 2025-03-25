import React from 'react'

function DriverSelectInput({register , name , errors , label, ar , ...rest }) {
    return (
        <div>
            <div className="flex justify-center items-center w-full">
                <p className="w-[140px] text-left text-md text-rose-800 font-semibold"> {label} </p>
                
                <select {...register(name)} {...rest} 
                     className="select select-bordered rounded-md bg-slate-100 w-4/6 p-1 px-4 h-10 text-base border-2 border-gray-300 ">
                    {ar.map((quality) => (
                    <option key={quality} value={quality}> 
                        {quality}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                {
                    errors?.[name] &&
                    <p className="text-sm text-red-500 text-right pr-14"> 
                    {errors[name].message} 
                    </p>
                }
            </div>
        </div>
    )
}

export default DriverSelectInput