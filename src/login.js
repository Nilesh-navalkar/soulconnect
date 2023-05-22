import React, { useState,useEffect } from 'react'
import './login.css';
function Login() {
    const [show, setShow] = useState(0)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [semail, setSemail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [occupation, setOccupation] = useState('')
    const [img, setImg] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [error, setError] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const errorParam = urlParams.get('error');
        if (errorParam) {
            setError(errorParam);
            setTimeout(() => {
                window.confirm(errorParam);
              setError('');
            }, 0);
          
        }
        setError('')
      }, []);

  return (
    <div className='this'>
        {show==0 ? 
        <article className='form'>
                <form action='http://127.0.0.1:5000/login' method='POST'>
                    <h4 align='center'>Login</h4>
                    <div className='grid'>
                        <input type='email' required name='email' value={email} onChange={e=>{setEmail(e.target.value)}} placeholder='email'/>
                    </div>
                    <div className='grid'>
                        <input type='password' required name='password' value={password} onChange={e=>{setPassword(e.target.value)}} placeholder='password'/>
                    </div>
                    <button type='submit'>Login</button>
                    <div className='line'>
                        <p>dont have an account?<button role='button' className='contrast outline' onClick={()=>{setShow(1)}}>Signup</button></p>  
                        
                    </div>
                </form>
            </article>:

            <article className='form'>
            <form action='http://127.0.0.1:5000/signup' method='POST' encType='multipart/form-data'>
            <h4 align='center'>Signup</h4>
                    <div className='grid'>
                        <input type='text' required name='name' value={name} onChange={e=>{setName(e.target.value)}} placeholder='name'/>
                        <input type='email' required name='semail' value={semail} onChange={e=>{setSemail(e.target.value)}} placeholder='email'/>
                    </div>
                    <div className='grid'>
                        <input type='date' required name='dob' value={dob} onChange={e=>{setDob(e.target.value)}} placeholder='dob'/>
                        <input type='text' required name='occupation' value={occupation} onChange={e=>{setOccupation(e.target.value)}} placeholder='occupation'/>
                    </div>
                    <div className='grid'>
                        <input type='password' required name='pass1' value={pass1} onChange={e=>{setPass1(e.target.value)}} placeholder='password'/>
                        <input type='password' required name='pass2' value={pass2} onChange={e=>{setPass2(e.target.value)}} placeholder='reenter password'/>
                    </div>
                    <div className='grid'>
                        <input type='number' required name='phone' value={phone} onChange={e=>{setPhone(e.target.value)}} placeholder='phone no.'/>
                        <input type='file' required accept='Image/*' name='img'  onChange={e=>{setImg(e.target.value)}} placeholder='Profile Photo'/>
                    </div>
                    <button type='submit'>Signup</button>
                    <p>already have an account?<button  role='button'className='contrast outline' onClick={()=>{setShow(0)}} >Login</button></p>

            </form>
        </article>}
    </div>
  )
}

export default Login