
import { registerUser } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup({ setCurrentUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (res.success) setCurrentUser(res.user);
     navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
        <input className="form-control mb-2" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="form-control mb-2"
        placeholder="Username"
        onChange={e => setForm({...form, username: e.target.value})}
      />
      <input className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})}
      />
      <button className="btn btn-dark">Login</button>
    </form>
  );
}
export default Signup;