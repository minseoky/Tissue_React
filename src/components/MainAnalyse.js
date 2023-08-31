import styled from "styled-components";

const MainRankContainer = styled.div`
  width: 24vw;
  height: 440px;
  margin: 20px 0 20px 10px;
  border-radius: 15px;
  overflow: scroll;
  box-shadow:
          0px 6px 8px rgba(0, 0, 0, 0.1),
            0px -6px 8px rgba(0, 0, 0, 0.03),
          6px 0px 8px rgba(0, 0, 0, 0.03),
          -6px 0px 8px rgba(0, 0, 0, 0.03);
`
const StockInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const StockInfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 15px;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ChangeContainer = styled.div`
  color: ${(props) => (props.addon ? "red" : "blue")};
`
function StockInfo({ name, price, change, changePercentage, addon }) {
    return (
        <StockInfoRow>
            <div style={{color:"gray"}}>{name}</div>
            <div style={{color:"gray"}}>{price}</div>
            <ChangeContainer addon={addon}>{change}</ChangeContainer>
            <ChangeContainer addon={addon}>{changePercentage}</ChangeContainer>
        </StockInfoRow>
    );
}
function MainAnalyse() {
    return (
        <div className={'step_11'}>
            <MainRankContainer>
                <StockInfoContainer>
                    <StockInfo name="SK하이닉스" price="2750" change="▲460" changePercentage="+20.09%" addon={true}/>
                    <StockInfo name="삼성전자" price="7100" change="▲200" changePercentage="+2.9%" addon={true}/>
                    <StockInfo name="DB하이텍" price="33250" change="▲250" changePercentage="+0.76%" addon={true}/>
                    <StockInfo name="솔브레인홀딩스" price="1040" change="▼110" changePercentage="-9.7%" addon={false}/>
                    <StockInfo name="웰덱스" price="20000" change="▲150" changePercentage="+0.76%" addon={true}/>
                    <StockInfo name="엠케이전자" price="2875" change="▲125" changePercentage="+4.55%" addon={true}/>
                    <StockInfo name="비씨엔씨" price="1040" change="▲1040" changePercentage="+4.55%" addon={true}/>
                    <StockInfo name="덕산테크피아" price="9250" change="▲110" changePercentage="+12.67%" addon={true}/>
                    <StockInfo name="케이시텍" price="1040" change="▼110" changePercentage="-9.7%" addon={false}/>
                    <StockInfo name="디엔에프" price="9250" change="▲110" changePercentage="+12.67%" addon={true}/>
                    {/* Add more StockInfo components here */}
                </StockInfoContainer>
            </MainRankContainer>
        </div>
    );
}

export default MainAnalyse;