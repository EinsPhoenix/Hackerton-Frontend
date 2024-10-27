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
    backToStart: 'Zurück zu Start',
    choose: 'Auswählen',
    continue: 'Weiter',
    finish: 'Abschließen',
    generate: 'Generieren',
    generateQuiz: 'Quiz generieren',
    interrupt: 'Abbrechen',
    start: 'Starten',
  },
  emptyState: {
    genericContent: 'Leider wurden keine Inhalte gefunden.',
    libraryContent: 'Das ist aber leer hier.',
    somethingWrong: 'Da ist etwas schief gelaufen...',
    std: {
      button: 'Erneut versuchen',
      heading: 'Keine Inhalte',
    },
  },
  error: {
    ai: {
      content: 'Fehler beim erhalten des KI-Generierten Inhalts',
      requiredForContent: 'Sie müssen Inhalt und Titel ausgefüllt haben',
      requiredForTags: 'Sie müssen Inhalt und Titel ausgefüllt haben',
      tags: 'Fehler beim erhalten des KI-Generierten Tags',
    },
    expired: 'Deine Sitzung ist abgelaufen, du musst dich neu einloggen',
    internetConnection: 'Internet Verbindungsprobleme',
    jwt: 'Fehler beim laden der Nutzerdaten',
    login: 'Fehler beim einloggen',
    open: 'Fehler beim öffnen',
    permission: {
      pickPhoto: 'Berechtigung zum Zugriff auf die Kamerarolle ist erforderlich!',
      takePhoto: 'Berechtigung zum Zugriff auf die Kamera ist erforderlich!',
    },
    preferences: 'Fehler beim festlegen der Preferenzen',
    signup: 'Fehler beim Registrieren',
    threads: 'Fehler beim erhalten/senden der Threads',
    unexpected: 'Unbekannter Fehler',
    userData: 'Fehler beim erhalten der eigenen Daten',
    voting: 'Fehler beim updaten der Upvotes',
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
      image: 'Bild auswählen ...',
      label: {
        content: 'Inhalt',
        contentSummary: 'Zusammengefasster Inhalt',
        title: 'Titel',
      },
      mainTag: 'Haupt Tag',
      placeholder: {
        content: 'Inhalt eingeben',
        contentSummary: 'Zusammengefasster Inhalt eingeben',
        title: 'Titel eingeben',
      },
      subTagInfo: 'Es können maximal drei neben Tags hinzugefügt werden',
      subTags: 'Neben Tags',
      subTagsAI: 'KI-Generierte Tags',
    },
    quiz: {
      label: 'Lösung',
      overview: 'Quiz Übersicht',
      placeholder: 'Lösung eingeben',
    },
    result: {
      points: 'Punkte',
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
    quiz: 'Quiz',
    quizGeneration: 'Quiz Generierung',
    result: 'Ergebnisse',
    setting: 'Einstellungen',
    signup: 'Registrieren',
    thread: 'Thread',
    welcome: 'Willkommen',
  },
  search: {
    label: 'Suche',
    placeholder: 'Nach was suchen Sie?',
  },
  success: {
    dislike: '{{threadTitle}} wurde gedownvoted!',
    like: '{{threadTitle}} wurde geupvoted!',
    threadAdd: '{{threadTitle}} wurde erfolgreich erstellt!',
  },
  validation: {
    content: {
      required: 'Inhalt ist erforderlich',
    },
    contentSummary: {
      required: 'Zusammengefasster Inhalt ist erforderlich',
    },
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
    titel: {
      required: 'Titel ist erforderlich',
    },
    username: {
      invalidChars: 'Benutzername darf nur Buchstaben, Zahlen,._- enthalten.',
      required: 'Benutzername ist erforderlich.',
    },
  },
}

export default de
