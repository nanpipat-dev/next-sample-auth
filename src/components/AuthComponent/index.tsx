import classNames from 'classnames'
import { useState } from 'react'
import style from './auth-style.module.scss'

function AuthComponent(): JSX.Element {
  const [form, setForm] = useState('signup')

  //   function onClick(e): void {
  //     let parent = style['login']
  //   }
  return (
    <>
      <div className={style['form-structor']}>

        <div className={classNames(
          style['signup'],
          form == 'signup' ? style['slide-up'] : '',
        )}
        >
          <h2
            className={style['form-title']}
            id="signup"
            onClick={() => setForm('login')}
          ><span>or</span>Sign up</h2>
          <div className={style['form-holder']}>
            <input
              type="text"
              className={style['input']}
              placeholder="Name"
            />
            <input
              type="email"
              className={style['input']}
              placeholder="Email"
            />
            <input
              type="password"
              className={style['input']}
              placeholder="Password"
            />
          </div>
          <button className={style['submit-btn']}>Sign up</button>
        </div>

        <div className={classNames(
          style['login'],
          form != 'signup' ? style['slide-up'] : '',
        )}
        >
          <div className={style['center']}>
            <h2
              className={style['form-title']}
              id="login"
              onClick={() => setForm('signup')}
            ><span>or</span>Log in</h2>
            <div className={style['form-holder']}>
              <input
                type="email"
                className={style['input']}
                placeholder="Email"
              />
              <input
                type="password"
                className={style['input']}
                placeholder="Password"
              />
            </div>
            <button className={style['submit-btn']}>Log in</button>
          </div>
        </div>



      </div>
    </>
  )
}

export default AuthComponent