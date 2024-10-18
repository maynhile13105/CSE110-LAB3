import { useState, useEffect } from "react";
import { ThemeContext, themes } from "./ThemeContext";


function ToggleTheme(){
    const [currentTheme, setCurrentTheme] = useState(themes.light);
    
    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
    
    useEffect(()=>{
        document.body.style.color = currentTheme.fontColor;
        document.body.style.backgroundColor = currentTheme.bodyBackground;    
    })
    return(
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme} style={{ padding: "8px", cursor: "pointer", gap: "15px", display: "grid"}}>Toggle Theme</button>
        </ThemeContext.Provider>
    );
}
export default ToggleTheme;