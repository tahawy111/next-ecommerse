import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import useLocalStorage from 'use-local-storage'

const ThemeChanger = () => {

    const [theme, setTheme] = useState(null)

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
        if (window.localStorage.theme)
            setTheme(window.localStorage.theme)
    }, [])

    console.log(theme)

    return (
        <label className='swap swap-rotate swap-on'>
            <input type="checkbox" />

            {theme !== null && theme === "dark" ? <>
            
            
            <span data-set-theme="light" className="swap-on material-icons-outlined">
                dark_mode
            </span>

                <span data-set-theme="dark" className="swap-off material-icons-outlined">
                    light_mode
                </span></> : <>


                <span data-set-theme="dark" className="swap-on material-icons-outlined">
                    light_mode
                </span>
                <span data-set-theme="light" className="swap-off material-icons-outlined">
                    dark_mode
                </span>

            </>}

        </label>
    )
}

export default ThemeChanger
