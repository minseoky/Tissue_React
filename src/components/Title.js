import styled from "styled-components";
import tissue_img from "../imgs/Tissue.png"




const TitleContainer = styled.div`
  font-size: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  padding-top: 20px;
  @font-face {
    font-family: 'BMDOHYEON';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: "BMDOHYEON";
  @media (max-width: 624px) {
    font-size: 36px;
  }
`

const StyledImg = styled.img`
  width: 78px;
  height: 84px;
  @media (max-width: 624px) {
    width: 48px;
    height: 54px;
  }
`

function Title(){


    return(
        <TitleContainer>
            <StyledImg src={tissue_img}/>
            TISSUE
        </TitleContainer>
    );
}

export default Title