import React,{useState,useEffect} from "react";

export default function SellerDashboard(){

  const [title,setTitle] = useState("");
  const [price,setPrice] = useState("");
  const [rate,setRate] = useState("");
  const [img,setImg] = useState("");

  const [orders,setOrders] = useState([]);

  // Load orders
  useEffect(()=>{
    fetch("http://localhost:4000/orders/all")
      .then(r=>r.json())
      .then(data=>setOrders(data));
  },[]);

  // Upload new product
  const uploadProduct = (e)=>{
    e.preventDefault();

    fetch("http://localhost:4000/product/add", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({title,price,rate,img})
    })
    .then(r=>r.json())
    .then(data=>{
      if(data.ok){
        alert("Product added successfully!");
        setTitle(""); setPrice(""); setRate(""); setImg("");
      }
    });
  };

  // Update delivery status
  const updateOrder = (id, status, eta)=>{
    fetch("http://localhost:4000/order/update",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id,status,eta})
    })
    .then(r=>r.json())
    .then(data=>{
      if(data.ok){
        alert("Order updated!");
        // Refresh orders
        fetch("http://localhost:4000/orders/all")
          .then(r=>r.json())
          .then(data=>setOrders(data));
      }
    });
  };

  return(
    <div className="logwrap">

      <h2>Seller Dashboard</h2>

      <button onClick={()=>window.location.href="/"}>⬅ Back to Home</button>

      {/* ------------------------- */}
      {/*   UPLOAD NEW PRODUCT     */}
      {/* ------------------------- */}
      <h3 style={{marginTop:"20px"}}>Add New Product</h3>

      <form className="logform" onSubmit={uploadProduct}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)}/>
        <input placeholder="Rating" value={rate} onChange={e=>setRate(e.target.value)}/>
        <input placeholder="Image URL" value={img} onChange={e=>setImg(e.target.value)}/>
        <button type="submit">Upload Product</button>
      </form>

      {/* ------------------------- */}
      {/*        VIEW ORDERS        */}
      {/* ------------------------- */}
      <h3 style={{marginTop:"40px"}}>Orders Received</h3>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(o=>(
          <div 
            key={o._id}
            style={{
              border:"1px solid #ccc",
              padding:"12px",
              marginTop:"10px",
              borderRadius:"6px",
              background:"#f7f7f7"
            }}
          >
            <div><b>Order ID:</b> {o._id}</div>
            <div><b>Customer:</b> {o.customerId}</div>
            <div><b>Address:</b> {o.address}</div>
            <div><b>Status:</b> {o.status}</div>
            <div><b>ETA:</b> {o.eta || "Not set"}</div>

            <h4 style={{marginTop:"10px"}}>Items:</h4>

            {o.items.map((it,i)=>(
              <div key={i} style={{marginLeft:"20px"}}>
                {it.title} — ₹{it.price} × {it.qty}
              </div>
            ))}

            {/* ETA Options */}
            <div style={{marginTop:"10px"}}>
  <button onClick={()=>updateOrder(o._id,"Processing","1 day")}>
    { "< 1 day" }
  </button>

  <button onClick={()=>updateOrder(o._id,"Shipped","2 days")}>
    { "> 1 day" }
  </button>

  <button onClick={()=>updateOrder(o._id,"Out for Delivery","Today")}>
    Out for Delivery
  </button>

  <button onClick={()=>updateOrder(o._id,"Delivered","Delivered")}>
    Delivered
  </button>
</div>


          </div>
        ))
      )}

    </div>
  );
}
