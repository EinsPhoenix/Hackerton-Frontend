import { Preference } from 'app/services'

export interface LoginResult {
  token: string
  preferences: Preference[]
}

export interface LoginParams {
  email?: string
  username?: string
  password: string
}

export interface GoogleLoginParams {
  token: string
  devicetype: string
}
