import styled, {keyframes} from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import MainAnalyse from "./MainAnalyse";
import AnalyseCloud from "./AnalyseCloud";
import ComingSoon from "./ComingSoon";
const fadeAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const KeywordWrapper = styled.div`
  padding-right: 40px;
  text-align: left;
  animation: ${fadeAnimation} 0.5s ease-in-out both;
  border-bottom: solid gray 1px;
`
const Keyword = styled.div`
  @font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'SBAggroB';
  font-size: 36px;
  padding-bottom: 20px;
  color: ${ThemeColors.textColor1};
  margin-right: 10px;
  margin-top:10px;
  display: flex;
`
const SelectedKeyword = styled.div`
  @font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  margin-bottom: 20px;
  font-family: 'SBAggroB';
  font-size: 40px;
  color: ${ThemeColors.textColor3}
`

const InnerWrapper = styled.div`
  display: flex;
`

const QButton = styled.button`
  position: relative;
  margin-top: 10px;
  background-color: transparent;
  border: solid 3px ${ThemeColors.textColor1};
  border-radius: 5px;
  color: ${ThemeColors.textColor1};
  font-size: 20px;
  width: 30px;
  height: 30px;
  transition: scale 0.2s ease-in-out, color 0.2s ease-in-out, border 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    scale: 110%;
    border: solid 3px ${ThemeColors.textColor2};
    color: ${ThemeColors.textColor2};
  }

  /* 툴팁 스타일 */
  &:hover::before {
    content: "";
    position: absolute;
    top: -20px; /* 버튼 위에 위치 */
    left: 50%; /* 가운데 정렬 */
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-top-color: ${ThemeColors.textColor1};
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
  }

  /* 툴팁 내용 스타일 */
  &:hover::after {
    content: "${props => props.content}";
    width:200px;
    height: 50px;
    position: absolute;
    top: -92px; /* 버튼 위에 위치 */
    left: 50%; /* 가운데 정렬 */
    transform: translateX(-50%);
    background-color: white;
    border: 2px solid ${ThemeColors.textColor1};
    color: black;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

const Label = styled.div`
  text-align: center;
  margin: 0 10px 0 20px;
`

const LabelTitle = styled.div`
  color : ${ThemeColors.textColor1};
  font-size: 20px;
  margin-bottom: 10px;
`

const LabelBody = styled.div`
  color : ${
  (props => (props.value > 0 ? "red" : "blue"))
  };
  font-size: 20px;

`

const OtherContainer = styled.div`
  display: flex;
`
function AnalyseContainer({selectedKeyword, startDate, endDate, setAnalysePage}) {
    const value1 = +7.45;
    const value2 = -0.87;
    return(
        <div>
            <KeywordWrapper>
                <SelectedKeyword>
                    {selectedKeyword}
                </SelectedKeyword>
                <InnerWrapper>
                    <Keyword>
                        THEME |&nbsp;<div className={'step_7'}>테마이름</div>
                    </Keyword>
                    <QButton content={`${selectedKeyword}의 테마에 관한 설명`}> ? </QButton>
                    <div className={'step_9'} style={{display:"flex"}}>
                    <Label>
                        <LabelTitle>
                            전일대비
                        </LabelTitle>
                        <LabelBody value={value1}>
                            {value1 > 0 ? "+" + value1 : value1}%
                        </LabelBody>
                    </Label>
                    <Label>
                        <LabelTitle>
                            3일간 등락률
                        </LabelTitle>
                        <LabelBody value={value2}>
                            {value2 > 0 ? "+" + value2 : value2}%
                        </LabelBody>
                    </Label>
                    </div>
                </InnerWrapper>
            </KeywordWrapper>
            <OtherContainer>
                <MainAnalyse/>
                <AnalyseCloud/>
                <ComingSoon/>
            </OtherContainer>
        </div>
    );
}

export default AnalyseContainer