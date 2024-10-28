import { jwtDecode } from 'jwt-decode'

import { translate } from 'app/i18n'

export interface JwtClaims {
  sub: string
  username: string
  email: string
  exp: number
  iat: number
}

export const decodeJwt = (token: string): JwtClaims => {
  try {
    return jwtDecode<JwtClaims>(token)
  } catch (error: any) {
    throw new Error(translate('error.jwt')!)
  }
}
