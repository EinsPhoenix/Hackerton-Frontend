import { Preference } from 'app/services'

export interface LoginResponseDTO {
  token: string
  preferences: Preference[]
}
