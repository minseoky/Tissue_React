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
  
`

const StyledImg = styled.img`
  width: 78px;
  height: 84px;
`

function Title(){


    return(
        <TitleContainer>
            <StyledImg src={tissue_img}/>
            TISSUES
        </TitleContainer>
    );
}

export default Title