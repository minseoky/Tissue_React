import React, { useState } from "react";
import Label from "./Label";
import styled from "styled-components";
import MainBox from "./MainBox";
import ThemeColors from "../color_config/ThemeColors";
import Slider from "react-input-slider";

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5%;
`;

const ToggleContainer = styled.div`
  background-color:  ${props => (props.period === "true" ? ThemeColors.switchActiveColor : "darkgray")};
  height: 30px;
  width: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  border-radius: 15px;
  cursor: pointer;
  margin: 5px;
`;

const ToggleButton = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${props => (props.active === "true" ? "white" : "transparent")};
`;

const ToggleContainerOuter = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 5%;
  @media (max-width: 1024px) {
    font-size: 0px;
  }
`

const KeywordQuantity = styled.div`
  align-items: center;
  margin-left: auto;
  @media (max-width: 1024px) {
    font-size: 14px;
    position: absolute;
    margin-bottom: 50px;
  }
`
const StyledSlider = styled(Slider)`
    margin: 0 10px 0 10px;
`

function MainContainer({isPeriodDefault, endDateDefault, startDateDefault}) {
    const [tCloudActive, setTCloudActive] = useState("true");
    const [tChartActive, setTChartActive] = useState("false");
    const [periodToggle, setPeriodToggle] = useState(isPeriodDefault ? isPeriodDefault : "false");
    const [keywordQuantity, setKeywordQuantity] = useState(10);

    const handleTCloudClick = () => {
        setTCloudActive("true");
        setTChartActive("false");
    };

    const handleTChartClick = () => {
        setTCloudActive("false");
        setTChartActive("true");
    };
    const handleToggleClick = () => {
        if(periodToggle === "true"){
            setPeriodToggle("false");
        }
        else{
            setPeriodToggle("true");
        }
    };


    return (
        <div>
            <LabelContainer>
                <Label
                    active={tCloudActive}
                    labelName={"T CLOUD"}
                    onClick={handleTCloudClick} // 클릭 시 상태 변경
                />
                <Label
                    active={tChartActive}
                    labelName={"T CHART"}
                    onClick={handleTChartClick} // 클릭 시 상태 변경
                />

                <KeywordQuantity>
                    키워드 개수:
                    <StyledSlider
                        axis="x"
                        xstep={1}
                        xmin={10}
                        xmax={20}
                        x={keywordQuantity}
                        onChange={({ x }) => setKeywordQuantity(x)}
                        styles={{
                            track: {
                                backgroundColor: ThemeColors.slideBackgroundColor
                            },
                            active: {
                                backgroundColor: ThemeColors.slideActiveColor
                            },
                        }}
                    />
                    {keywordQuantity}
                </KeywordQuantity>

                <ToggleContainerOuter>
                    주간 키워드로 보기
                    <ToggleContainer onClick={handleToggleClick} period={periodToggle}>
                        <ToggleButton active={periodToggle === "true" ? "false" : "true"} />
                        <ToggleButton active={periodToggle} />
                    </ToggleContainer>
                </ToggleContainerOuter>
            </LabelContainer>
            <MainBox
                active={tCloudActive === "true" ? "cloud" : "chart"}
                isPeriod={periodToggle}
                keywordQuantity={keywordQuantity}
                endDateDefault={endDateDefault}
                startDateDefault={startDateDefault}
            />
        </div>
    );
}

export default MainContainer;
