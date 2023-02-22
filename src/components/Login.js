import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: ""}) 
   
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email , password:credentials.password})
      
        }
        )
        const json = await response.json()
        console.log(json);
        if(json.isSuccess){
           

            //save the token and redirect the user
            localStorage.setItem('token', json.authtoken);


            props.showAlert("logged in successfully","success")
            navigate('/')
            props.showEmail(credentials.email)

        }
        else{
            
            props.showAlert("please enter correct credentials","danger")
        }
    
    }
   
    const onChange = (e)=>{
     setCredentials({...credentials,[e.target.name]:e.target.value})
    }
   
    const handleLable =()=>{
        navigate("/signup")
    }

  return (
    <div>
        <div className='my-3'>
        <center><h2>Login</h2></center>
        </div>

      
         <form  onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
    </div>

    <button type="submit" style={{background: "#045a68",color:"white"}} className="btn btn-light">Login</button>
    <label  style={{margin: "10px"}} onClick={handleLable} htmlFor="extratext">Create new Account</label>
</form></div>
  )
}

export default Login