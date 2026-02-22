import { useEffect, useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
function Login({ setCurrentUser,setFlash}) {
   const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    console.log(res);
    if (res.success){
      setCurrentUser(res.user);
      setFlash({
        type:"success",
        message:res.message

      })
      navigate("/");
    }
    else{
   setFlash({
        type:"danger",
        message:res.message
      })
    }
  };

  return (
    <div className="row offset-2">
        <h2>Sign In to Wanderlust</h2>
        <div className="col-8">
<form onSubmit={handleSubmit} className="container mt-5">
      <input className="form-control mb-2 mt-5"
        placeholder="Username"
        onChange={e => setForm({...form, username: e.target.value})}
      />
      <input className="form-control mb-2 mt-3"
        type="password"
        placeholder="Password" 
        onChange={e => setForm({...form, password: e.target.value})}
      />
      <button className="btn btn-dark">Login</button>
    </form>
        </div>
    
    </div>
  );
}
export default Login;