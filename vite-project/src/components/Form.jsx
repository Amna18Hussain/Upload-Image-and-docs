import React, { useState } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    

const handleSubmit  =  async(e) =>{
    e.preventDefault();

   const userData = {
   id: uuidv4(),
    email: email,
    password: password
   };


   try{

    const response = await axios.post('http://localhost:5000/user', userData);
    console.log("UserData", response.data);

    setEmail('');
    setPassword('')
    
   }  catch (error) {
    console.error("Error adding users", error);
    

   }
    
}


const handleButton = () =>{
    console.log("button clicked");
    
}



  return (
   <>
   <h1>Login Form </h1>

   <form onSubmit={handleSubmit}>
    <input type="email" placeholder='Enter Email'
    value={email}
    onChange= {(e) =>  setEmail(e.target.value)} /> 
    <br />

    <input type="password" 
    placeholder='Enter password'
    value={password}
    onChange= {(e) => setPassword (e.target.value) }/>

<button onClick={handleButton} type='submit'>submit</button>


   </form>

   


   
   
   </>
  )
}

export default Form