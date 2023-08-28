import React, { useState } from "react";
import Label from "./Label";
import styled from "styled-components";
import MainBox from "./MainBox";
import ThemeColors from "../color_config/ThemeColors";
import Slider from "react-input-slider";
import Joyride from "react-joyride";

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
    font-size: 0;
  }
  @media (max-width: 624px) {
    scale: 90%;
    margin-bottom: 10px;
  }
  
`

const KeywordQuantity = styled.div`
  align-items: center;
  margin-left: auto;
  @media (max-width: 1024px) {
    font-size: 15px;
  }
  @media (max-width: 624px) {
    position: absolute;
    left: 11%;
    margin-bottom: 80px;
    scale:80%;
  }
  
`

const QuantityLabel = styled.div`
  font-size: 15px;
  
  @media (max-width: 1024px) {
    font-size: 0px;
  }
  @media (max-width: 624px) {
    font-size: 15px;
  }
`
const StyledSlider = styled(Slider)`
    margin: 0 10px 0 10px;
`

const JoyrideButton = styled.button`
  position: absolute;
  top: 8px;
  right: 16%;
  border-radius: 12px;
  background-color: transparent;
  border: none;
  width: auto;
  height: 40px;
  text-align: center;
  color: black;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out, scale 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${ThemeColors.cloudTextColor1};
    scale: 110%;
  }
`

function MainContainer({isPeriodDefault, endDateDefault, startDateDefault}) {
    const [tCloudActive, setTCloudActive] = useState("true");
    const [tChartActive, setTChartActive] = useState("false");
    const [periodToggle, setPeriodToggle] = useState(isPeriodDefault ? isPeriodDefault : "false");
    const [keywordQuantity, setKeywordQuantity] = useState(10);
    const [runTour, setRunTour] = useState(false);

    const steps = [
        {
            target: '.step_1', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '이곳에서 자료 타입을 결정합니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_2', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '이곳에서 보고싶은 키워드 개수를 지정합니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_3', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '이곳에서 다중 기간을 설정할 수 있습니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_4', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '이곳에서 원하는 날짜를 선택합니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_5', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '키워드를 클릭하면 세부 페이지로 이동합니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_6', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '원하는 키워드를 클릭하여 차트를 표시합니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        // 추가적인 스텝들...
    ];

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
            <Joyride
                steps={steps}
                run={runTour}
                continuous
                showSkipButton
                styles={{
                    options: {
                        arrowColor: '#fff',
                        backgroundColor: '#fff',
                        beaconSize: 36,
                        overlayColor: 'rgba(0, 0, 0, 0.5)',
                        primaryColor: ThemeColors.cloudTextColor1,
                        spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                        textColor: '#333',
                        width: undefined,
                        zIndex: 100,
                    }
                }}
                callback={(data) => {
                    // 투어 진행 상태에 따른 콜백 처리
                }}
            />
            <JoyrideButton onClick={() => setRunTour(prevRunTour => !prevRunTour)}>HELP</JoyrideButton>
            <LabelContainer>
                <div className={"step_1"} style={{display: "flex"}}>
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
                </div>
                <KeywordQuantity>
                    <div className={"step_2"} style={{display: "flex"}}>
                        <QuantityLabel>키워드 개수:</QuantityLabel>
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
                    </div>
                </KeywordQuantity>

                <ToggleContainerOuter>
                    주간 키워드로 보기
                    <div className={"step_3"} style={{display: "flex"}}>
                    <ToggleContainer onClick={handleToggleClick} period={periodToggle}>
                        <ToggleButton active={periodToggle === "true" ? "false" : "true"} />
                        <ToggleButton active={periodToggle} />
                    </ToggleContainer>
                    </div>
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
