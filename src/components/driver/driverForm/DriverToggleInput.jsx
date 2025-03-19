import React, { useEffect } from 'react'

function DriverToggleInput({register ,name ,type , errors , label,setValue,watch, defaultValue = "OFFLINE", ...rest}) {
    const isChecked = watch(name) ; // ตรวจสอบค่า (true ถ้าเป็น "HAVE")

    return (
        <div >
            <div className='flex justify-center  w-full'>
            <p className='w-[140px] text-left text-sm'> {label} </p>
            
            {type === "checkoffline" ? (
                    <input
                    type="checkbox"
                    className="toggle"
                    checked={isChecked} // ควบคุมค่า toggle
                    onChange={(e) => setValue(name, e.target.checked ? "ONLINE" : "OFFLINE")} // อัปเดตค่า
                    {...register(name)} // เชื่อมต่อกับ React Hook Form
                    {...rest}
                    />
                ) :
                (
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={isChecked}
                        onChange={(e) => setValue(name, e.target.checked ? "HAVE" : "NOHAVE")} // อัปเดตค่า
                        {...register(name)}
                        {...rest}                       
                    />
                )}

            </div>
            <div>
            {
                errors[name] &&
                <p className="text-sm text-red-500 text-right pr-14"> {errors[name].message} </p>
            }
            </div>
        </div>
    )
}

export default DriverToggleInput