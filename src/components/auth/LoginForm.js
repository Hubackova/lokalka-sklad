import React, { useState } from 'react';

import {login, logout} from '../../firebase/functions'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const fblogin = () => {
        login(email, password)
    }

    const fblogout = () => {
        logout()
    }

    return (
        <>
        <div>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={fblogin}>Přihlásit</button>
        </div>
        <button onClick={fblogout}>Odhlásit</button>
        </>
    );
};

export default LoginForm;
