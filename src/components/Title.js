import styled from "styled-components";


const TitleContainer = styled.div`
  font-size: 54px;
  text-align: center;
  padding-top: 25px;
  @font-face {
    font-family: 'BMDOHYEON';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: "BM Dohyeon";
`

function Title(){
    return(
        <TitleContainer>
            TISSUES
        </TitleContainer>
    );
}

export default Title