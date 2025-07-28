
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../data';
const SignIn = () => {
  const [otpinput,setOtpinput]=useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
   const [email,setEmail]=useState("");
   const [otp,setOtp]=useState("");
   const navigate=useNavigate();
  const handleOtp=async()=>{
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    alert("Please enter a valid email");
    return ;
  }
    const res=await fetch(`${API_URL}/auth/signin/send-otp`,{
      method:"POST",
      headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email})
    })
    if(res.ok){
      console.log(res.json());
      alert("otp is send sucessfully")
      setOtpinput(true);
    }
    else{
      alert("user not register")
    }
  }
  const handleSignIn=async()=>{
    const res=await fetch(`${API_URL}/auth/signin/verify-otp`,{
      method:"POST",
      headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email,otp })
    })
    const data = await res.json();
    if(res.ok){
      const userId = data?.user?._id;
      if (userId) {
        localStorage.setItem("userId", userId); 
      }
      setEmail("");
      setOtp("");
      alert("user login sucessfully")
      setOtpinput(false);
      navigate('/dashboard')
    }
    else{
      alert("invalid email otp or otp expired")
    }
  }
  return (
      <div className='flex justify-between bg-white h-screen'>
        <div className='flex flex-col w-full'>
        <Navbar/>
        <div className='mx-auto'>
           <div className="bg-white flex items-center justify-center">
      <div className="w-full lg:w-[527px]  bg-white shadow-lg rounded-[10px] p-4 md:mt-24">
          <div className="mb-8 text-center md:text-start">
            <h1 className="text-black  text-4xl font-bold">Sign in</h1>
            <p className="text-[#969696] text-lg">Sign up to enjoy the feature of HD</p>
          </div>
          <div className="space-y-6">
            <fieldset
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                position: 'relative',
                padding: '0 1rem',
              }}
            >
              <legend
                style={{
                  padding: '0 8px',
                  fontSize: '14px',
                  color: '#9A9A9A',
                }}
              >
                Email
              </legend>
              <input
                type="email"
                placeholder=""  className='py-[10px] w-full text-[16px]   rounded-[10px]'
                style={{
                  border: 'none',
                  outline: 'none',
                  borderRadius: '10px',
                }}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </fieldset>
            {otpinput && <>
            <input type='password' placeholder='OTP' className='w-full border-[1px] border-[#ccc] rounded-[10px] text-[16px] px-[8px] py-[14px]' onChange={(e)=>setOtp(e.target.value)}></input>
            <p className='underline text-[#367AFF] cursor-pointer' onClick={handleOtp}>Resend OTP</p>
            <label className='flex gap-2 items-center'>
            <input type='checkbox' className='w-[24px] h-[24px]' checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)}></input>
            Keep me loged in?
            </label>
            </>}
            
           {!otpinput ?(<button className="w-full mt-2 max-h-[54px] py-4 px-2 text-white bg-[#367AFF] rounded-[10px]"  onClick={handleOtp}>
              Get OTP
            </button>):
            (<button className={`w-full mt-2 max-h-[54px] py-4 px-2 text-white  rounded-[10px] ${keepLoggedIn ? 'bg-[#367AFF] hover:bg-[#2e66d1]' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!keepLoggedIn} onClick={handleSignIn}>
              Sign in
            </button>)}
          </div>

          <p className="text-[#6C6C6C] mt-4 text-lg text-center">
            Need an account?{' '}
            <span className="underline text-[#367AFF] cursor-pointer"><Link to={'/'}>Create one</Link></span>
          </p>
        </div>
      </div>
        </div>
        </div>
        <img src='/wallpaper.png' className='hidden md:block w-full h-full'/>
    </div>
  );
};

export default SignIn;
