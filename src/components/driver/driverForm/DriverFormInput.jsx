import React from 'react'

function DriverFormInput({register ,name ,type="text" , errors , label,...rest}) {
    return (
        <div className="w-full">
            <div className="flex justify-start items-center w-full py-1">

            <p className="w-[140px] text-left text-rose-800 font-semibold text-lg"> 
                {label} 
            </p>
            <input
                placeholder={name} //dynamic
                type={type}
                {...rest}
                {...register(name)}
                // className="input input-bordered rounded-none bg-slate-100 w-4/6 p-1 px-4 h-10 text-base "
                className={`input input-bordered rounded-md bg-slate-100 w-4/6 p-2 px-4 h-10 text-base border-2 border-gray-300 
                    focus:outline-none focus:border-cyan-600 transition duration-200 ${
                      errors[name] ? "border-rose-800" : ""
                    }`}
            />
            </div>
            <div>
            {
                errors[name] &&
                <p className="text-sm text-rose-800 mt-1 text-right pr-14"> {errors[name].message} </p>
            }
            </div>
        </div>
    )
}

export default DriverFormInput