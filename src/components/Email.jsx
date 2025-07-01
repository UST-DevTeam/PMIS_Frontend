import React, { useState } from 'react'
import Button from './Button';
const Email = () => {
  const [emails, setEmails] = useState([]);
  return (
    <div className='text-sm font-poppins'>
      <div>
        {emails.length == 0 ? <div className='text-center mx-16'>By setting up your email address for the email integration, you'll be able to seamlessly view all your email exchanges with the investor here.</div> : emails.map((email, index) => (<div key={index}>{email}</div>))}
      </div>
      <div className='flex justify-center pt-4'>
        <Button name={"Go to Settings"} classes='px-4 py-1 w-1/5'></Button>
      </div>
    </div>
  )
}

export default Email