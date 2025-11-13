import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerLogin(){

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const nav = useNavigate();

  const submit = (e)=>{
    e.preventDefault();

    fetch("http://localhost:4000/customer/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    })
    .then(res=>res.json())
    .then(data=>{

      // ❌ Wrong login
      if(!data.ok){
        alert("Invalid email or password. Please sign up.");
        // Save redirect so after sign up → login → checkout continues
        const redirect = localStorage.getItem("redirect_after_login") || "/checkout";
        localStorage.setItem("redirect_after_login", redirect);

        return nav("/signup/customer");
      }

      // ✅ Valid login
      localStorage.setItem("customer", JSON.stringify(data.customer));

      // Check if user must return to checkout
      let redirect = localStorage.getItem("redirect_after_login");

if(redirect && redirect !== "none"){
  localStorage.removeItem("redirect_after_login");
  return nav(redirect);
}

// Default: after login, go to dashboard
nav("/customer/dashboard");

    });
  };

  return(
    <div className="logwrap">
      <h2>Customer Login</h2>

      <form className="logform" onSubmit={submit}>
        <input 
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>

      <button onClick={()=>{
        localStorage.setItem("redirect_after_login", "/checkout");
        nav("/signup/customer");
      }}>
        Create New Account
      </button>
    </div>
  );
}
