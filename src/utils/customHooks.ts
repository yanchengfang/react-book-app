import { useEffect, useRef, type DependencyList } from 'react'

export function useOnceEffect(callback, dependencies) {
  console.log("🚀 ~ useOnceEffect ~ dependencies:", dependencies)
  const hasRun = useRef(false)
  
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true
      return callback()
    }
  }, dependencies)
}