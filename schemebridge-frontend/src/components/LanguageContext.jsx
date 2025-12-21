import { createContext, useState, useContext } from "react";
import { translations } from "../translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState("ta"); // Defaulting to Tamil for "Wow" factor in demo

    const t = (key) => translations[lang][key] || key;

    const toggleLanguage = () => {
        setLang((prev) => (prev === "en" ? "ta" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
