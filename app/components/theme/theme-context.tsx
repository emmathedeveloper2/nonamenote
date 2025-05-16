import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ThemeContextProps} from "~/index";

const THEMES = [
    'amethyst-haze',
    'northern-lights'
]

const ThemeContext = createContext<ThemeContextProps>({} as any)

export const ThemeProvider = ({ children } : { children: ReactNode }) => {

    const [theme, setThemeState] = useState(THEMES[0])

    const [isDark, setIsDarkState] = useState(true)

    const setTheme = (theme: string) => {
        setThemeState(theme)

        document.body.setAttribute('data-theme' , theme)

        localStorage.setItem('theme' , theme)
    }

    const setIsDark = (isDark: boolean) => {
        setIsDarkState(isDark)

        if(isDark){
            document.body.classList.add("dark")
        }else {
            document.body.classList.remove("dark")
        }

        localStorage.setItem('isDark' , JSON.stringify(isDark))
    }

    useEffect(() => {
        setTheme(localStorage.getItem('theme') || THEMES[0])
        setIsDark(JSON.parse(localStorage.getItem('isDark') ?? 'true'))
    }, []);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            isDark,
            setIsDark
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext<ThemeContextProps>(ThemeContext)