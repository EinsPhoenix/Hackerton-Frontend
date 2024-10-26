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
    continue: 'Continue',
    interrupt: 'Cancel',
  },
  emptyState: {
    genericContent: 'Unfortunately no content was found.',
    libraryContent: 'It’s quite empty here.',
    std: {
      button: 'Try again',
      heading: 'No Content',
    },
  },
  error: {
    expired: 'Your session is expired, you need to login again',
    internetConnection: 'Internet connection problems',
    jwt: 'Error while loading user data',
    login: 'Error while logging in',
    open: 'Error while opening',
    preferences: 'Error while setting up preferences',
    signup: 'Error while signing up',
    threads: 'Error while getting threads',
    unexpected: 'Unexpected error',
    userData: 'Error while getting own data',
    userMissing: 'The user doesnt exist' //hier die error message backend ziehne
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
      "We've released a new version of the App!\nPlease update your app to enjoy these new features.",
  },
  greeting: {
    afternoon: 'Good Afternoon!',
    evening: 'Good Evening!',
    morning: 'Good Morning!',
  },
  info: {},
  screen: {
    add: {
      label: {
        content: 'Content',
        contentSummary: 'Summarized Content',
        title: 'Title',
      },
      placeholder: {
        content: 'Enter content',
        contentSummary: 'Enter summarized content',
        title: 'Enter title',
      },
    },
    setting: {
      changeColorMode: 'Change Color Theme',
      languages: 'Languages',
      slogan: 'Know. Share. Grow.',
      theme: 'Theme',
      version: `App Version - ${app.expo.version}`,
    },
    welcome: {
      exciting: '(ohh, this is exciting!)',
      letsGo: "Let's go!",
      postscript: 'Select some preferences to get started!',
      readyForLaunch: 'Your app is almost ready for launch!',
    },
  },
  screens: {
    add: 'Adding a Thread',
    home: 'Home',
    library: 'Library',
    login: 'Login',
    networkCheck: 'Network-Check',
    profile: 'Profile',
    setting: 'Settings',
    signup: 'Sign Up',
    welcome: 'Welcome',
  },
  search: {
    label: 'Search',
    placeholder: 'What would you like to search?',
  },
  validation: {
    email: {
      pattern: 'Invalid email format',
      required: 'An Email is required',
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
    username: {
      invalidChars: 'Username can only contain letters, numbers,._- characters',
      required: 'Username is required',
    },
  },
}

export default en
export type Translations = typeof en
