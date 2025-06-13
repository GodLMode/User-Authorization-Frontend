import { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom';


export default function Signup() {
  const [formData,setFormData]= useState({});
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id]:e.target.value.trim()});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
        console.log('Please fill out all fields')
        return;
    }
    try {
      const res = await fetch('/api/v1/users/register',{
        method: 'POST',
        headers :{'Content-Type' : 'application/json'},
        body:JSON.stringify(formData),
      });

      const data= await res.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }
      if(res.ok){
        navigate('/login');
      }
    } catch (error) {
        console.log('error in submit in signup',error.message);
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
            <label>fullName</label>
            <input type='text' placeholder='your username' onChange={handleChange} id='fullName'/>
        </div>
        <div>
            <label>username</label>
            <input type='text' placeholder='your username' onChange={handleChange} id='username'/>
        </div>
        <div>
            <label>password</label>
            <input type='text' placeholder='password' onChange={handleChange} id='password'/>
        </div>
        <div>
           <button type='submit' onClick={handleSubmit}>Submit</button>
        </div>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account ?</span>
          <Link to ='/login' className='text-blue-500'>
            Sign In
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
``