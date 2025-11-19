import { useEffect, useRef, useState } from 'react'
import type { UserType } from '../types'

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

export const useCurrentUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const obj = localStorage.getItem("user");
    if (obj) {
      console.log(
        "%c [ obj ]-9",
        "font-size:13px; background:pink; color:#bf2c9f;",
        obj
      );
      setUser(JSON.parse(obj));
    }
  }, []);

  return user;
};