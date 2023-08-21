import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ThemeColors from "../color_config/ThemeColors";
import ContentContainerContents from "../components/ContentContainerContents";
import ArticleListContainer from "../components/ArticleListContainer";

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
  border: black 1px solid;
  border-radius: 0 5px 5px 0;
  border-left: none;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  position: absolute;
  left: ${({ open }) => (open ? '0%' : '-25.2vw')};
  width: 25vw;
  height: 80vh;
  background-color: ${ThemeColors.tapBackgroundColor};
  border: black 1px solid;
  border-radius: 0 15px 15px 0;
  transition: left 0.3s;
  z-index: 10;
`;

function ServicePage() {
    const [tabOpen, setTabOpen] = useState(false);

    const toggleTab = () => {
        setTabOpen(!tabOpen);
    };

    const { state } = useLocation();
    const selectedKeyword = state.selectedKeyword;
    const wordCloudData = state.wordCloudData;
    const startDate = state.startDate;
    const endDate = state.endDate;
    const isPeriod = state.isPeriod;
    return (
        <div>
            <ContentContainer open={tabOpen}>
                <TabContainer>
                    <TabButton onClick={toggleTab}>{tabOpen ? '<' : '>'}</TabButton>
                </TabContainer>
                <ContentContainerContents
                    wordCloudData={wordCloudData}
                    startDate={startDate}
                    endDate={endDate}
                    isPeriod={isPeriod}
                />
            </ContentContainer>
            <ArticleListContainer
                selectedKeyword={selectedKeyword}
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    );
}

export default ServicePage;
