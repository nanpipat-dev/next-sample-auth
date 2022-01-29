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
  customerNumber?: string
  memberId?: string,
  email: string,
  firstName: string,
  lastName: string,
  username?: string,
  profileImage?: string,
  verify?: boolean,
  isCreatedPassword?: boolean,
}
