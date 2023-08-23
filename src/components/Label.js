import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";

const LabelContainer = styled.button`
  @font-face {
    font-family: 'KorailRoundGothicBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KorailRoundGothicBold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  font-family: 'KorailRoundGothicBold';
  color: black;
  border: 0;
  background-color: ${props => props.backcolor};
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  position: relative;
  padding-top: 15px;
  font-size: 20px;
  height:  ${props => props.pixel + 50}px;
  width: 115px;
  border-radius: 15px 15px 0 0;
  margin-right: 8px;
  margin-top: ${props => 4 - props.pixel}px;
  margin-bottom: -4px;
  transition: transform 0.2s ease; /* 변환에 애니메이션 적용 */
  z-index: 2;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    height:  ${props => props.pixel + 28}px;
    margin-top: ${props => 8 - props.pixel}px;
    padding-top: 10px;
  }
`;


function Label({active, labelName, onClick}) {
    return(
      <LabelContainer
          pixel={active === "true" ? 4 : 0}
          backcolor={active === "true" ? ThemeColors.labelColorActive : ThemeColors.labelColorDeactivated}
          onClick={onClick}
      >
          {labelName}
      </LabelContainer>
    );
}

export default Label