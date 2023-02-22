import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function Signup(props) {

    const [credentials, setCredentials] = useState({name:"",  email: "", password: ""}) 
   
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser/",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email , password:credentials.password})
        
        }
        )
        const json = await response.json()
        console.log(json);
        if(json.isSuccess){
            //save the token and redirect the user
            localStorage.setItem('token', json.authtoken);
            navigate('/')
            props.showAlert("Account created succesfully","success")
            props.showEmail(credentials.email)
        }
        else{
          props.showAlert("please enter correct details","danger")
        }
    }
   
    const onChange = (e)=>{
     setCredentials({...credentials,[e.target.name]:e.target.value})
    }






  return (
    <div>
      <div className='my-4'>
        <center><h2>Sign up</h2></center>
      </div>
     <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" name='name' class="form-control" id="name" onChange={onChange} value={credentials.name} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email </label>
    <input type="email" name="email" class="form-control" id="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" name='password' minLength={5} class="form-control" onChange={onChange} value={credentials.password} id="password"/>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Confirm Password</label>
    <input type="password" name='cpassword' minLength={5} class="form-control" onChange={onChange} value={credentials.cpassword} id="cpassword"/>
  </div>
  
  <button type="submit"style={{background: "#045a68",color:"white"}} class="btn btn-light">Sign up</button>
</form>
    </div>
  )
}

export default Signup