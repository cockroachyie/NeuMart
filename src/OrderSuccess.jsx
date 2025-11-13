import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess(){
  const nav = useNavigate();

  return(
    <div className="logwrap">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your order is now processing.</p>

      <button onClick={()=>nav("/customer/dashboard")}>
        View Orders
      </button>

      <button onClick={()=>nav("/")}>
        Back to Home
      </button>
    </div>
  );
}
