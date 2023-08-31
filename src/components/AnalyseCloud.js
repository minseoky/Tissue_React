import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";

const MainContainer = styled.div`
  
`
const CloudContainer = styled.div`
  width: 20vw;
  height: 210px;
  margin: 20px 10px 20px 20px;
  border-radius: 15px;
  box-shadow:
          0px 6px 8px rgba(0, 0, 0, 0.1),
            0px -6px 8px rgba(0, 0, 0, 0.03),
          6px 0px 8px rgba(0, 0, 0, 0.03),
          -6px 0px 8px rgba(0, 0, 0, 0.03);
  font-size: 16px;
  color: ${ThemeColors.textColor1};
  display: flex;
  justify-content: center;
  align-items: center;
`
function AnalyseCloud() {
    return(
        <MainContainer>
            <div className={'step_10'}>
                <CloudContainer>
                    테마와 관련된 키워드들이 들어갑니다.
                </CloudContainer>
            </div>
            <div className={'step_8'}>
                <CloudContainer>
                    키워드와 관련된 테마들이 들어갑니다.
                </CloudContainer>
            </div>
        </MainContainer>
    );
}

export default AnalyseCloud;