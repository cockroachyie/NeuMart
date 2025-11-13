import React,{useState,useEffect} from "react";
import "./app.css";

const sampleProducts=[
  {id:1,title:"Wireless Headphones",price:2999,rate:4.5,img:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495&width=400"},
  {id:2,title:"Smartphone",price:15999,rate:4.3,img:"https://s3b.cashify.in/gpro/uploads/2019/06/09115746/apple-iphone-6-front.jpg"},
  {id:3,title:"Gaming Mouse",price:1499,rate:4.6,img:"https://assets2.razerzone.com/images/pnx.assets/3210b66d0095f8cb3b97a0046f84a819/razer-basilisk-v3-pro-35k.webp"},
  {id:4,title:"Mechanical Keyboard",price:4999,rate:4.4,img:"https://m.media-amazon.com/images/I/810QvZdOonL._AC_UF1000,1000_QL80_.jpg"},
  {id:5,title:"Smartwatch",price:6999,rate:4.1,img:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s11-case-unselect-gallery-1-202509_GEO_EMEA_FMT_WHH?wid=752&hei=720&fmt=p-jpg&qlt=80&.v=WldDSmZlQ1ladGVha0lMWUJJK2M4ZHlVRllKam5abHNZRGludXlMbytKNFo2cm95TEtVUGNBN3pWWWMxUmxKSFh2WnVKTjEySjVmY2ZteE1GdEFoNWM2c3NSYUM4YjA0RTQxLytvRzE4M0QrWGp4amFCSTJ1K1hKMXRsMkNUYlhaOWRBWGt2OWI4clNTdjYwdnkxK0RR"},
  {id:6,title:"Bluetooth Speaker",price:2199,rate:4.2,img:"data:image/jpeg;base64,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"}
];

function ProductCard({p,onAdd}){
  return(
    <div className="card">
      <div className="imgwrap">
        <img src={p.img} alt={p.title}/>
      </div>
      <div className="cardbody">
        <h3 className="title">{p.title}</h3>
        <div className="meta">
          <span className="price">₹{p.price}</span>
          <span className="rating">★ {p.rate}</span>
        </div>
        <button className="btn" onClick={()=>onAdd(p)}>Add to cart</button>
      </div>
    </div>
  );
}

export default function Home(){

  const[products,setProducts]=useState(sampleProducts);
  const[cart,setCart]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/products")
      .then(res=>res.json())
      .then(data=>{
        setProducts([...sampleProducts, ...data]);
      });
  },[]);

  const getId=(p)=>p.id || p._id;

  const addToCart=(p)=>{
    const pid=getId(p);
    const idx=cart.findIndex(x=>getId(x)===pid);

    if(idx>-1){
      const c=[...cart];
      c[idx].qty++;
      setCart(c);
    }else{
      setCart([...cart,{...p,qty:1}]);
    }
  };

  const remFromCart=(id)=>{
    setCart(cart.filter(x=>getId(x)!==id));
  };

  const changeQty=(id,delta)=>{
    setCart(cart.map(x=>{
      if(getId(x)===id){
        return {...x,qty:Math.max(1,x.qty+delta)};
      }
      return x;
    }));
  };

  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);

  return(
    <div className="app">

      <header className="topbar">
        <div className="brand">NeuMart</div>

        <div className="navlogin">
  {localStorage.getItem("customer") ? (
    <>
      <a className="navbtn" href="/customer/dashboard">Profile</a>

      <button 
        className="logoutbtn"
        onClick={()=>{
          localStorage.removeItem("customer");
          window.location.href="/";
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <a className="navbtn" href="/login/customer">Customer Login</a>
      <a className="navbtn" href="/login/seller">Seller Login</a>
    </>
  )}
</div>



        <div className="search">
          <input placeholder="Search for products, brands and more"/>
          <button>Search</button>
        </div>

        <div className="cartbtn">
          Cart <span className="badge">{cart.length}</span>
        </div>
      </header>

      <main className="main">
        <section className="left">
          <div className="hero">
            <h1>Deals of the day</h1>
            <p>Stylish picks for you</p>
          </div>

          <div className="grid">
            {products.map(p=>(
              <ProductCard 
                key={p._id || p.id}
                p={p}
                onAdd={addToCart}
              />
            ))}
          </div>
        </section>

        <aside className="right">
          <div className="cartpane">
            <h2>Your cart</h2>

            {cart.length===0?(
              <p className="empty">Cart is empty</p>
            ):(
              <div className="items">

                {cart.map(i=>(
                  <div className="item" key={getId(i)}>
                    <img src={i.img} alt={i.title}/>
                    <div className="itinfo">
                      <div className="ititle">{i.title}</div>
                      <div className="iprice">
                        ₹{i.price} x {i.qty} = ₹{i.price*i.qty}
                      </div>
                      <div className="controls">
                        <button onClick={()=>changeQty(getId(i),-1)}>-</button>
                        <span>{i.qty}</span>
                        <button onClick={()=>changeQty(getId(i),1)}>+</button>
                        <button className="del" onClick={()=>remFromCart(getId(i))}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="summary">
                  <div>Total</div>
                  <div className="tt">₹{total}</div>
                </div>

                <button className="checkout" onClick={()=>{
  const cartData = JSON.stringify(cart);
  localStorage.setItem("cart", cartData);

  const customer = localStorage.getItem("customer");

  if(!customer){
    // Save redirect path
    localStorage.setItem("redirect_after_login", "/checkout");
    alert("Please login before checkout");
    window.location.href="/login/customer";
  }else{
    window.location.href="/checkout";
  }
}}>
  Proceed to checkout
</button>

              </div>
            )}
          </div>
        </aside>
      </main>

      <footer className="foot">
        © {new Date().getFullYear()} NeuMart - Vivyn, Mayank & Manoj
      </footer>

    </div>
  );
}
