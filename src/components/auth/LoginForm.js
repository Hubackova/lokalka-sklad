import React, { useState } from 'react';

import {Fb} from '../../firebase'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        Fb.login(email, password)
    }

    const logout = () => {
        Fb.logout()
    }

    return (
        <>
        <div>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Přihlásit</button>
        </div>
        <button onClick={logout}>Odhlásit</button>
        </>
    );
};

export default LoginForm;
