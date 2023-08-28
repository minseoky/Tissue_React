import styled, {keyframes} from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import ArticleList from "./ArticleList";

const fadeAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ArticleListContainerOuter = styled.div`
  margin-top: 2vh;
  height: 80vh;
`
const KeywordWrapper = styled.div`
  padding-right: 40px;
  padding-bottom: 40px;
  text-align: right;
  animation: ${fadeAnimation} 0.5s ease-in-out both;
`
const Keyword = styled.div`
  @font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'SBAggroB';
  font-size: 40px;
  padding-bottom: 20px;
  color: ${ThemeColors.textColor1}
`
const SelectedKeyword = styled.div`
  @font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'SBAggroB';
  font-size: 40px;
  color: ${ThemeColors.textColor3}
`

const DateViewer = styled.div`
  font-size: 15px;
  color: ${ThemeColors.textColor1};
  margin: 15px 0 -15px 0;
`
function ArticleListContainer({selectedKeyword, startDate, endDate, isPeriod}) {
    return(
      <ArticleListContainerOuter>
          <KeywordWrapper>
              <div className={'step_2'}>
                  <Keyword>
                      KEYWORD
                  </Keyword>
                  <SelectedKeyword>
                      {selectedKeyword}
                  </SelectedKeyword>
                  <DateViewer>
                      {isPeriod === "true" ? `${startDate.toISOString().slice(0,10)} ~ ${endDate.toISOString().slice(0,10)}` : `${startDate.toISOString().slice(0,10)}`} 의 키워드
                  </DateViewer>
              </div>
          </KeywordWrapper>
          <ArticleList
              startDate={startDate}
              endDate={endDate}
              selectedKeyword={selectedKeyword}
          />
      </ArticleListContainerOuter>
    );
}

export default ArticleListContainer