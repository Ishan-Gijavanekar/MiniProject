import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Replace with your publishable key
const stripePromise = loadStripe("pk_test_51QfXrlBL4mcdWmSPpUPh874MuKha1WMkPic9OCDOGdkyhdpRQ1xUOylVC6lMPbllCXgjG75kvanlPLT92w506lH600vgK49N8O");

const CheckoutForm = ({price}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      const response = await fetch("http://localhost:5000/api/v1/orders/make-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: price }), // $10.00
      });

      const paymentIntent = await response.json();

      if (response.ok && paymentIntent.status) {
        setPaymentStatus("Payment succeeded!");
      } else {
        setErrorMessage(paymentIntent.error || "Payment failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
          Credit or debit card
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
            className="w-full"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          (!stripe || isProcessing) && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isProcessing ? "Processing…" : "Pay $10.00"}
      </button>
      {errorMessage && (
        <div className="mt-4 text-sm text-red-600" role="alert">
          {errorMessage}
        </div>
      )}
      {paymentStatus && (
        <div className="mt-4 text-sm text-green-600" role="alert">
          {paymentStatus}
        </div>
      )}
    </form>
  );
};

const StripePayment = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-6">
        Stripe Payment
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  </div>
);

export default StripePayment;
