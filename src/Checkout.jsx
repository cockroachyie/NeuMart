import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout(){

  const nav = useNavigate();

  // All hooks MUST be declared unconditionally
  const [customer,setCustomer] = useState(null);

  const [savedAddress,setSavedAddress] = useState("");
  const [newAddress,setNewAddress] = useState("");
  const [addressOption,setAddressOption] = useState("saved");
  const [payment,setPayment] = useState("cod");

  // Load customer 
  useEffect(()=>{
    const c = localStorage.getItem("customer");

    if(!c){
      localStorage.setItem("redirect_after_login", "/checkout");
      nav("/login/customer");
      return;
    }

    const parsed = JSON.parse(c);
    setCustomer(parsed);
    setSavedAddress(parsed.address);
  },[]);

  // While customer info is loading
  if(customer===null){
    return <p style={{padding:"20px"}}>Loading checkout…</p>;
  }

  const placeOrder = ()=>{

    const finalAddress =
      addressOption==="saved" ? savedAddress : newAddress;

    if(finalAddress.trim()===""){
      alert("Address cannot be empty");
      return;
    }

    fetch("http://localhost:4000/order/place",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        customerId:customer._id,
        items: JSON.parse(localStorage.getItem("cart") || "[]"),
        address: finalAddress,
        payment,
        status:"Processing",
        date: new Date().toLocaleDateString()
      })
    })
    .then(r=>r.json())
    .then(data=>{
      if(data.ok){
        localStorage.removeItem("cart");
        nav("/order/success");
      }else{
        alert("Order failed");
      }
    });
  };

  return(
    <div className="logwrap">
      <h2>Checkout</h2>

      <button onClick={()=>nav("/")}>⬅ Back to Home</button>

      <h3 style={{marginTop:"20px"}}>Delivery Address</h3>

      <label>
        <input 
          type="radio"
          checked={addressOption==="saved"}
          onChange={()=>setAddressOption("saved")}
        />
        Use Saved Address
      </label>

      <div style={{marginLeft:"30px",marginBottom:"10px"}}>
        {savedAddress}
      </div>

      <label>
        <input 
          type="radio"
          checked={addressOption==="new"}
          onChange={()=>setAddressOption("new")}
        />
        Enter New Address
      </label>

      {addressOption==="new" && (
        <textarea 
          placeholder="Enter new delivery address"
          value={newAddress}
          onChange={e=>setNewAddress(e.target.value)}
          style={{display:"block",width:"300px",height:"80px",marginTop:"10px"}}
        ></textarea>
      )}

      <h3 style={{marginTop:"20px"}}>Payment Method</h3>

      <label>
        <input 
          type="radio"
          checked={payment==="cod"}
          onChange={()=>setPayment("cod")}
        />
        Cash on Delivery
      </label><br/>

      <label>
        <input 
          type="radio"
          checked={payment==="card"}
          onChange={()=>setPayment("card")}
        />
        Pay by Card on Delivery
      </label>

      <button 
        style={{marginTop:"20px"}} 
        onClick={placeOrder}
      >
        Place Order
      </button>

    </div>
  );
}
