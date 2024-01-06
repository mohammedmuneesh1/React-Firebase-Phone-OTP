import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Verify(){
const [otp,setOtp] = useState("")
const navigate = useNavigate();
console.log(otp)

// const verifyOtp=(e)=>{
//   e.preventDefault();
//    const confirmationResult = window.confirmationResult;
//    if(confirmationResult){

//     confirmationResult.confirm(otp).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       console.log(user)
//       navigate("/home")
//       // ...
//     }).catch((error) => {
//       // User couldn't sign in (bad verification code?)
//       // ...
//     });

//    }



// }

// const verifyOtp= async(e)=>{
//   e.preventDefault();
//    const confirmationResult = window.confirmationResult;
//    if(confirmationResult){
//     try{
//       await confirmationResult.confirm(otp)
//       navigate("/home")
//     }
//     catch(error){
//       console.log(error)
//       alert("error occured on verifyotp()")
//     }
//    }
// }

return(
  <>
  <form>
  <input type="text" value={otp} onChange={(e) =>setOtp(e.target.value)} />
  <br/>
  <input type="submit" value="Verify OTP" />
  </form>
  </>
)

}