import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import Typewriter from "typewriter-effect";

const SloganContainer = styled.div`
  text-align: center;
  color: ${ThemeColors.textColor2};
  padding-bottom: 6px;
  padding-top:8px;
  white-space: nowrap; /* Prevent line breaks */
  @media (max-width: 624px) {
    margin-bottom: 30px;
  }
`

function Slogan() {
    return(
        <SloganContainer>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter.typeString('')
                        .pauseFor(2500)
                        .deleteAll()
                        .start();
                }}
                options={{
                    strings: ['티슈처럼 쏙- 모든 주식 이슈를 한 번에'],
                    autoStart: true,
                    loop: true,
                    pauseFor: 20000
                }}
            />
        </SloganContainer>
    );
}

export default Slogan