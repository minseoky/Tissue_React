import tissue_gif from "../imgs/Tissue.gif"
import styled from "styled-components";


const ImgContainer = styled.div`
    text-align: center;
  margin-top: -150px;
  scale: 310%;
`
function LoadingImg() {
    return(
        <ImgContainer>
            <img src={tissue_gif} width={"20%"} height={"20%"}/>
        </ImgContainer>
    );
}

export default LoadingImg;