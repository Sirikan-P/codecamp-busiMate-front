import React, { useEffect } from "react";
import { userAuthStore } from "../../store/userAuthStore";
import Select from "react-select";

export default function SelectUserAddress({ handleUserAddressChange }) {
  const fetchGetUserAddress = userAuthStore(
    (state) => state.fetchGetUserAddress
  );

  const userAddress = userAuthStore((state) => state.userAddress);

  useEffect(() => {
    fetchGetUserAddress();
    console.log(userAddress);
  }, []);

  // const userAddressdata = userAddress.map((address) => ({
  //   id: address.id,
  //   address: address.address,
  //   lat: address.lat,
  //   long: address.long,
  // }));
  // console.log(userAddressdata);


// Select User Address
  const userAddressOptions = userAddress.map((address) => ({
    value: address.id,
    label: address.address,
  }));

  const handleChange = (selectedOption) => {
    const filteredAddress = userAddress.find((el)=> el.id === selectedOption.value)
      console.log(filteredAddress);
    
    handleUserAddressChange(filteredAddress);

  };
  

  return (
    <div className="">
      <Select
        className="text-cyan-600"
        options={userAddressOptions}
        onChange={handleChange}
      />
    </div>
  );
}
