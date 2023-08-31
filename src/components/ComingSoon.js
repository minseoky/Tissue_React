import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";

const MainContainer = styled.div`
  width: 22vw;
  height: 440px;
  margin: 20px 5px 20px 10px;
  border-radius: 15px;
  box-shadow:
          0px 6px 8px rgba(0, 0, 0, 0.1),
            0px -6px 8px rgba(0, 0, 0, 0.03),
          6px 0px 8px rgba(0, 0, 0, 0.03),
          -6px 0px 8px rgba(0, 0, 0, 0.03);
  font-size: 25px;
  color: ${ThemeColors.textColor1};
  display: flex;
  justify-content: center;
  align-items: center;
  
`

function ComingSoon() {
    return(
        <MainContainer>
            Coming Soon
        </MainContainer>
    );
}

export default ComingSoon;