import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import Typewriter from "typewriter-effect";

const SloganContainer = styled.div`
  text-align: center;
  color: ${ThemeColors.textColor2};
  padding-bottom: 10px;
  white-space: nowrap; /* Prevent line breaks */
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
                    strings: ['세상을 바꾸는 한 입 뉴스'],
                    autoStart: true,
                    loop: true,
                    pauseFor: 20000
                }}
            />
        </SloganContainer>
    );
}

export default Slogan