'use client'

import { useContext, useEffect, useReducer, useRef, useState } from "react"
import style from './../page.module.css';
import { useAddNewUserMutation, selectAllUsers, useGetAllUsersQuery } from "./../../lib/features/users/usersSlice";

import AuthContext from "./../../context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { type } from "os";
const EMAIL_REG = /^[a-zA-Z](?=.*@).{13,24}$/
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!%$#]).{8,24}$/;
const NAME_REG = /^[a-zA-Z][^0-9]{3,20}$/;
const PHONE_REG = /[0-9]{10,15}/;
const ADDRESS_REG = /^[ a-zA-Z0-9]{3,18}$/;
export default function CreateForm() {
  // add username and address field
  const store = window.localStorage;
  const { setAuth, Auth } = useContext(AuthContext);
  const router = useRouter();
  const [addNewUser] = useAddNewUserMutation();
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
  };
  const phoneAction = (phoneState, action) => {
    switch (action.type) {
        case 'phone':
            return {
                ...phoneState,
                phone: action.value
            }
        case 'phone-valid':
            return {
                ...phoneState,
                phoneValid: action.value
            }
        
        
        case 'phone-focus':
            return {
                ...phoneState,
                phoneFocus: action.value
            }
            default: 
            return {
                ...phoneState,
            }
    }        
  };

  const fullNameAction = (fullNameState, action) => {
    switch (action.type) {
        case 'fullName':
            return {
                ...fullNameState,
                fullName: action.value
            }
        case 'fullName-valid':
            return {
                ...fullNameState,
                fullNameValid: action.value
            }
        
        
        case 'fullName-focus':
            return {
                ...fullNameState,
                fullNameFocus: action.value
            }
            default: 
            return {
                ...fullNameState,
            }
    }        
  };


  const addressAction = (addressState, action) => {
    switch (action.type) {
        case 'street':
            return {
                ...addressState,
                street: action.value
            }
        case 'street-valid':
            return {
                ...addressState,
                streetValid: action.value
            }
        
        
        case 'street-focus':
            return {
                ...addressState,
                streetFocus: action.value
            }
        
        case 'city':
            return {
                ...addressState,
                city: action.value
            }
        case 'city-valid':
            return {
                ...addressState,
                cityValid: action.value
            }
        
        
        case 'city-focus':
            return {
                ...addressState,
                cityFocus: action.value
            }
            default: 
            return {
                ...addressState,
            }
    }        
  };


  const [fullNameState, fullNameDispatch] = useReducer(fullNameAction, {
    fullName: '',
    fullNameValid: false,
    fullNameFocus: false
  });
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
  const [phoneState, phoneDispatch] = useReducer(phoneAction, {
    phone: '',
    phoneValid: false,
    phoneFocus: false
  });
  const [addressState, addressDispatch] = useReducer(addressAction, {
    street: '',
    streetValid: false,
    streetFocus: false,
    city: '',
    cityValid: false,
    cityFocus: false
    
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
   
  useEffect(() => {
    phoneDispatch({
        type: 'phone-valid',
        value: PHONE_REG.test(phoneState.phone)
    })
  }, [phoneState.phone]);

  useEffect(() => {
    addressDispatch({
        type: 'street-valid',
        value: ADDRESS_REG.test(addressState.street)
    })
  }, [addressState.street]);

  useEffect(() => {
    addressDispatch({
        type: 'city-valid',
        value: ADDRESS_REG.test(addressState.city)
    })
  }, [addressState.city]);

  useEffect(() => {
    fullNameDispatch({
        type: 'fullName-valid',
        value: NAME_REG.test(fullNameState.fullName)
    })
  }, [fullNameState.fullName])


  const validateSignup = async () => {
    await data;
        users.map(user => {
            if (user.name === userState.userName
                && user.email === emailState.email
                && user.phone === phoneState.phone
            ) {
                setIsOk(false);
                setErrMsg('User name, email and phone number Already in use!')
            } else if (user.email === emailState.email) {
                setIsOk(false);
                setErrMsg('Email already in use!')
            } else if (user.name === userState.userName) {
                setIsOk(false);
                setErrMsg('Name already in use!')
            } else if (user.phone === phoneState.phone) {
                setIsOk(false);
                setErrMsg('Phone number already in use!')
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
   // make it a string
   const idCount = users.length;
   try {
    if (!errMsg && isOk) {
        await addNewUser({
            id: (idCount + 1).toString(),
            name: fullNameState.fullName,
            username: userState.userName,
            email: emailState.email,
            password: pwdState.pwd,
            address: {
                street: addressState.street,
                city: addressState.city
            },
            phone: phoneState.phone,
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
    phoneDispatch({
        type: 'phone',
        value: ''
    })
    fullNameDispatch({
        type: 'fullName',
        value: ''
    })
    addressDispatch({
        type: 'street',
        value: ''
    }),
    addressDispatch({
        type: 'city',
        value: ''
    })
    setAuth({user: userState.userName});
 }
};
 useEffect(() => {
    if (store.getItem('user')) {
        router.push('/dashboard');
    } else if (!store.getItem('user') && Auth.user) {
        store.setItem('user', Auth.user);
        router.push('/dashboard');
    }
 }, [Auth, router]);
 
  return (
    <section>
        <p>
            {errMsg}
        </p>
    
    <form className={style.form} onSubmit={handleSubmit}>
        <fieldset>
            <legend>Personal Info</legend>
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
             placeholder="exp: John"
             aria-describedby="userNote" />
             <div id="userNote"
             className={
                (userState.userName &&
                userState.userNameFocus &&
                !userState.userNameValid) ? style.instructions :
                style.offScreen
             }>
                <p>Must be between 3 to 13 characters.</p>
                <p>Should not contain numbers.</p>
             </div>
            <label htmlFor="fullName">Fullname: </label>
            <input type="text"
             value={fullNameState.fullName}
             onChange={e => fullNameDispatch({
                type: 'fullName',
                value: e.target.value
             })}
             onFocus={e => fullNameDispatch({
                type: 'fullName-focus',
                value: true
             })}
             onBlur={e => fullNameDispatch({
                type: 'fullName-focus',
                value: false
             })}
             id="fullName"
             placeholder="exp: John Doe"
             aria-describedby="fullNameNote" />
             <div id="fullNameNote"
             className={
                (fullNameState.fullName &&
                fullNameState.fullNameFocus &&
                !fullNameState.fullNameValid) ? style.instructions :
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
             <label htmlFor="phone">Phone Number: </label>
             <input type="number"
             value={phoneState.phone}
             onChange={e => phoneDispatch({
                type: 'phone',
                value: e.target.value
             })}
             onFocus={e => phoneDispatch({
                type: 'phone-focus',
                value: true
             })}
             onBlur={e => phoneDispatch({
                type: 'phone-focus',
                value: false
             })}
             id="phone"
             placeholder="09154965411"
             aria-describedby="phoneNote" />
             <div id="phoneNote"
             className={
                (phoneState.phone &&
                    phoneState.phoneFocus &&
                    !phoneState.phoneValid) ? style.instructions :
                    style.offScreen
             }>
                <p>Must be between 10 to 15 characters</p>
             </div>
        </fieldset>

        <fieldset>
            <legend>Address</legend>
            <label htmlFor="city">City: </label>
            <input type="text"
             value={addressState.city}
             onChange={e => addressDispatch({
                type: 'city',
                value: e.target.value
             })}
             onFocus={e => addressDispatch({
                type: 'city-focus',
                value: true
             })}
             onBlur={e => addressDispatch({
                type: 'city-focus',
                value: false
             })}
             id="city"
             placeholder="exp: Tehran"
             aria-describedby="addressNote" />
             <div id="addressNote"
             className={
                (addressState.city &&
                addressState.cityFocus &&
                !addressState.cityValid) ? style.instructions :
                style.offScreen
             }>
                <p>Must be between 3 to 13 characters.</p>
                <p>Should not contain numbers.</p>
             </div>
            <label htmlFor="street">Street: </label>
            <input type="text"
             value={addressState.street}
             onChange={e => addressDispatch({
                type: 'street',
                value: e.target.value
             })}
             onFocus={e => addressDispatch({
                type: 'street-focus',
                value: true
             })}
             onBlur={e => addressDispatch({
                type: 'street-focus',
                value: false
             })}
             id="street"
             placeholder="exp: Enghelab"
             aria-describedby="addressNote" />
             <div id="addressNote"
             className={
                (addressState.street &&
                addressState.streetFocus &&
                !addressState.streetValid) ? style.instructions :
                style.offScreen
             }>
                <p>Must be between 3 to 13 characters.</p>
                <p>Should not contain numbers.</p>
             </div>
        </fieldset>

         <fieldset>
            <legend>Authentication</legend>
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
         </fieldset>
         <button className={style.submitBtn}>Sign up</button>
         <div>Already have an account? <Link href='signin'>Sign in</Link></div>

    </form>
    </section>
    
    
  )
};
