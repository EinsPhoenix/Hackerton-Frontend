import { useAppContext } from 'app/context'

import { threadStyles } from './Thread.style'

const useThread = () => {
  const { colors } = useAppContext()

  return {
    styles: threadStyles(colors),
  }
}

export default useThread
