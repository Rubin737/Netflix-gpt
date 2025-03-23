import { checkValidate } from '@/utils/checkValidate';
import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Eye, EyeOffIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/utils/Slices/userslice';


const SignUp = () => {
 
  const [signIn,setSignIn] = useState(true);
  const[errorMsg,setErrorMessage] = useState('')  
  const mail = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [forgetPassword,setForgetPassword] = useState('')
  const[validate,setValidate] = useState({name:'',mail:'',password:''});
  const [showPassword,setShowPassword] = useState(false);
  const dispatch = useDispatch();  
  
  const user = useSelector((store)=>store.user);
  // console.log(user)
  

  const handleSignUpButton = ()=>{
    setSignIn(!signIn);
    setValidate({name:'',mail:'',password:''})
    mail.current.value=''
    password.current.value=''
    name.current.value=''
    setErrorMessage('');
    setForgetPassword('')
  }

  const handleErrors = (errorCode) => {
    if (errorCode === "auth/invalid-credential") {
      setErrorMessage("Invalid Username and Password");
    } else if (errorCode === "auth/too-many-requests") {
      setForgetPassword("Forget password?");
      setErrorMessage("");
    } else if (errorCode === "auth/email-already-in-use") {
      setErrorMessage("Email already in use, please sign in");
    } else {
      setErrorMessage("");
    }
  };

  const handlePasswordVisibility=()=>{
        setShowPassword(!showPassword)
  }
  
  const handleValidation = ()=>{
  
    const nameRef = name?.current?.value || ""; 
    const emailRef = mail.current.value;
    const passwordRef = password.current.value;
     
    const status = checkValidate(nameRef,emailRef,passwordRef);
    setValidate(status)
       
    if(signIn){
      
      createUserWithEmailAndPassword(auth,emailRef,passwordRef)
      .then((userCredential) => {
        
        const user = userCredential.user

        updateProfile(user, {
          displayName: nameRef, photoURL: "https://cdn-icons-png.flaticon.com/128/2173/2173478.png"
        }).then(() => {
         console.log(auth.currentUser)
         const{displayName,email,photoURL} = auth.currentUser
         dispatch(addUser({displayName:displayName,email:email,photoURL:photoURL}))
         
        }).catch((error) => {
          // An error occurred
          // ...
        });
        
      })
      .catch((error) => {
        const errorCode = error.code;
        handleErrors(errorCode)
      });

    }
        
    else{
      signInWithEmailAndPassword(auth, emailRef, passwordRef)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        handleErrors(errorCode)
       
         
      });
    }    
            
  }

  return (
    <section className='signin-image hero-container '>
        <form className=' flex flex-col relative z-[50] gap-y-2 justify-center bg-black opacity-70 px-16 rounded-xl py-10'>
        <h1 className='text-red-500 font-bold text-3xl'>{signIn?'Sign Up':'Sign In'}</h1>
          
          {
            signIn === true &&<>
              <p className='signup-p'>Enter your name</p>
              <input ref={name} className='signup-input' type="text" placeholder='Your name' />
              <p className='signup-error'>{validate.name}</p>
            </>
          }
          
          <p className='signup-p'>Enter your email</p>
          <input ref={mail} autoComplete='username' className='signup-input' type="email" placeholder='Your email' />
          <p className='signup-error'>{validate.mail}</p>
          

          <p className='signup-p relative z-[50]'>Enter your password</p>
          <div className='flex items-center relative'>
            <input  ref={password} autoComplete='current-password' className=' bg-white signup-input w-full' type={`${showPassword?'text':'password'}`} placeholder=' Your password' />
            <Eye  className={`eye-icon ${showPassword?'block':'hidden'}`}
              onClick={()=>handlePasswordVisibility()}
            />
            <EyeOffIcon  className={`eye-icon ${showPassword?'hidden':'block'}`}
              onClick={()=>handlePasswordVisibility()}
            />
          </div> 
          <p className='signup-error'>{validate.password}</p>
          <p className='signup-error'>{errorMsg}</p>
          <p className='signup-error cursor-pointer  underline decoration-2 decoration-white'>{forgetPassword}</p>

          <button onClick={(event)=>{
            event.preventDefault()
            handleValidation()
          }}
           className='bg-red-500 px-5 text-white font-poppins py-3  rounded-md trans font-bold transition duration-300 hover:scale-105 hover:bg-red-800 cursor-pointer '>{signIn?'Sign Up':'Sign In'}</button>
          <p className='text-white text-lg'>{signIn?'Have an account?.':'New user?.'} <strong className='cursor-pointer hover:underline'

            onClick={()=>{
              handleSignUpButton();
            }}
          
          >{signIn?'Please Sign in':'please Register'}</strong></p>
          
        </form>
        
        
    </section>
  )
}

export default SignUp