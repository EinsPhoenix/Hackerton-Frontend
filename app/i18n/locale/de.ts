import app from '../../../app.json'

const de = {
  app: {},
  auth: {
    alreadyAccount: 'Bereits ein Konto?',
    google: 'Google Anmelden',
    label: {
      email: 'E-Mail',
      emailOrUsername: 'E-Mail/Benutzername',
      password: 'Passwort',
      passwordRepeat: 'Passwort wiederholen',
      username: 'Benutzername',
    },
    login: 'Einloggen',
    loginHere: 'Hier einloggen.',
    logout: 'Ausloggen',
    noAccount: 'Noch kein Konto?',
    or: 'Oder weiter mit',
    placeholder: {
      email: 'E-Mail eingeben',
      emailOrUsername: 'Benutzername/E-Mail eingeben',
      password: 'Passwort eingeben',
      passwordRepeat: 'Passwort eingeben',
      username: 'Benutzername eingeben',
    },
    register: 'Registrieren',
    registerHere: 'Hier registrieren.',
    welcome: 'Wilkommen zurück!',
    welcomeNew: `Wilkommen bei ${app.name}!`,
  },
  common: {
    add: 'Hinzufügen',
    continue: 'Weiter',
    interrupt: 'Abbrechen',
  },
  emptyState: {
    genericContent: 'Leider wurden keine Inhalte gefunden.',
    libraryContent: 'Das ist aber leer hier.',
    std: {
      button: 'Erneut versuchen',
      heading: 'Keine Inhalte',
    },
  },
  error: {
    expired: 'Deine Sitzung ist abgelaufen, du musst dich neu einloggen',
    internetConnection: 'Internet Verbindungsprobleme',
    jwt: 'Fehler beim laden der Nutzerdaten',
    login: 'Fehler beim einloggen',
    open: 'Fehler beim öffnen',
    preferences: 'Fehler beim festlegen der Preferenzen',
    signup: 'Fehler beim Registrieren',
    threads: 'Fehler beim erhalten der Threads',
    unexpected: 'Unbekannter Fehler',
    userData: 'Fehler beim erhalten der eigenen Daten',
  },
  errorScreen: {
    friendlySubtitle: 'Ein Fehler ist aufgetreten.',
    reset: 'Zurücksetzen',
    title: 'Fehler',
  },
  forceUpdate: {
    retry: 'Erneut versuchen',
    update: 'Update',
    updateMessage:
      'Wir haben eine neue Version der App veröffentlicht!\nBitte aktualisieren Sie Ihre App, um diese neuen Funktionen nutzen zu können.',
  },
  greeting: {
    afternoon: 'Guten Tag!',
    evening: 'Guten Abend!',
    morning: 'Guten Morgen!',
  },
  info: {},
  screen: {
    add: {
      label: {
        content: 'Inhalt',
        contentSummary: 'Zusammengefasster Inhalt',
        title: 'Titel',
      },
      placeholder: {
        content: 'Inhalt eingeben',
        contentSummary: 'Zusammengefasster Inhalt eingeben',
        title: 'Titel eingeben',
      },
    },
    setting: {
      changeColorMode: 'Farb-Schema ändern',
      languages: 'Sprachen',
      slogan: 'Wissen. Teilen. Wachsen.',
      theme: 'Schema',
      version: `App Version - ${app.expo.version}`,
    },
    welcome: {
      exciting: '(ohh, das ist aufregend!)',
      letsGo: "Los geht's!",
      postscript: 'Wähle einige Preferenzen, um loszulegen!',
      readyForLaunch: 'Deine App ist fast bereit für den Start!',
    },
  },
  screens: {
    add: 'Hinzufügen eines Threads',
    home: 'Start',
    library: 'Bibliothek',
    login: 'Login',
    networkCheck: 'Netzwerk-Check',
    profile: 'Profil',
    setting: 'Einstellungen',
    signup: 'Registrieren',
    welcome: 'Willkommen',
  },
  search: {
    label: 'Suche',
    placeholder: 'Nach was suchen Sie?',
  },
  validation: {
    email: {
      pattern: 'Ungültige E-Mail-Adresse.',
      required: 'E-Mail ist erforderlich.',
    },
    emailOrUsername: {
      required: 'Email/Benutzername ist erforderlich',
    },
    password: {
      lowercase: 'Passwort muss mindestens einen Kleinbuchstaben enthalten.',
      match: 'Passwörter stimmen nicht überein.',
      minLength: 'Passwort muss mindestens 8 Zeichen lang sein.',
      number: 'Passwort muss mindestens eine Zahl enthalten.',
      required: 'Passwort ist erforderlich.',
      specialCharacter: 'Passwort muss mindestens ein Sonderzeichen enthalten.',
      uppercase: 'Passwort muss mindestens einen Großbuchstaben enthalten.',
    },
    username: {
      invalidChars: 'Benutzername darf nur Buchstaben, Zahlen,._- enthalten.',
      required: 'Benutzername ist erforderlich.',
    },
  },
}

export default de
