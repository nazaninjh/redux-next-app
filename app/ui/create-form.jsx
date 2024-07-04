'use client'

import { useContext, useEffect, useReducer, useRef, useState } from "react"
import style from './../page.module.css';
import { useAddNewUserMutation, selectAllUsers, useGetAllUsersQuery } from "./../../lib/features/users/usersSlice";

import AuthContext from "./../../context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
const EMAIL_REG = /^[a-zA-Z](?=.*@).{13,24}$/
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!%$#]).{8,24}$/;
const NAME_REG = /^[a-zA-Z][^0-9]{4,13}$/;

export default function CreateForm() {
  const { setAuth, Auth } = useContext(AuthContext);
  const router = useRouter();
  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState(null);
  const [isOk, setIsOk] = useState(false);
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

  const pwdmatchAction = (pwdmatchState, action) => {
    switch (action.type) {
        case 'pwdmatch':
            return {
                ...pwdmatchState,
                pwdmatch: action.value
            }
        case 'pwdmatch-valid':
            return {
                ...pwdmatchState,
                pwdmatchValid: action.value
            }
        
        
        case 'pwdmatch-focus':
            return {
                ...pwdmatchState,
                pwdmatchFocus: action.value
            }
            default: 
            return {
                ...pwdmatchState,
            }
    }      
  } ;

  const emailAction = (emailState, action) => {
    switch (action.type) {
        case 'email':
            return {
                ...emailState,
                email: action.value
            }
        case 'email-valid':
            return {
                ...emailState,
                emailValid: action.value
            }
        
        
        case 'email-focus':
            return {
                ...emailState,
                emailFocus: action.value
            }
            default: 
            return {
                ...emailState,
            }
    }
      
            
  } 

  const [userState, userDispatch] = useReducer(userAction, {
    userName: '',
    userNameValid: false,
    userNameFocus: false
  });
  const [emailState, emailDispatch] = useReducer(emailAction, {
    email: '',
    emailValid: false,
    emailFocus: false
  });
  const [pwdState, pwdDispatch] = useReducer(pwdAction, {
    pwd: '',
    pwdValid: false,
    pwdFocus: false
  });
  const [pwdmatchState, pwdmatchDispatch] = useReducer(pwdmatchAction, {
    pwdmatch: '',
    pwdmatchValid: false,
    pwdmatchFocus: false
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
    emailDispatch({
        type: 'email-valid',
        value: EMAIL_REG.test(emailState.email)
    })
   
  }, [emailState.email])
  useEffect(() => {
    
    pwdDispatch({
        type: 'pwd-valid',
        value: PWD_REG.test(pwdState.pwd)
    })
    const matched = pwdmatchState.pwdmatch === pwdState.pwd;
    pwdmatchDispatch({
        type: 'pwdmatch-valid',
        value: matched
    })
    
    
  }, [pwdState.pwd, pwdmatchState.pwdmatch])
  

  const validateSignup = async () => {
    await data;
        users.map(user => {
            if (user.name === userState.userName && user.email === emailState.email
            ) {
                setIsOk(false);
                setErrMsg('User name and email Already in use!')
            } else if (user.email === emailState.email) {
                setIsOk(false);
                setErrMsg('Email already in use!')
            } else if (user.name === userState.userName) {
                setIsOk(false);
                setErrMsg('Name already in use!')
            } else if (user.name !== userState.userName && user.email !== emailState.email) {
                setIsOk(true);
                setErrMsg(null);
            }
        })   
  };

    
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await users;
   await validateSignup();

   try {
    if (!errMsg && isOk) {
        await addNewUser({
            name: userState.userName,
            email: emailState.email,
            password: pwdState.pwd
        }).unwrap();
    }
   } catch (err) {
    console.log(err)
   }
   if (!errMsg && isOk) {
    userDispatch({
        type: 'user-name',
        value: ''
    });
    pwdDispatch({
        type: 'pwd',
        value: ''
    });
    pwdmatchDispatch({
        type: 'pwdmatch',
        value: ''
    });
    emailDispatch({
        type: 'email',
        value: ''
    })
    
    setAuth({user: userState.userName});
 }
};
 useEffect(() => {
    if (Auth.user) {
        router.push('/dashboard')
      }
 }, [Auth, router]);
 
  return (
    <section>
        <p>
            {errMsg}
        </p>
    
    <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="userName">Name: </label>
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
         placeholder="exp: John"
         aria-describedby="userNote" />
         <div id="userNote" 
         className={
            (userState.userName &&
            userState.userNameFocus &&
            !userState.userNameValid) ? style.instructions :
            style.offScreen
         }>
            <p>Must be between 4 to 13 characters.</p>
            <p>Should not contain numbers.</p>
         </div>
         <label htmlFor="email">Email: </label>
         <input type="email"
         value={emailState.email}
         onChange={e => emailDispatch({
            type: 'email',
            value: e.target.value
         })}
         onFocus={e => emailDispatch({
            type: 'email-focus',
            value: true
         })}
         onBlur={e => emailDispatch({
            type: 'email-focus',
            value: false
         })}
         id="email"
         placeholder="exp: John.doe@gmail.com"
         aria-describedby="emailNote" />
         <div id="emailNote"
         className={
            (emailState.email &&
                emailState.emailFocus &&
                !emailState.emailValid) ? style.instructions :
                style.offScreen
         }>
            <p>Must be between 13 to 24 characters</p>
            <p>Email format must include an @ sign</p>
         </div>
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
         id="pwd"
         aria-describedby="pwdNote" />
         <div id="pwdNote"
         className={
            (pwdState.pwd &&
                pwdState.pwdFocus &&
                !pwdState.pwdValid) ? style.instructions :
                style.offScreen
         }>
            <p>Must be between 8 to 24 characters</p>
            <p>Must include at least a number, a lower case letter
                ,an upper case letter, and at least a character from the following list: 
            </p>
            <p>! % $ #</p>
         </div>
         <label htmlFor="pwdMatch">Confirm password: </label>
         <input type="password"
         value={pwdmatchState.pwdmatch}
         onChange={e => pwdmatchDispatch({
            type: 'pwdmatch',
            value: e.target.value
         })}
         onFocus={e => pwdmatchDispatch({
            type: 'pwdmatch-focus',
            value: true
         })}
         onBlur={e => pwdmatchDispatch({
            type: 'pwdmatch-focus',
            value: false
         })}
         id="pwdMatch"
         aria-describedby="pwdMatchNote" />
         <div id="pwdMatchNote"
         className={
            (pwdmatchState.pwdmatch &&
                pwdmatchState.pwdmatchFocus &&
                !pwdmatchState.pwdmatchValid) ? style.instructions :
                style.offScreen
         }>
            <p>Must match the previously provided password</p>
         </div>
         <button>Sign up</button>
         <div>Already have an account? <Link href='signin'>Sign in</Link></div>

    </form>
    </section>
    
    
  )
};
