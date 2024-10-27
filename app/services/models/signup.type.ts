import { Preference } from 'app/services'

export interface SignupResult {
  token: string
  preferences: Preference[]
}

export interface SignupParams {
  username: string
  email: string
  password: string
  passwordRepeat: string
}
