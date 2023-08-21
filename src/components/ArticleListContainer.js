import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import ArticleList from "./ArticleList";

const ArticleListContainerOuter = styled.div`
  margin-top: 2vh;
  height: 80vh;
`
const KeywordWrapper = styled.div`
  padding-top: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  text-align: right;
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

function ArticleListContainer({selectedKeyword, startDate, endDate}) {
    return(
      <ArticleListContainerOuter>
          <KeywordWrapper>
              <Keyword>
                  KEYWORD
              </Keyword>
              <SelectedKeyword>
                  {selectedKeyword}
              </SelectedKeyword>
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