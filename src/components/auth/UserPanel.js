import React, {useContext} from 'react';
import {UserContext} from "../../Contexts";

const UserPanel = () => {
  const {user} = useContext(UserContext)
  return (
    <p>{user && user.email}</p>
  );
};

export default UserPanel;
