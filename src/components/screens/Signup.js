import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import M from "materialize-css"

const Signup=()=> {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

  //Make a Network Request 
  const PostData=()=>{
    // eslint-disable-next-line
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid Email', classes: '#c62828 red darken-3'});
      return
    }
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name,
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.error){
        M.toast({html: data.error, classes: '#c62828 red lighten-1'})
      }else{
        M.toast({html: data.message, classes: '#c62828 green darken-1'})
          navigate('/signin');
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
   <div className='mycard'>
    <div className='card auth-card input-field'>
      <h2>Instagram</h2>
      <input 
      type='text'
      placeholder="name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

     <input 
      type='email'
      placeholder="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />

     <input 
      type='password'
      placeholder="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <button class="btn waves-effect waves-light #1976d2 blue darken-2" type="submit" name="action"
        onClick={()=>PostData()} >
      Submit</button>
      <h5>
        <Link to="/signin">Already Have an Account?</Link>
      </h5>

    </div>

   </div>
  )
}

export default Signup