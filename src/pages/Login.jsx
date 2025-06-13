import { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom';

export default function SignIn() {
  const [formData,setFormData]= useState({});
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id]:e.target.value.trim()});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
        console.log('Please fill all the required fields');
        return; 
    }
    try {  
      const res = await fetch('/api/v1/users/login',{
        method: 'POST',
        headers :{'Content-Type' : 'application/json'},
        body:JSON.stringify(formData),
      });
      const data= await res.json();
      if(data.success === false){
        console.log("Error in logging user");
        return ;
      }
      if(res.ok){
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  return (
    <div className='min-h-screeen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>  
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <label>Email</label> 
            <input type='text' placeholder='xyz@gmail.com' onChange={handleChange} id='email'/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder='password' onChange={handleChange} id='password'/>
          </div>
          <button type='submit' onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Don't have an account ?</span>
          <Link to ='/register' className='text-blue-500'>
            Sign Up
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
