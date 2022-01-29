import { useGlobal } from '@/hooks/Global/GlobalContext'
import authServiceApi from '@/services/api/auth-service.api'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router' 
import PageLoading from '@/components/loading/PageLoading'

function Home(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const {isAuth, member} = useGlobal()
  const router = useRouter()

  const {state} = router.query

  async function handleSubmitLogout(): Promise<void> {
    try {
      await authServiceApi.postLogout()
      window.location.replace('/auth?state=login')
    } catch (error) {
      console.log(error?.response?.data || 'error', 'asdasdasd')
      alert(error?.response?.data || 'error')
    }
  }

  async function handleSubmitLog(): Promise<void> {
    try {
      console.log(username, password, firstName, lastName, 'info')
      await authServiceApi.postLoginWithUsernameAndPassword({
        username,
        password,
      })
    } catch (error) {
      console.log(error?.response?.data || 'error', 'asdasdasd')
      alert(error?.response?.data || 'error')
    }
  }

  async function handleSubmitRef(): Promise<void> {
    try {
      console.log(username, password, firstName, lastName, 'info')
      await authServiceApi.postRefreshToken()
    } catch (error) {
      console.log(error?.response?.data || 'error', 'asdasdasd')
      alert(error?.response?.data || 'error')
    }
  }

  useEffect(() => {
    if(!isAuth) {
      router.push('/auth')
    }
  },[isAuth])

  return (
    <>
    {!isAuth 
    ? 
    <PageLoading /> 
    :
    <div>
      <h1>Hi 👋</h1>
      <h2>{member?.firstName} {member?.lastName}</h2>
      <button className='button-16' onClick={handleSubmitLogout}>Logout</button>
    </div>
    }
    </>
    
  )
}

export default Home