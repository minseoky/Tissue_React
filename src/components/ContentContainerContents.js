import Cloud from "./Cloud";
import styled from "styled-components";
import {useEffect, useState} from "react";

const Outer = styled.div`
  width: 100%;
  height: 80%;
  margin-top: 10%;
  @font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'SBAggroB';

  & text:hover {
    cursor: pointer;
  }
`

const DateContainer = styled.div`
  text-align: center;
  font-size: 18px;
  @media (max-width: 1024px) {
    font-size: 12px;
  }
  
`

const CloudContainer = styled.div`
  @media (max-width: 1024px) {
    margin-top: -5%;
  }
`

function ContentContainerContents({wordCloudData, startDate, endDate, isPeriod, setSelectedKeyword}) {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        // Handler to update window size
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        // Add event listener to listen for window resize
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return(
      <Outer>
          <DateContainer>
            {isPeriod === "true" ? `${startDate.toISOString().slice(0,10)} ~ ${endDate.toISOString().slice(0,10)}` : `${startDate.toISOString().slice(0,10)}`} 의 키워드
          </DateContainer>
          <CloudContainer>
              <Cloud
                  wordCloudData={wordCloudData}
                  width={width}
                  height={height}
                  onWordClick={(event, d) => {
                      setSelectedKeyword(d.text);
                  }}
              />
          </CloudContainer>
      </Outer>
    );
}

export default ContentContainerContents