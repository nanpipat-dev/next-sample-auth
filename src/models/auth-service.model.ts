export type AuthSignUpPassword = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
}

export type AuthSignInPassword = {
  username: string,
  password: string,
}

export type AuthRefreshToken = {
  refreshToken: string
}

export type ProfileGlobal = {
  memberId:string,
  username: string,
  firstName: string,
  lastName: string,
}
