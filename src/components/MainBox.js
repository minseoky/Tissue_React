import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import Cloud from "./Cloud";
import Chart from "./Chart";
import PeriodSelector from "../cloud_components/PeriodSelector";
import DailySelector from "../cloud_components/DailySelector";
import { useNavigate } from 'react-router-dom';
import LoadingImg from "./LoadingImg";


export const cloudSizeValue = 1500;

const MainBoxContainerOuter = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  z-index: 3;
  position: relative;
`

const MainBoxContainer = styled.div`
  background-color: ${ThemeColors.containerColor1};
  width:94%;
  height: 65vh;
  border-radius: 15px;
  box-shadow:
          0px 6px 8px rgba(0, 0, 0, 0.05),
            0px -6px 8px rgba(0, 0, 0, 0.05),
          6px 0px 8px rgba(0, 0, 0, 0.05),
          -6px 0px 8px rgba(0, 0, 0, 0.05);
`

const LoadingComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 30px;
  color: black; /* Set initial color */
`

const CloudContainer = styled.div`
  height: 80%;
  margin-top: -30px;
  background-color: transparent;
  & text:hover {
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    margin-top: -80px;
  }
`



function MainBox({active, isPeriod, keywordQuantity, endDateDefault, startDateDefault}) {
    const [startDate, setStartDate] = useState(startDateDefault ? startDateDefault : new Date());
    const [endDate, setEndDate] = useState(endDateDefault ? endDateDefault : new Date());
    const [wordCloudData, setWordCloudData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const navigate = useNavigate();


    useEffect(() => {
        // Handler to update window size
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        // Add event listener to listen for window resize
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);

        if (isPeriod === "false") {
            setEndDate(startDate);
        }

        async function fetchDataForDate(date) {
            const apiUrl = `/api/hot_keywords?date=${date.toISOString().slice(0, 10)}&topN=${keywordQuantity}`;
            try {
                const response = await fetch(apiUrl);
                console.log(response);
                const jsonData = await response.json();
                return jsonData.map(item => ({ text: item.keyword, value: item.value * cloudSizeValue }));
            } catch (error) {
                console.error("Error fetching word cloud data for date:", date, error);
                return [];
            }
        }

        async function fetchData() {
            const dateList = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dateList.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const fetchedDataList = await Promise.all(dateList.map(date => fetchDataForDate(date)));

            // Combine fetched data for each date
            const updatedWordCloudData = [];
            fetchedDataList.forEach(dataForDate => {
                dataForDate.forEach(newData => {
                    const existingIndex = updatedWordCloudData.findIndex(existingData => existingData.text === newData.text);
                    if (existingIndex !== -1) {
                        updatedWordCloudData[existingIndex].value += newData.value;
                    } else {
                        updatedWordCloudData.push(newData);
                    }
                });
            });

            const sortedData = updatedWordCloudData.sort((a, b) => b.value - a.value).slice(0, keywordQuantity);
            setWordCloudData(sortedData);
        }

        fetchData()
            .then(() => setIsLoading(false))
            .catch(error => {
                console.error("Error fetching word cloud data:", error);
                setIsLoading(false);
            });
    }, [isPeriod, startDate, endDate, keywordQuantity]);



    const HandleOnClick = (selectedKeyword, wordCloudData) => {
        navigate('/service', { state: { selectedKeyword, wordCloudData, startDate, endDate, isPeriod } });
    }


    return(
        <MainBoxContainerOuter>
            <MainBoxContainer>
              {isPeriod === "true" ? (
                      <PeriodSelector
                          startDate={startDate}
                          setStartDate={setStartDate}
                          endDate={endDate}
                          setEndDate={setEndDate}
                      />
              ) : (
                      <DailySelector
                          startDate={startDate}
                          setStartDate={setStartDate}
                          setEndDate={setEndDate}
                      />
              )}
              {isLoading ? (
                <LoadingComponent><LoadingImg/></LoadingComponent>
              ) : (
                  active === "cloud"
                      ? <CloudContainer>
                          <Cloud
                              wordCloudData={wordCloudData}
                              width={width}
                              height={height}
                              sizeValue={Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))+10}
                              onWordClick={(event, d) => {
                                  setSelectedKeyword(d.text);
                                  HandleOnClick(d.text, wordCloudData);
                              }}
                          />
                      </CloudContainer>
                      : <Chart
                          isPeriod={isPeriod}
                          startDate={startDate}
                          setStartDate={setStartDate}
                          endDate={endDate}
                          setEndDate={setEndDate}
                          wordCloudData={wordCloudData}
                          setWordCloudData={setWordCloudData}
                      />
                  )}
          </MainBoxContainer>
        </MainBoxContainerOuter>
    );
}

export default MainBox