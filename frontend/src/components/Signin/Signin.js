import React from 'react';
import './Signin.css'

const Signin = ({ onRouteChange }) => {
  return (
    <main className='pa2 white-90'>
      <form className='br1 shadow-5 measure center mt5-ns pa3 mt3 pa5-ns primary-bg'>
        <p className='fw6 f4 mt0'>SIGN IN</p>
        <div className='mt1'>
          <input className='white black-input br1 pv3 ba b--gray w-100' placeholder='Email' />
        </div>
        <div className='mv2'>
          <input className='white black-input br1 pv3 ba b--gray w-100' type='password' placeholder='Password' />
        </div>
        <div>
          <input className='white black-input br1 b pv3 ph4 input-reset ba b--gray bg-transparent grow pointer f6 dib' type='submit' value='SIGN IN' onClick={() => onRouteChange('home')} />
        </div>
      </form>
    </main>
  );
}

export default Signin;