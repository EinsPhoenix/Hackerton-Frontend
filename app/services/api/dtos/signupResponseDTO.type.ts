import { Preference } from 'app/services'

export interface SignupResponseDTO {
  token: string
  preferences: Preference[]
}
