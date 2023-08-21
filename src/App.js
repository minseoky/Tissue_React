import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IntroPage from "./pages/IntroPage";
import ServicePage from "./pages/ServicePage";
import NotFoundPage from "./pages/NotFoundPage";
import styled, {createGlobalStyle} from "styled-components";
import Today from "./components/Today";
import ThemeColors from "./color_config/ThemeColors";
import reset from "styled-reset";

const DefaultContainer = styled.div`
    background-color: ${ThemeColors.backgroundColor1};
  margin: 0px 15% 0px 15%;
    
`
const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    margin: 0;
    padding: 0;
  }
`

function App() {

  return (
      <DefaultContainer>
          <GlobalStyle />
          <Today/>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<IntroPage />} />
                  <Route path="/service" element={<ServicePage />} />
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </BrowserRouter>
      </DefaultContainer>

  );
}

export default App;
