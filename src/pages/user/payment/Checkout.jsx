import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { actionCheckOut } from "../../../api/payment";
import { useParams } from "react-router";

const stripePromise = loadStripe(
  "pk_test_51R4xmxBBt2acnoHhgye3h5SGf0p55BQobsNpkLs1gOETBmpEBjHGyz4PbWwynNmpAhnugS0RKBq5rk35ZjSIRvah00fcvZz51Q"
);

function Checkout() {
  const { id } = useParams(); //booking id
  const token = localStorage.getItem("token");

  const fetchClientSecret = useCallback(async () => {
    const res = await actionCheckOut(token, id);
    return res.data.clientSecret;
  });

  const options = { fetchClientSecret };
  return (
    <div className="bg-cyan-600 h-screen flex flex-col items-center justify-center w-full">
      <div className="p-10 rounded-md bg-white">
        <div className="text-cyan-600 text-2xl font-semibold mb-5">PAYMENT</div>
        <div id="checkout">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
