import React from 'react';
import '../style/index.scss';
import SignUp from './SignUp.jsx';

const CreateAdminUser = () => {
  return (
    <SignUp createAdmin={true}/>
  )
}

export default CreateAdminUser;
