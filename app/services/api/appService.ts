import { convertToFormData } from 'app/utils'

import {
  GoogleLoginParams,
  LoginParams,
  LoginResult,
  SignupParams,
  SignupResult,
} from '../models'
import { API_METHODS } from './apiMethods.type'
import type {
  LoginResponseDTO,
  SignupResponseDTO,
} from './dtos'
import { END_POINTS } from './endPonts.type'
import {
  LoginResponseAdapter,
  SignupResponseAdapter,
} from './response'
import serviceAdapter from './serviceAdapter'

export class AppServices {
  loginUser = async (loginParams: LoginParams): Promise<LoginResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<LoginResponseDTO, FormData>(
        API_METHODS.POST,
        END_POINTS.LOGIN,
        convertToFormData(loginParams),
      )
        .then(res => {
          resolve(new LoginResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }

  googleLogin = async (loginParams: GoogleLoginParams): Promise<LoginResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<LoginResponseDTO, GoogleLoginParams>(
        API_METHODS.POST,
        END_POINTS.GOOGLE_LOGIN,
        loginParams,
      )
        .then(res => {
          resolve(new LoginResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }

  signupUser = async (signupParams: SignupParams): Promise<SignupResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<SignupResponseDTO, FormData>(
        API_METHODS.POST,
        END_POINTS.SIGNUP,
        convertToFormData(signupParams),
      )
        .then(res => {
          resolve(new SignupResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }
}

export const appServices = new AppServices()
