import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeColors from "../color_config/ThemeColors";
import ContentContainerContents from "../components/ContentContainerContents";
import ArticleListContainer from "../components/ArticleListContainer";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {ImArrowLeft2} from "react-icons/im";
import { useNavigate } from 'react-router-dom';

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
  padding: 15px 0 11px 0;
`;

const ContentContainer = styled.div`
  position: absolute;
  left: ${({ open }) => (open ? '0%' : '-25.2vw')};
  width: 25vw;
  height: 40vh;
  margin-top: 10vh;
  background-color: ${ThemeColors.tapBackgroundColor};
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
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: none;
  background-color: ${ThemeColors.backButtonColor1};
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  margin : 20px;

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
    const toggleTab = () => {
        setTabOpen(!tabOpen);
    };

    const wordCloudData = state.wordCloudData;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const isPeriod = state.isPeriod;
    const navigate = useNavigate();
    const HandleOnClick = () => {
        navigate('/', { state: {startDate, endDate, isPeriod } });
    }
    return (
        <div>
            <BackButton onClick={HandleOnClick}><ImArrowLeft2/></BackButton>
            <ContentContainer open={tabOpen}>
                <TabContainer>
                    <TabButton onClick={toggleTab}>
                        {tabOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
                    </TabButton>
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
