import React from 'react'
import defaultImg from '../../assets/default-driver-avatar.svg'

function DriverAvatar(props) {
  const { imgSrc , menu , ...restProps } = props
  return (
    <div className='avatar items-center cursor-pointer'>
        <div {...restProps}>
            <img src={imgSrc || defaultImg } alt="avatar" />
        </div>

    </div>
  )
}

export default DriverAvatar