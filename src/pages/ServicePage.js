import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeColors from "../color_config/ThemeColors";
import ContentContainerContents from "../components/ContentContainerContents";
import ArticleListContainer from "../components/ArticleListContainer";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {ImArrowLeft2} from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import Joyride from "react-joyride";

const TabContainer = styled.div`
  position: absolute;
  margin-left: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TabButton = styled.button`
  font-size: 28px;
  background-color: ${ThemeColors.tapBackgroundColor};
  border: ${ThemeColors.contentContainerColor} 1px solid;
  border-radius: 0 5px 5px 0;
  border-left: none;
  cursor: pointer;
  color:black;
  padding: 15px 0 11px 0;
`;

const ContentContainer = styled.div`
  position: absolute;
  left: ${({ open }) => (open ? '0%' : '-30.2vw')};
  width: 30vw;
  height: 50vh;
  margin-top: 10vh;
  background-color: ${ThemeColors.contentContainerBackgroundColor};
  border: ${ThemeColors.contentContainerColor} 1px solid;
  backdrop-filter: blur(9px);
  border-radius: 0 15px 15px 0;
  transition: left 0.3s;
  z-index: 1;
  box-shadow:
          0px 6px 8px rgba(0, 0, 0, 0.1),
            0px -6px 8px rgba(0, 0, 0, 0.1),
          6px 0px 8px rgba(0, 0, 0, 0.1),
          -6px 0px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 624px) {
    left: ${({ open }) => (open ? '0%' : '-50.2vw')};
    width: 50vw;
    height: 50vh;
  }
`;

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

const BackButton = styled.button`
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: none;
  color:black;
  background-color: ${ThemeColors.backButtonColor1};
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  margin : 1%;

  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color:  ${ThemeColors.backButtonColor2}; /* Change the background color on hover */
  }
`

function ServicePage() {
    const { state } = useLocation();
    const [tabOpen, setTabOpen] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState(state.selectedKeyword);
    const [runTour, setRunTour] = useState(false);

    const steps = [
        {
            target: '.step_1', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '이 버튼을 눌러 이전 페이지로 돌아갑니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_2', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '이곳에서 현재 키워드 및 날짜를 확인합니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_3', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '요약된 기사들이 이렇게 표시됩니다. 원문을 읽고 싶다면 클릭하세요. 기사가 여러개라면 옆으로 슬라이드 하여 더 읽을 수 있습니다.', // 가이드 텍스트
            disableBeacon: true,
        },
        {
            target: '.step_4', // 가이드할 요소의 선택자 (적절한 선택자로 변경해야 함)
            content: '이 버튼을 눌러 워드 클라우드를 볼 수 있습니다. 키워드를 클릭하면 현재 페이지에서 변경됩니다!', // 가이드 텍스트
            disableBeacon: true,
        },
        // 추가적인 스텝들...
    ];
    const toggleTab = () => {
        console.log(state);
        setTabOpen(!tabOpen);
    };

    const wordCloudData = state.wordCloudData;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const isPeriod = state.isPeriod;
    const navigate = useNavigate();


    const HandleOnClick2 = () => {
        navigate('/', { state: {startDate, endDate, isPeriod } });
    }
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
            <BackButton onClick={HandleOnClick2}><div className={'step_1'}><ImArrowLeft2/></div></BackButton>
            <ContentContainer open={tabOpen}>
                <TabContainer>
                    <div className={'step_4'}>
                    <TabButton onClick={toggleTab}>
                        {tabOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
                    </TabButton>
                    </div>
                </TabContainer>
                <ContentContainerContents
                    wordCloudData={wordCloudData}
                    startDate={startDate}
                    endDate={endDate}
                    isPeriod={isPeriod}
                    setSelectedKeyword={setSelectedKeyword}
                />
            </ContentContainer>
            <ArticleListContainer
                isPeriod={isPeriod}
                selectedKeyword={selectedKeyword}
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    );
}

export default ServicePage;
