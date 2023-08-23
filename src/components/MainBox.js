import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";
import Cloud from "./Cloud";
import Chart from "./Chart";
import PeriodSelector from "../cloud_components/PeriodSelector";
import DailySelector from "../cloud_components/DailySelector";
import { useNavigate } from 'react-router-dom';




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
  margin-top: -20px;
  & text:hover {
    cursor: pointer;
  }
`


function MainBox({active, isPeriod, keywordQuantity, endDateDefault, startDateDefault}) {
    const [startDate, setStartDate] = useState(startDateDefault ? startDateDefault : new Date());
    const [endDate, setEndDate] = useState(endDateDefault ? endDateDefault : new Date());
    const [wordCloudData, setWordCloudData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);
        if(isPeriod === "false"){
            setEndDate(startDate);
        }
        async function fetchData() {
            const dateList = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dateList.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const fetchDataForDate = async (date) => {
                const apiUrl = `http://localhost:8080/api/hot_keywords?date=${date.toISOString().slice(0,10)}&topN=${keywordQuantity}`;
                try {
                    const response = await fetch(apiUrl);
                    const jsonData = await response.json();
                    return jsonData.map(item => ({ text: item.keyword, value: item.value * 15000 }));
                } catch (error) {
                    console.error("Error fetching word cloud data for date:", date, error);
                    return [];
                }
            };

            const fetchDataPromises = dateList.map((date) => fetchDataForDate(date));

            try {
                const fetchedDataList = await Promise.all(fetchDataPromises);
                const combinedData = fetchedDataList.flat();
                const sortedData = combinedData.sort((a, b) => b.value - a.value).slice(0, keywordQuantity);
                setWordCloudData(sortedData);
            } catch (error) {
                console.error("Error fetching word cloud data:", error);
            }
        }

        fetchData()
            .then(() => setIsLoading(false)) // Set loading state to false after data is fetched and processed
            .catch(error => {
                console.error("Error fetching word cloud data:", error);

                setIsLoading(false);
            });
    }, [isPeriod, startDate, endDate, keywordQuantity]); //fetch data
    useEffect(() => {
        if(!wordCloudData.some(word => word.text === selectedKeyword) && selectedKeyword != null){
            setSelectedKeyword(null);
            alert("해당 기간에 기존 키워드가 없습니다.");
        }
    },[wordCloudData])

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
                <LoadingComponent>Loading...</LoadingComponent>
              ) : (
                  active === "cloud"
                      ? <CloudContainer>
                          <Cloud
                              wordCloudData={wordCloudData}
                              width={6000}
                              height={2600}
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