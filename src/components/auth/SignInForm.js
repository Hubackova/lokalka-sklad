import React, { useState } from "react";
import { signIn } from "../../firebase/functions";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

  const fbSignIn = () => {
    signIn(email, password, id, phone);
  };

  return (
    <div>
      Email: <input value={email} onChange={e => setEmail(e.target.value)} />
      Heslo: <input value={password} onChange={e => setPassword(e.target.value)} />
      ID: <input value={id} onChange={e => setId(e.target.value)} />
      Tel. číslo: <input value={phone} onChange={e => setPhone(e.target.value)} />
      <button onClick={fbSignIn}>Registrovat</button>
    </div>
  );
};

export default SignInForm;
