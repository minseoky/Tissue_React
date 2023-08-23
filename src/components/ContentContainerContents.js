import Cloud from "./Cloud";
import styled from "styled-components";

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
  
`
function ContentContainerContents({wordCloudData, startDate, endDate, isPeriod, setSelectedKeyword}) {
    return(
      <Outer>
          <DateContainer>
            {isPeriod === "true" ? `${startDate.toISOString().slice(0,10)} ~ ${endDate.toISOString().slice(0,10)}` : `${startDate.toISOString().slice(0,10)}`} 의 키워드
          </DateContainer>
          <Cloud
              wordCloudData={wordCloudData}
              width={3600}
              height={2000}
              onWordClick={(event, d) => {
                  setSelectedKeyword(d.text);
              }}
          />
      </Outer>
    );
}

export default ContentContainerContents