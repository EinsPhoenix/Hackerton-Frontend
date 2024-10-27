export interface PreferencesParams {
  prefs: Preference[]
}

export interface Preference {
  preference: string
  chosen: number
}

export interface PreferencesResult {
  preference: string
  weight: number
}

export type WeightedPreferencesParams = object
