import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL_DASH + 'dashboard', {
                method: "GET",
                headers: {token: localStorage.token},
            })

            const parsedRes = await res.json();
            
            setName(parsedRes.user_name)
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged Out Successfully");
    }

    useEffect(() => {
        getName();
    })

    return (
        <>
            <h1>Hello {name}</h1>
            <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
        </>
    )
}

export default Dashboard;