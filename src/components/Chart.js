import styled from "styled-components";
import {useEffect, useState} from "react";
import ThemeColors from "../color_config/ThemeColors";
import ChartContainer from "./ChartContainer";


const Outer = styled.div`
  height: 80%;
`
const KeywordList = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
  @media (max-width: 1024px) {
    gap: 12px;
  }
  @media (max-width: 624px) {
    gap: 6px;
  }
`;

const Keyword = styled.span`
  font-size: 17px;
  cursor: pointer;
  font-weight: ${(props) => (props.ishighlighted === "true" ? "bold" : "normal")};
  color: ${(props) => (props.ishighlighted === "true" ? ThemeColors.textColor4 : ThemeColors.textColor2)};
  background-color: ${(props) => (props.ishighlighted === "true" ? ThemeColors.switchActiveColor : "transparent")};
  transition: font-weight 0.2s ease-in-out, color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  padding: 3px;
  border-radius: 3px;
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  @media (max-width: 624px) {
    font-size: 13px;
  }
`;
function Chart({isPeriod, endDate, startDate, wordCloudData}) {
    const [highlightedKeywords, setHighlightedKeywords] = useState([]);

    const toggleKeywordHighlight = (keyword) => {
        if (highlightedKeywords.includes(keyword)) {
            setHighlightedKeywords(
                highlightedKeywords.filter((kw) => kw !== keyword)
            );
        } else {
            setHighlightedKeywords([...highlightedKeywords, keyword]);
        }
    };

    useEffect(() => {
        setHighlightedKeywords([]);
    },[startDate, endDate])
    return(
        <Outer>
            <div className={"step_6"}>
                <KeywordList>
                    {wordCloudData.map((data, index) => (
                        <Keyword
                            key={index}
                            ishighlighted={highlightedKeywords.includes(data.text) ? "true" : "false"}
                            onClick={() => toggleKeywordHighlight(data.text)}
                        >
                            {data.text}
                        </Keyword>
                    ))}
                </KeywordList>
            </div>
            <ChartContainer isPeriod={isPeriod} endDate={endDate} startDate={startDate} wordCloudData={wordCloudData} highlightedKeywords={highlightedKeywords}/>

        </Outer>
    );
}

export default Chart