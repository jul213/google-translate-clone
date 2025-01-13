import { useReducer } from "react"
import { Action, FromLanguage, Language, type State } from "../types.d"
import { AUTO_LANGUAGE } from "../constants"


export const initialState: State = {
  fromLanguage: "auto",
  toLanguaje: "en",
  fromText: "",
  result: "",
  loading: false

 }

 type TranslationDictionary = {
  [key: string]: string;
};

 const translations: Record<Language, TranslationDictionary> = {
  es: {
    hello: "hola",
    world: "mundo",
    goodbye: "adiós",
    // Añade más traducciones según sea necesario
  },
  en: {
    hello: "hello",
    world: "world",
    goodbye: "goodbye",
    // Añade más traducciones en inglés si es necesario
  },
  // Puedes agregar más idiomas aquí
  de: {
    hello: "Hallo",
    world: "wereld",
    goodbye: "tot ziens"
  }
};

 export function reducer(state: State, action: Action) {
  const { type } = action

  if (type === "INTERCHANGE_LANGUAGES") {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ""
    return { 
      ...state,
      loading: loading,
      result: "",
      fromLanguage: state.toLanguaje,
      toLanguaje: state.fromLanguage
    }
  }

  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === "SET_TO_LANGUAGE") {
     return {
      ...state,
      toLanguaje: action.payload
     }
  }

  if (type === "SET_FROM__TEXT") {
    return {
     ...state,
     loading: true,
     fromText: action.payload,
     result:  ""
    }
 }

 if (type === "SET_RESULT") {
  return {
   ...state,
   loading: false,
   result: action.payload
  }

  
}

if (type === "SET_LOADING") {
  return {
    ...state,
    loading: action.payload
  }
}

  return state

 }

 export function useRedu () {

    const [{
        fromLanguage,
        toLanguaje,
        fromText,
        result,
        loading
    },  dispatch] = useReducer(reducer, initialState)

    const interchangeLanguages = () => {
        dispatch({type: "INTERCHANGE_LANGUAGES"})
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({type: "SET_FROM_LANGUAGE", payload})
    }

    const setToLanguage = (payload: Language) => {
        dispatch({type: "SET_TO_LANGUAGE", payload})
    }

    const setFromText = (payload: string) => {
        dispatch({type: "SET_FROM__TEXT", payload})
    }

    const setResult = (payload: string) => {
        dispatch({type: "SET_RESULT", payload})
    }

   
    
    const translateText = () => {
      if (fromText === '') return;
    
      dispatch({ type: 'SET_LOADING', payload: true });
    
      try {
        const words = fromText.toLowerCase().split(' ');
        const translatedWords = words.map(word => 
          translations[toLanguaje]?.[word] || word
        );
    
        setResult(translatedWords.join(' '));
      } catch (error) {
        console.error('Translation error:', error);
        setResult('Error en la traducción');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
        

    return {
        fromLanguage,
        toLanguaje,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
        translateText
    }
 }