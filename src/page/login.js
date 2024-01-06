import { useEffect, useState } from "react";
import {auth} from "../configs/firebaseConfig"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [phone,setPhone] = useState("+91")
    const navigate = useNavigate()
 

    // const captcha = () => {
    //   if (!window.recaptchaVerifier) {
    //     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    //       size: "invisible",
    //       callback: (response) => console.log(response),
    //       "expired-callback":()=>{}

    //     });
    //   }
    // };


    const captcha = () => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: (response) => console.log(response),
          "expired-callback": () => {
            console.log("Recaptcha expired. Refreshing...");
            // Add logic here to refresh the Recaptcha or provide user feedback.
          },
        });
      }
    }; 
    const sendOtp = async (e)=>{
      e.preventDefault();
      captcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        navigate("/home")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  }

    

    // const sendOtp = async (e) => {
    //   e.preventDefault();
    //   captcha()
    //   try {
    //     const sendingVarificationCodeToUserAndGettingConfirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
    //     window.confirmationResult = sendingVarificationCodeToUserAndGettingConfirmation;
    //     if(window.confirmationResult){

    //       navigate("/home");
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //     alert("Too many requests have been sent from this phone number. Try again after 24 hours.");
    //   // window.location.reload();
    //   }
    // };

    // const captcha = () => {
    //   if (!window.recaptchaVerifier) {
    //     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    //       size: "invisible",
    //       callback: (response) => console.log(response),
    //     });
    //   }
    // };
    // // const sendOtp = async (e) =>{
    // //   try {
    // //      const recaptchaVerifier = await new RecaptchaVerifier("recaptcha-container",{},auth);
    // //   } catch (error) {
    // //     console.log("sendOtp error" , error)
    // //   }
    // // }
    
    // const sendOtp = async(e)=>{
    //   e.preventDefault();
    //   captcha();
    //   try {
    //     const sendingVarificationCodeToUserAndGettingConfirmation = await signInWithPhoneNumber(auth,phone,window.recaptchaVerifier)
    //    window.confirmationResult = sendingVarificationCodeToUserAndGettingConfirmation;
    //    navigate("/verify")
    //   } catch (error) {
    //     console.log(error.message)
    //     alert("too many request has been send from this phone number. try after 24 hours")
    //   }
    // }






    const formReset = ()=>{
        setPhone("+91")
    }

    return (
      <>
        <h1>welcome</h1>
        <form onReset={formReset}   onSubmit={sendOtp}>
            <h2>enter your phone number</h2>
            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <div id="recaptcha-container"></div>
            <button type="submit" >Login</button>
            <button type="reset">Reset</button>
        </form>
      </>
    );
  }