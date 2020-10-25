import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import STRIPE_PUBLISHABLE from './constants/stripe';
toast.configure();
const CURRENCY = 'USD';

const onToken = (tour) => token => {
    const product = {
        name: tour.tour_name,
        price: tour.tour_cost*tour.amount,
        description: tour.description
    };
    console.log(product);
   fetch('http://localhost:8000/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({product, token})
        })
        .then(response => response.json())
        .then(
            (result) => {
                if(result === 'success'){
                    payTour(tour.booked_tour_id, tour.amount);
                } else {
                    toast("Something went wrong", { type: "error" });
                }
            },
            (error) => {
                toast("Something went wrong", { type: "error" });
    });
}

const payTour = (booked_tour_id, amount) => {
    const status = 'paid';
    fetch('http://localhost:3001/payTour', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({booked_tour_id, amount, status})
    })
    .then(response => response.json())
    .then(
        (result) => {
            if(result === 'success'){
                document.getElementById(booked_tour_id).remove();
                toast("Success! Check paid history to see details.", { type: "success" });
            } else {
                toast("Something went wrong", { type: "error" });
            }
        }
    );
}

const Checkout = ({ tour }) =>
  <StripeCheckout
     name={tour.tour_name}
     description={tour.description}
     amount={tour.tour_cost*tour.amount*100}
     token={onToken(tour)}
     currency={CURRENCY}
     stripeKey={STRIPE_PUBLISHABLE}
     zipCode
     email
     allowRememberMe
  />

export default Checkout;