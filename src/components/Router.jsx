import { useEffect, useState } from "react"
import { EVENTS } from "../constants"
import {Error} from "../pages/Error"

export function Router({routes = []}) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
    useEffect(() => {
      const onLocationChange = () => {
        setCurrentPath(window.location.pathname)
      }
  
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
      }
  
    }, [])
  
    const Page = routes.find(({path}) => path === currentPath)?.Component
  
    return Page ? <Page/> : <Error/> 
}