import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CustomerSignup(){
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[address,setAddress]=useState("");
  const[pass,setPass]=useState("");

  const nav = useNavigate();

  const submit=(e)=>{
    e.preventDefault();

    fetch("http://localhost:4000/customer/signup",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,email,phone,address,password:pass})
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.ok){
  alert("Account created! Please login now.");

  // Restore redirect
  let redirect = localStorage.getItem("redirect_after_login");
  if(!redirect){
    localStorage.setItem("redirect_after_login", "/checkout");
  }

  nav("/login/customer");
}

    });
  };

  return(
    <div className="logwrap">
      <h2>Customer Signup</h2>

      <form className="logform" onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input placeholder="Phone Number" value={phone} onChange={e=>setPhone(e.target.value)}/>
        <input placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)}/>
        <input placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
