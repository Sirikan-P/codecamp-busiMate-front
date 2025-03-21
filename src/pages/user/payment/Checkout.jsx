import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

import { actionCheckOut } from "../../../api/payment";
import { useParams } from "react-router";

const stripePromise = loadStripe("pk_test_51R4xmxBBt2acnoHhgye3h5SGf0p55BQobsNpkLs1gOETBmpEBjHGyz4PbWwynNmpAhnugS0RKBq5rk35ZjSIRvah00fcvZz51Q");


function Checkout() {
  const {id} = useParams()  //booking id
  const token = localStorage.getItem("token")

  
  const fetchClientSecret  = useCallback(async ()=> {
    const res = await actionCheckOut(token ,id)
    return res.data.clientSecret
  
  })
  
  const options = { fetchClientSecret }
    return (
      <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
    )
}

export default Checkout