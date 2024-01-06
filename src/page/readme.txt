  firebase steps 


  1:npm install firebase
  2:firebaseConfig.js
  




  login.js

  import { useState } from "react";
import {auth} from "../configs/firebaseConfig"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [phone,setPhone] = useState("+91")
    const navigate = useNavigate()
    console.log(phone)
    // console.log(auth.currentUser)


const captcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
       size: "invisible",
       callback: (response) => console.log(response),
    });
 };

    const formSubmit = async (e) =>{
        e.preventDefault();
        captcha();
        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            window.confirmationResult = confirmationResult;
            navigate("/verify");
         } catch (error) {
            console.log("Error during form submission", error);
            window.location.reload();
         }

        // try{
        //     const appVerifier = window.recaptchaVerifier;
        //     signInWithPhoneNumber(auth,phone,appVerifier)
        //     .then((confirmationResult)=> {
        //         window.confirmationResult = confirmationResult
        //         navigate('/verify')
    
        //     }).catch((error)=>{
        //         console.log(error)
        //     })
        // }
        // catch(error){
        //     console.log("error during form submission" ,error)
        // }
 
    }
    
    

    const formReset = ()=>{
        setPhone("+91")
    }

    return (
      <>
        <h1>welcome</h1>
        <form onReset={formReset}   onSubmit={formSubmit}>
            <h2>enter your phone number</h2>
            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <div id="recaptcha-container"></div>
            <button type="submit" >Login</button>
            <button type="reset">Reset</button>
        </form>
      </>
    );
  }



  //verify.js 

      // const verfifyOtp = (e)=>{
    //     e.preventDefault();
    //     const confirmationResult = window.confirmationResult

    //     if(confirmationResult){
    //         confirmationResult.confirm(otp).then(result=>{
    //             //userSigned Successfully
    //             // const user = result.user;
    //             // console.log(user)
    //             navigate("/home")
    //         }).catch(error=>{
    //             console.log("error while confirming otp",error)
    //         })
    //     }
    //     else{
    //         console.log("confirmation result is undefined")
    //     }


    // }




       const verfifyOtp = async (e) => {
        e.preventDefault();
        const confirmationResult = window.confirmationResult;
      
        if (confirmationResult) {
          try {
            const result = await confirmationResult.confirm(otp);
            // User signed in successfully
            // const user = result.user;
            // console.log(user)
            navigate("/home");
          } catch (error) {
            console.error("Error while confirming OTP:", error);
            // Handle the error, you can display an error message or take appropriate actions
          }
        } else {
          console.log("Confirmation result is undefined");
        }
      };










      /verify.js


      import React, { useState } from "react";
import OtpInput from 'react-otp-input'
import { useNavigate } from "react-router-dom";

export default function Verify(){
 const [otp,setOtp] = useState("")
 const navigate = useNavigate();

//  const verifyOtp = async () => {
//   const confirmationResult = window.confirmationResult;

//   confirmationResult.confirm(otp).then((result) => {
//     // User signed in successfully.
//     const user = result.user;
//     console.log(user)
//     navigate("/home")
//   }).catch((error) => {
//     // User couldn't sign in (bad verification code?)
//     // ...
//   });
// };


const verifyOtp = async () => {
  console.log("working")
  const confirmationResult = window.confirmationResult;
  console.log(confirmationResult)

  try{
      const result = await confirmationResult.confirm(otp);

        navigate("/home");
  }
  catch(error){
    alert("error occured while verifying otp" ,error)
  }

  // try {
  //   await Promise.race([
  //     confirmationResult.confirm(otp),
  //     new Promise((_, reject) => setTimeout(() => reject(new Error('Verification timeout')), 100000)) // Set a timeout of 10 seconds
  //   ]);

  //   // User signed in successfully.
  // } catch (error) {
  //   // Handle errors, including timeout
  //   console.error(error);
  //   alert("error occured while verifying otp")
  // }
};
    
    return(
        <>        
<form onSubmit={verifyOtp}>
<h1>verify OTP</h1>
<p className="message">We have sent a verification code to your mobile number</p>
<input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
{/* <OtpInput
value={otp}
onChange={setOtp}
numInputs={6}
renderSeparator={<span>-</span>}
renderInput={(props) => <input {...props} />}
/> */}
<button type="submit">verfify Otp</button>
</form>


        </>

    )
}