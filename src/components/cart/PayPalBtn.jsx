import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalBtn = ({ amount, onSuccess, onError }) => {
 const ppOptions = {
  "client-id": import.meta.env.VITE_PP_CLIENT_ID,
 };

 return (
  <PayPalScriptProvider options={ppOptions}>
   <PayPalButtons
    style={{ layout: "vertical" }}
    createOrder={(data, actions) => {
     return actions.order.create({
      purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } }],
     });
    }}
    onApprove={(data, actions) => {
     return actions.order.capture().then(onSuccess);
    }}
    onError={onError}
   />
  </PayPalScriptProvider>
 );
};

export default PayPalBtn;
