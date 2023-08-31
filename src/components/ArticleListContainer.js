import styled, {keyframes} from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import ArticleList from "./ArticleList";
import {useState} from "react";
import AnalyseContainer from "./AnalyseContainer";

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

const AnalyseLink = styled.div`
  text-decoration: underline;
  font-size: 17px;
  color: ${ThemeColors.textColor1};
  margin: 12px 0 -12px 0;
  &:hover{
    cursor: pointer;
    color: ${ThemeColors.textColor2};
  }
`
function ArticleListContainer({selectedKeyword, startDate, endDate, isPeriod, analysePage, setAnalysePage}) {

    const AnalyseLinkClickHandler = () =>{
        setAnalysePage(!analysePage);
    }
    return(
        <div>
        {
            analysePage === true ? <AnalyseContainer
                    selectedKeyword={selectedKeyword}
                    startDate={startDate}
                    endDate={endDate}
                    setAnalysePage={setAnalysePage}
                /> :
                <ArticleListContainerOuter>
                    <KeywordWrapper>
                        <div className={'step_2'}>
                            <Keyword>
                                KEYWORD
                            </Keyword>
                            <SelectedKeyword>
                                {selectedKeyword}
                            </SelectedKeyword>
                            <AnalyseLink onClick={() => AnalyseLinkClickHandler()}>
                                주식 분석 더 보기>>
                            </AnalyseLink>
                        </div>
                    </KeywordWrapper>
                    <ArticleList
                        startDate={startDate}
                        endDate={endDate}
                        selectedKeyword={selectedKeyword}
                    />
                </ArticleListContainerOuter>
        }
        </div>
    );
}

export default ArticleListContainer