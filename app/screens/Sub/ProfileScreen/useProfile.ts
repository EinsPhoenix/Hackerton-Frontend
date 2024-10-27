import { useAppContext } from 'app/context'

import { profileStyles } from './Profile.style'

const useHome = () => {
  const {
    authenticationStore: { jwtClaims },
    colors,
  } = useAppContext()

  return {
    colors,
    jwtClaims,
    styles: profileStyles(colors),
  }
}

export default useHome
