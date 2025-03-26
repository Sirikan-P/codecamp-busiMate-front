import React, { useState } from 'react'

function DriverFileInput({register ,name ,type="file", errors , label, ...rest}) {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file || file.length === 0) return;
      // แสดงตัวอย่างรูปเดียว
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
      };
    return (
        <div>
            <div className='flex justify-center w-full'>
                {/* แสดงรูปตัวอย่าง */}
                <div >
                {previewImage && <img src={previewImage} alt="preview" width="100px" />}
                <p className='text-left text-smpx-4 mx-4 text-rose-800'> {label} </p>
                </div>                
                <input   
                    className= "bg-slate-100 w-66 h-10 border-2 border-slate-300 rounded-md"             
                    type= {type}
                    name={name}                
                    id={name}
                    {...rest}        
                    {...register(name, {
                        onChange: (e) => {
                          handleImageUpload(e); // เรียกฟังก์ชัน handleImageUpload
                        },           
                    })}                       
                     />
            </div>
            <div>
            {
                errors?.[name] &&
                <p className="text-sm text-red-500 text-right pr-14"> {errors[name].message} </p>
            }
            </div>
        </div>
    )
}

export default DriverFileInput