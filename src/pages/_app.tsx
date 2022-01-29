// libs
import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import '../../styles/globals.css'

import PageLoading from '@/components/loading/PageLoading'
import ComponentLoading from '@/components/loading/ComponentLoading'
import { GlobalProvider, useGlobal } from '@/hooks/Global/GlobalContext'
import authServiceApi from '@/services/api/auth-service.api'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // states
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMount, setIsMount] = useState(false)

  const Layout = Component['Layout'] || React.Fragment

  useEffect(() => {
    RefreshHook()
  }, [])

  async function RefreshHook(): Promise<void> {
    try {
      const response = await authServiceApi.postRefreshToken()
      const { status } = response
      if (status === 200) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (error) {
      setIsLoggedIn(false)
    } finally {
      setIsMount(true)
    }
  }

  return (
    <>
      <Head>
        <title>
         Nanpipat
        </title>
        <link
          rel="icon"
          href="/prynwan-monogram.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <GlobalProvider>
        <AppComponent
          isLoggedIn={isLoggedIn}
          Layout={Layout}
          isMount={isMount}
          Component={Component}
          pageProps={pageProps}
        />
      </GlobalProvider>
    </>
  )
}

function AppComponent(props: Record<string, any>): JSX.Element {
  // props
  const {
    isLoggedIn,
    isMount,
    Layout,
    Component,
    pageProps,
  } = props

  const { loading, setIsAuth, setMember } = useGlobal()

  useEffect(() => {
    if (isMount) {
      console.log('sss')
    }
  }, [isMount])

  // async function getProfile(): Promise<void> {
  //   try {
  //     const profile = await authServiceApi.getProfile()
  //     if (profile?.data) {
  //       const defaultImage = `/image/profile/img_profile_${profile.data.customerNumber?.charAt(0) || 0}.jpg`
  //       const memberResponse: ProfileGlobal = {
  //         memberId: profile.data.memberId,
  //         email: profile.data.email,
  //         firstName: profile.data.firstName,
  //         lastName: profile.data.lastName,
  //         username: profile.data.username,
  //         verify: profile.data.isVerify,
  //         isCreatedPassword: profile.data.isCreatedPassword,
  //         profileImage: profile.data.profileImage ? profile.data.profileImage : defaultImage,
  //         customerNumber: profile.data.customerNumber,
  //       }
  //       setMember(memberResponse)
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     console.log('success')
  //   }
  // }
  useEffect(() => {
    if (isLoggedIn) {
      setIsAuth(true)
      // getProfile()
    }

  }, [isLoggedIn])


  if (isMount) return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {
        loading && <ComponentLoading />
      }
      <div id="modal-root"></div>
    </>
  )
  else return <PageLoading />
}
export default MyApp
