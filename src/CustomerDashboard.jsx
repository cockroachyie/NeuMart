import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard(){

  const nav = useNavigate();

  const [customer,setCustomer] = useState(null);
  const [orders,setOrders] = useState([]);

  // Load logged-in customer + Load orders
  useEffect(()=>{
    const c = localStorage.getItem("customer");

    if(!c){
      // redirect to login
      localStorage.setItem("redirect_after_login", "/customer/dashboard");
      nav("/login/customer");
      return;
    }

    const parsed = JSON.parse(c);
    setCustomer(parsed);

    // fetch customer orders
    fetch(`http://localhost:4000/orders/${parsed._id}`)
      .then(r=>r.json())
      .then(data=>setOrders(data));
  },[]);

  if(!customer){
    return <p style={{padding:"20px"}}>Loading dashboard…</p>;
  }

  return(
    <div className="logwrap">
      <h2>Welcome, {customer.name}</h2>

      <button 
        onClick={()=>nav("/")}
        style={{marginBottom:"20px"}}
      >
        ⬅ Back to Home
      </button>

      <h3>Your Orders</h3>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map(o=>(
          <div 
            key={o._id} 
            style={{
              border:"1px solid #ccc",
              padding:"12px",
              marginBottom:"12px",
              borderRadius:"6px",
              background:"#f7f7f7"
            }}
          >
            <div><b>Order ID:</b> {o._id}</div>
            <div><b>Date:</b> {o.date}</div>
            <div><b>Status:</b> {o.status}</div>
            <div><b>ETA:</b> {o.eta || "Not updated yet"}</div>

            <h4 style={{marginTop:"10px"}}>Items:</h4>
            {o.items.map((it,i)=>(
              <div key={i} style={{marginLeft:"10px"}}>
                {it.title} — ₹{it.price} × {it.qty}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
