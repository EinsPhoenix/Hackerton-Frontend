import app from 'app/../app.json'

const en = {
  app: {},
  auth: {
    alreadyAccount: 'Already have an account?',
    google: 'Google Login',
    label: {
      email: 'Email',
      emailOrUsername: 'Email/Username',
      password: 'Password',
      passwordRepeat: 'Repeat Password',
      username: 'Username',
    },
    login: 'Login',
    loginHere: 'Login here.',
    logout: 'Logout',
    noAccount: "Don't have an account?",
    or: 'Or continue with',
    placeholder: {
      email: 'Enter your email address',
      emailOrUsername: 'Enter your email/username',
      password: 'Enter your password',
      passwordRepeat: 'Enter your password',
      username: 'Enter your username',
    },
    register: 'Register',
    registerHere: 'Register here.',
    welcome: 'Welcome back!',
    welcomeNew: `Welcome to ${app.name}!`,
  },
  common: {
    add: 'Add',
    backToStart: 'Back to Home',
    choose: 'Choose',
    continue: 'Weiter',
    deleteAcc: 'Delete Account',
    deleteAskAgain: 'Are you sure you want to delete your account? This action cannot be undone.',
    finish: 'Finish',
    generate: 'Generate',
    generateQuiz: 'Generate Quiz',
    important: 'Important',
    interrupt: 'Abbrechen',
    skill: 'Skill',
    start: 'Start',
  },
  emptyState: {
    genericContent: 'Unfortunately no content was found.',
    libraryContent: 'It’s quite empty here.',
    somethingWrong: 'Something went wrong...',
    std: {
      button: 'Try again',
      heading: 'No Content',
    },
  },
  error: {
    ai: {
      content: 'Error while getting AI-Generated content',
      requiredForContent: 'You must have content and title filled out',
      requiredForTags: 'You must have content and title filled out',
      tags: 'Error while getting AI-Generated tags',
    },
    expired: 'Your session is expired, you need to login again',
    internetConnection: 'Internet connection problems',
    jwt: 'Error while loading user data',
    login: 'Error while logging in',
    open: 'Error while opening',
    permission: {
      pickPhoto: 'Permission to access the camera roll is required!',
      takePhoto: 'Permission to access the camera is required!',
    },
    preferences: 'Error while setting up preferences',
    signup: 'Error while signing up',
    threads: 'Error while getting/sending threads',
    unexpected: 'Unexpected error',
    userData: 'Error while getting own data',
    voting: 'Error while changing upvotes',
  },
  errorScreen: {
    friendlySubtitle: 'An error occurred.',
    reset: 'Reset',
    title: 'Error',
  },
  forceUpdate: {
    retry: 'Try again',
    update: 'Update',
    updateMessage:
      "We've release a new version of the App!\nPlease update your app to enjoy these new features.",
  },
  greeting: {
    afternoon: 'Good Afternoon!',
    evening: 'Good Evening!',
    morning: 'Good Morning!',
  },
  info: {},
  screen: {
    add: {
      image: 'Select image ...',
      label: {
        content: 'Content',
        contentSummary: 'Summarized Content',
        title: 'Title',
      },
      mainTag: 'Main Tag',
      placeholder: {
        content: 'Enter content',
        contentSummary: 'Enter summarized content',
        title: 'Enter title',
      },
      subTagInfo: 'A maximum of three sub tags can be added',
      subTags: 'Sub Tags',
      subTagsAI: 'AI-Generated Tags',
    },
    profile: {
      bio: 'Description',
      job: 'Job',
    },
    quiz: {
      label: 'Solution',
      overview: 'Quiz Overview',
      placeholder: 'Enter solution',
    },
    result: {
      points: 'Points',
    },
    setting: {
      changeColorMode: 'Change Color Theme',
      languages: 'Languages',
      slogan: 'Knowledge. Share. Grow.',
      theme: 'Theme',
      version: `App Version - ${app.expo.version}`,
    },
    welcome: {
      exciting: '(ohh, this is exciting!)',
      letsGo: "Let's go!",
      postscript: 'Select some preferences to get started!',
      readyForLaunch: 'Your app, almost ready for launch!',
    },
  },
  screens: {
    add: 'Adding a Thread',
    home: 'Home',
    library: 'Library',
    login: 'Login',
    networkCheck: 'Network-Check',
    profile: 'Profile',
    quiz: 'Quiz',
    quizGeneration: 'Quiz Generation',
    result: 'Results',
    setting: 'Settings',
    signup: 'Sign Up',
    thread: 'Thread',
    welcome: 'Welcome',
  },
  search: {
    label: 'Search',
    placeholder: 'What would you like to search?',
  },
  setting: {
    backgroundVideo: 'Background Video',
    callPermission: 'Call Permission',
    changeBackgroundVideo: 'Change Background Video',
    changeColorMode: 'Change Color Mode',
    languages: 'Languages',
    notification: 'Notifications',
    permissionInfo: 'If the permission has already been granted, this button has no function.',
    settings: 'Settings',
    theme: 'Theme',
  },
  success: {
    dislike: '{{threadTitle}} was downvoted!',
    like: '{{threadTitle}} was upvoted!',
    threadAdd: '{{threadTitle}} was successfully created!',
  },
  threads: {
    downvoted: 'Downgevotete Threads',
    own: 'Own Threads',
    upvoted: 'Upvoted Threads',
  },
  validation: {
    content: {
      required: 'Content is required',
    },
    contentSummary: {
      required: 'Summarized content is required',
    },
    email: {
      pattern: 'Invalid email format',
      required: 'Email is required',
    },
    emailOrUsername: {
      required: 'email/username is required',
    },
    password: {
      lowercase: 'Password must contain at least one lowercase letter',
      match: 'Passwords do not match',
      minLength: 'Password must be at least 8 characters long',
      number: 'Password must contain at least one number',
      required: 'Password is required',
      special: 'Password must contain at least one special character',
      uppercase: 'Password must contain at least one uppercase letter',
    },
    titel: {
      required: 'Titel is required',
    },
    username: {
      invalidChars: 'Username can only contain letters, numbers,._- characters',
      required: 'Username is required',
    },
  },
}

export default en
export type Translations = typeof en
