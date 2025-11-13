import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./app.css";

export default function SellerLogin(){

  const[user,setUser]=useState("");
  const[pass,setPass]=useState("");

  const nav=useNavigate();   // ⭐ THIS IS THE FIX

  const submit=(e)=>{
    e.preventDefault();

    fetch("http://localhost:4000/seller/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        username:user,
        password:pass
      })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.ok){
        nav("/seller/dashboard");   // ⭐ WORKS NOW
      }else{
        alert("Invalid Login");
      }
    });
  };

  return(
    <div className="logwrap">
      <h2>Seller Login</h2>

      <form className="logform" onSubmit={submit}>
        <input type="text" placeholder="Seller Username"
          value={user}
          onChange={e=>setUser(e.target.value)}
        />
        <input type="password" placeholder="Password"
          value={pass}
          onChange={e=>setPass(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
