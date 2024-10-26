import { convertToFormData } from 'app/utils'

import {
  AddThreadParams,
  ContentGeneratedResult,
  GoogleLoginParams,
  LoginParams,
  LoginResult,
  PreferencesParams,
  SignupParams,
  SignupResult,
  TagGeneratedResult,
  ThreadGenerateParams,
  ThreadParams,
  ThreadResult,
  UserDataParams,
  UserDataResult,
  VotingParams,
} from '../models'
import { API_METHODS } from './apiMethods.type'
import type {
  ContentGeneratedResponseDTO,
  LoginResponseDTO,
  SignupResponseDTO,
  TagGeneratedResponseDTO,
  ThreadResponseDTO,
  ThreadSearchResponseDTO,
  UserDataResponseDTO,
} from './dtos'
import { END_POINTS } from './endPonts.type'
import {
  LoginResponseAdapter,
  SignupResponseAdapter,
  ThreadResponseAdapter,
  UserDataResponseAdapter,
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

  postPreferences = async (preferenceParams: PreferencesParams): Promise<void> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<void, PreferencesParams>(
        API_METHODS.POST,
        END_POINTS.PREFERENCES,
        preferenceParams,
      )
        .then(resolve)
        .catch(reject)
    })
  }

  getThreads = async (threadParams: ThreadParams): Promise<ThreadResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<ThreadResponseDTO[], ThreadParams>(
        API_METHODS.GET,
        END_POINTS.THREADS,
        threadParams,
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }

  searchThreads = async (threadParams: ThreadParams): Promise<ThreadResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<ThreadSearchResponseDTO, ThreadParams>(
        API_METHODS.POST,
        END_POINTS.SEARCH_THREADS,
        threadParams,
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().serviceSearch(res))
        })
        .catch(reject)
    })
  }

  updateVoting = async (votingParams: VotingParams): Promise<void> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<void, VotingParams>(API_METHODS.POST, END_POINTS.UPVOTE, votingParams)
        .then(resolve)
        .catch(reject)
    })
  }

  postThread = async (threadParams: AddThreadParams): Promise<ThreadResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<ThreadResponseDTO, FormData>(
        API_METHODS.POST,
        END_POINTS.NEW_THREAD,
        convertToFormData(threadParams),
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().serviceSingle(res))
        })
        .catch(reject)
    })
  }

  getUserData = async (userDataParams: UserDataParams): Promise<UserDataResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<UserDataResponseDTO, UserDataParams>(
        API_METHODS.GET,
        END_POINTS.THREADS,
        userDataParams,
      )
        .then(res => {
          resolve(new UserDataResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }

  getAIContent = async (
    threadGenerateParams: ThreadGenerateParams,
  ): Promise<ContentGeneratedResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<ContentGeneratedResponseDTO, ThreadGenerateParams>(
        API_METHODS.POST,
        `${END_POINTS.AI_CONTENT}/${threadGenerateParams.language_code}`,
        threadGenerateParams,
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().serviceGeneratedContent(res))
        })
        .catch(reject)
    })
  }

  getAITags = async (threadGenerateParams: ThreadGenerateParams): Promise<TagGeneratedResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<TagGeneratedResponseDTO, ThreadGenerateParams>(
        API_METHODS.POST,
        END_POINTS.AI_TAGS,
        threadGenerateParams,
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().serviceGeneratedTags(res))
        })
        .catch(reject)
    })
  }
}

export const appServices = new AppServices()
