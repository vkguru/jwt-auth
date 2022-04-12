import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async(e) => {

        e.preventDefault();

        try {
            const body = {email, password, name}
            const res = await fetch(process.env.REACT_APP_API_URL + 'register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parsedRes = await res.json();

            if(parsedRes.token) {
                localStorage.setItem("token", parsedRes.token);
                setAuth(true);
                toast.success("Registered Successfully");
            } else {
                setAuth(false);
                toast.error(parsedRes);
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <h1 className='text-center my-5'>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder='email' className='form-control my-3' value={email} onChange={e => onChange(e)}/>
                <input type="password" name="password" placeholder='password' className='form-control my-3' value={password} onChange={e => onChange(e)} />
                <input type="text" name="name" placeholder='name' className='form-control my-3' value={name} onChange={e => onChange(e)} />
                <button className='btn btn-success btn-block'>Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </>
    )
}

export default Register;