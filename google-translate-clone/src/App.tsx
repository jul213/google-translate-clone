import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { useRedu } from "./hooks/initialRed"
import { Container, Row, Col, Button, Stack } from "react-bootstrap"
import { AUTO_LANGUAGE } from "./constants"
import { LanguageSelector } from "./components/LanguageSelector"
import { TextArea } from "./components/TextArea"
import { SectionType } from "./types.d"
import { useEffect } from "react"
import { useDebounce } from "./hooks/useDebounce"
import { ArrowsIcon, ClipboardIcon } from "./components/icons"


function App() {
 const { loading,fromLanguage, toLanguaje, result, fromText, setToLanguage, interchangeLanguages, setFromLanguage, setFromText, setResult, translateText
  } =  useRedu()

  const debounceFromText = useDebounce(fromText, 250)

 useEffect(() => {
  if (debounceFromText !== '') {
    const timerId = setTimeout(() => {
      translateText()
    }, 500)  // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timerId)
  }
}, [debounceFromText, fromLanguage, toLanguaje, translateText])
  return (
    
    <Container fluid>
    <h1>google translate</h1>

    <Row>
      <Col>
      <Stack gap={2}>
         <LanguageSelector
          type="from"
          value={fromLanguage}
         onChange={setFromLanguage} />
         <TextArea
         type = {SectionType.From}
         value={fromText}
         onChange={setFromText}
         />
         </Stack>
      </Col>

      <Col xs="auto">
          <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
      </Col>

      <Col>
      <Stack gap={2}>
      <LanguageSelector 
      type="to"
      value={toLanguaje}
      onChange={setToLanguage} 
       />
       <div style={{position: "relative"}}>
      <TextArea
         loading={ loading }
         type = {SectionType.To}
         value= {result}
         onChange={setResult}
         />
         <Button variant="link"
         style={{position: "absolute", left:0, bottom: 0}}
         onClick={() => { navigator.clipboard.writeText(result).catch(() => {})}}>
          <ClipboardIcon />
         </Button>
         </div>
         </Stack>
         
      </Col>
    </Row>
    </Container>
  )
}

export default App
