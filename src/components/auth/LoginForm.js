import React, { useState } from 'react';

import {login, logout} from '../../firebase/functions'

const LoginForm = () => {
    const [email, setEmail] = useState("hubackova.lenka@gmail.com")
    const [password, setPassword] = useState("lh603324")

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
