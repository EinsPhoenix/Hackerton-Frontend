import { convertToFormData } from 'app/utils'

import {
  AddThreadParams,
  CheckParams,
  ContentGeneratedResult,
  GoogleLoginParams,
  LoginParams,
  LoginResult,
  PreferencesParams,
  PreferencesResult,
  QuizParams,
  QuizResult,
  SignupParams,
  SignupResult,
  SolutionsResult,
  TagGeneratedResult,
  ThreadGenerateParams,
  ThreadInfoParams,
  ThreadParams,
  ThreadResult,
  UserDataParams,
  UserDataResult,
  VotingParams,
  WeightedPreferencesParams,
} from '../models'
import { API_METHODS } from './apiMethods.type'
import type {
  ContentGeneratedResponseDTO,
  LoginResponseDTO,
  PreferencesResponseDTO,
  QuizResponseDTO,
  SignupResponseDTO,
  TagGeneratedResponseDTO,
  ThreadResponseDTO,
  ThreadSearchResponseDTO,
  UserDataResponseDTO,
} from './dtos'
import { SolutionsResponseDTO } from './dtos'
import { END_POINTS } from './endPonts.type'
import {
  LoginResponseAdapter,
  QuizResponseAdapter,
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

  getThreads = async (threadParams: ThreadParams, signal: AbortSignal): Promise<ThreadResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<ThreadResponseDTO[], ThreadParams>(
        API_METHODS.GET,
        END_POINTS.THREADS,
        threadParams,
        signal,
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }

  searchThreads = async (
    threadParams: ThreadParams,
    signal: AbortSignal,
  ): Promise<ThreadResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<ThreadSearchResponseDTO, ThreadParams>(
        API_METHODS.POST,
        END_POINTS.SEARCH_THREADS,
        threadParams,
        signal,
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

  getUserData = async (
    userDataParams: UserDataParams,
    signal: AbortSignal,
  ): Promise<UserDataResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<UserDataResponseDTO, UserDataParams>(
        API_METHODS.POST,
        END_POINTS.USER_DATA,
        userDataParams,
        signal,
      )
        .then(res => {
          resolve(new UserDataResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }

  getAIContent = async (
    threadGenerateParams: ThreadGenerateParams,
    signal: AbortSignal,
  ): Promise<ContentGeneratedResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<ContentGeneratedResponseDTO, ThreadGenerateParams>(
        API_METHODS.POST,
        `${END_POINTS.AI_CONTENT}/${threadGenerateParams.language_code}`,
        threadGenerateParams,
        signal,
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().serviceGeneratedContent(res))
        })
        .catch(reject)
    })
  }

  getAITags = async (
    threadGenerateParams: ThreadGenerateParams,
    signal: AbortSignal,
  ): Promise<TagGeneratedResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<TagGeneratedResponseDTO, ThreadGenerateParams>(
        API_METHODS.POST,
        END_POINTS.AI_TAGS,
        threadGenerateParams,
        signal,
      )
        .then(res => {
          resolve(new ThreadResponseAdapter().serviceGeneratedTags(res))
        })
        .catch(reject)
    })
  }

  postThreadInfo = async (threadInfoParams: ThreadInfoParams): Promise<void> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<void, ThreadInfoParams>(
        API_METHODS.POST,
        END_POINTS.THREAD_INFO,
        threadInfoParams,
      )
        .then(resolve)
        .catch(reject)
    })
  }

  generateQuiz = async (quizParams: QuizParams, signal: AbortSignal): Promise<QuizResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<QuizResponseDTO, QuizParams>(
        API_METHODS.GET,
        `${END_POINTS.GENERATE_QUIZ}/${quizParams.id_thread}/${quizParams.language_code}`,
        quizParams,
        signal,
      )
        .then(res => {
          resolve(new QuizResponseAdapter().service(res))
        })
        .catch(reject)
    })
  }

  postAnswers = async (checkParams: CheckParams): Promise<SolutionsResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<SolutionsResponseDTO, CheckParams>(
        API_METHODS.POST,
        `${END_POINTS.CHECK_QUIZ}/${checkParams.id_thread}/${checkParams.language_code}`,
        checkParams,
      )
        .then(res => {
          resolve(new QuizResponseAdapter().serviceSolutions(res))
        })
        .catch(reject)
    })
  }

  getPreferences = async (
    weightedPreferencesParams: WeightedPreferencesParams,
  ): Promise<PreferencesResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<PreferencesResponseDTO[], WeightedPreferencesParams>(
        API_METHODS.GET,
        END_POINTS.PREFERENCES_WEIGHT,
        weightedPreferencesParams,
      )
        .then(res => {
          resolve(new QuizResponseAdapter().servicePrefs(res))
        })
        .catch(reject)
    })
  }
}

export const appServices = new AppServices()
