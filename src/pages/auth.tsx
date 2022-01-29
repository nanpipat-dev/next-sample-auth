import AuthComponent from '@/components/AuthComponent'
import PageLoading from '@/components/loading/PageLoading'
import { useGlobal } from '@/hooks/Global/GlobalContext'
import { useEffect } from 'react'
import {useRouter} from 'next/router'


function Auth(): JSX.Element {
  const router = useRouter()
  const {isAuth, member} = useGlobal()

  const {state} = router.query
  useEffect(() => {
    if(isAuth) {
      router.push('/')
    }
  },[isAuth])
  return (
    <>
    {isAuth ? <PageLoading/> : <AuthComponent state={state === 'login' ? 'login' : ''}/>}
    </>
  )
}

export default Auth