import authServiceApi from '@/services/api/auth-service.api'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import style from './auth-style.module.scss'
import { useRouter } from 'next/router'

type AuthComponentProps = {
  state?: string
}

function AuthComponent(props: AuthComponentProps): JSX.Element {
  const [form, setForm] = useState('login')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const router = useRouter()

  const {state} =props

  useEffect(() => {
    if(state === 'login') {
      setForm('signup')
    }
  },[])

  async function handleSubmitSignup(): Promise<void> {
    
    try {
      console.log(username, password, firstName, lastName, 'info')
      await authServiceApi.postSignUpWithPassword({
        username,
        password,
        firstName,
        lastName,
      })
      router.reload()
    } catch (error) {
      console.log(error?.response?.data || 'error', 'asdasdasd')
      alert(error?.response?.data || 'error')
    }
  }

  async function handleSubmitLogin(): Promise<void> {
    try {
      await authServiceApi.postLoginWithUsernameAndPassword({
        username: usernameLogin,
        password: passwordLogin,
      })
      router.reload()
    } catch (error) {
      console.log(error?.response?.data || 'error', 'asdasdasd')
      alert(error?.response?.data || 'error')
    }
  }

  function setToLogin(): void {
    setForm('login')
    setUsernameLogin('')
    setPasswordLogin('')
  }

  function setToSignUp(): void {
    setForm('signup')
    setUsername('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }

 

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
            onClick={() => setToLogin()}
          ><span>or</span>Sign up</h2>
          <div className={style['form-holder']}>
            <input
              type="text"
              className={style['input']}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className={style['input']}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              className={style['input']}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className={style['input']}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <button className={style['submit-btn']} onClick={handleSubmitSignup}>Sign up</button>
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
              onClick={() => setToSignUp()}
            ><span>or</span>Log in</h2>
            <div className={style['form-holder']}>
              <input
                type="text"
                className={style['input']}
                placeholder="Username"
                onChange={(e) => setUsernameLogin(e.target.value)}
              />
              <input
                type="password"
                className={style['input']}
                placeholder="Password"
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
            </div>
            <button className={style['submit-btn']} onClick={handleSubmitLogin}>Log in</button>
          </div>
        </div>



      </div>
    </>
  )
}

export default AuthComponent