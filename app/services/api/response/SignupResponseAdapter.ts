import { SignupResult } from '../../models'
import { SignupResponseDTO } from '../dtos'

export class SignupResponseAdapter {
  service(dto: SignupResponseDTO): SignupResult {
    return {
      preferences: dto.preferences,
      token: dto.token,
    }
  }
}
