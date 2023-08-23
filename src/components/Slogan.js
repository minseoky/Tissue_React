import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";

const SloganContainer = styled.div`
  text-align: center;
  color: ${ThemeColors.textColor2};
  padding-bottom: 10px;
`

function Slogan() {
    return(
        <SloganContainer>
            "세상을 바꾸는 한 입 뉴스"
        </SloganContainer>
    );
}

export default Slogan