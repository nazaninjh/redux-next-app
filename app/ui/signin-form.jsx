'use client'

import { useContext, useEffect, useReducer, useRef, useState } from "react"
import style from './../page.module.css';
import { selectAllUsers, useGetAllUsersQuery } from "./../../lib/features/users/usersSlice";
import AuthContext from "./../../context/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!%$#]).{8,24}$/;
const NAME_REG = /^[a-zA-Z][^0-9]{4,13}$/;

export default function CreateSigninForm() {
  // note
  // try using formData / server actions instead of state
  const { setAuth, Auth } = useContext(AuthContext);
  const router = useRouter();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState(null);
  const { data } = useGetAllUsersQuery();

  const users = useSelector(state => selectAllUsers(state));
  const userAction = (userState, action) => {
    switch (action.type) {
        case 'user-name':
            return {
                ...userState,
                userName: action.value
            }
            
        case 'user-valid':
            return {
                ...userState,
                userNameValid: action.value
            }
        case 'user-focus':
            return {
                ...userState,
                userNameFocus: action.value
            }   
        default: 
        return {
            ...userState,
        }
    }
  };

  const pwdAction = (pwdState, action) => {
    switch (action.type) {
        case 'pwd':
            return {
                ...pwdState,
                pwd: action.value
            }
        case 'pwd-valid':
            return {
                ...pwdState,
                pwdValid: action.value
            }
        
        
        case 'pwd-focus':
            return {
                ...pwdState,
                pwdFocus: action.value
            }
            default: 
            return {
                ...pwdState,
            }
    }
             
  };



  const [userState, userDispatch] = useReducer(userAction, {
    userName: '',
    userNameValid: false,
    userNameFocus: false
  });
  
  const [pwdState, pwdDispatch] = useReducer(pwdAction, {
    pwd: '',
    pwdValid: false,
    pwdFocus: false
  });
  
  useEffect(() => {
    if (userRef.current) {
        userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    userDispatch({
        type: 'user-valid',
        value: NAME_REG.test(userState.userName)
    })
    
  }, [userState.userName])
  
  
  useEffect(() => {
    
    pwdDispatch({
        type: 'pwd-valid',
        value: PWD_REG.test(pwdState.pwd)
    })
     
  }, [pwdState.pwd])
  

  const validateSignin = () => {
        for (let user of users) {
            let userName = user.username.toLowerCase();
            let stateUserName = userState.userName.toLowerCase();
            console.log(userName);
            if (userName === stateUserName) {
                
                if (user.password === pwdState.pwd) {
                        setErrMsg(false);
                        break;
                } else {
                         setErrMsg('Password Incorrect!');
                     }
                     return;
                } else if (userName !== stateUserName) {
                     if (user.password !== pwdState.pwd) {
                         setErrMsg('User does not exists!');
                     } else {
                         setErrMsg(false);
                        break;
                     }
                 }
        }
  };

    
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   validateSignin();
   if (!errMsg) {
        userDispatch({
            type: 'user-name',
            value: ''
        });
        pwdDispatch({
            type: 'pwd',
            value: ''
        });
        setAuth({user: userState.userName.toLowerCase()});
        setErrMsg(null)
    }
  
 };
 useEffect(() => {
    if (Auth.user) {
        router.push('/dashboard')
      }
 }, [Auth, router])
 
  return (
    <section>
        <p>
            {errMsg}
        </p>
    
    <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="userName">Username: </label>
        <input type="text"
         ref={userRef}
         value={userState.userName}
         onChange={e => userDispatch({
            type: 'user-name',
            value: e.target.value
         })}
         onFocus={e => userDispatch({
            type: 'user-focus',
            value: true
         })}
         onBlur={e => userDispatch({
            type: 'user-focus',
            value: false
         })}
         id="userName"
         placeholder="exp: John" />
        
         <label htmlFor="pwd">Password: </label>
         <input type="password"
         value={pwdState.pwd}
         onChange={e => pwdDispatch({
            type: 'pwd',
            value: e.target.value
         })}
         onFocus={e => pwdDispatch({
            type: 'pwd-focus',
            value: true
         })}
         onBlur={e => pwdDispatch({
            type: 'pwd-focus',
            value: false
         })}
         id="pwd"/>
         <button>Sign in</button>
         <div>Don't have an account? <Link href='signup'>Register</Link></div>
         </form>
    </section>
    
    
  )
}
