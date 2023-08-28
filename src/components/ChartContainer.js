import React, {useEffect, useState} from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend, Line
} from "recharts";
import ThemeColors from "../color_config/ThemeColors";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {cloudSizeValue} from "./MainBox";

const PieChartContainer = styled.div`
  flex: 2; /* Take 2/5 of the available vertical space */
  @media (max-width: 624px) {
    flex: 1;
  }
`;

const LineChartContainer = styled.div`
  flex: 3; /* Take 3/5 of the available vertical space */
`;


const Outer = styled.div`
    width: 94%;
  height: 380px;
  display: inline-flex;
  margin: 10px;
  .recharts-sector {
    outline: none;
    &:hover{
      cursor: pointer;
    }
  }
`

const Cover = styled.div`
  @media (max-width: 1024px) {
  }
  @media (max-width: 624px) {
  }
`
const Info = styled.div`
    text-align: center;
  font-size: 22px;
  margin-top: 20px;
  font-size: 20px;
  @media (max-width: 1024px) {
    font-size: 15px;
  }
`
function ChartContainer({ startDate, endDate, wordCloudData, isPeriod, highlightedKeywords }) {
    const [lineChartData, setLineChartData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const pieChartOuterRadius = Math.min(windowWidth * 0.1, 120);
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Calculate the outerRadius based on the window width


    useEffect(() => {
        // Construct an array of dates from startDate to endDate
        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dateArray.push(currentDate.toISOString().slice(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Fetch data for each date and keyword
        const fetchData = async () => {
            const lineChartDataArray = [];

            for (const date of dateArray) {
                const keywordDataObject = {};
                for (const keyword of highlightedKeywords) {
                    const response = await fetch(`api/num_of_keywords_per_day?date=${date}&keyword=${keyword}`);
                    const dataArray = await response.json(); // JSON 데이터를 배열로 받아옴

                    // 이제 dataArray는 배열이므로, 첫 번째 요소의 value를 추출합니다
                    if (dataArray.length > 0) {
                        keywordDataObject[keyword] = dataArray[0].value;
                    } else {
                        keywordDataObject[keyword] = 0; // 데이터가 없을 경우 기본값 설정
                    }

                }
                lineChartDataArray.push({
                    date,
                    ...keywordDataObject,
                });
                console.log(keywordDataObject);
            }
            setLineChartData(lineChartDataArray);
        };

        fetchData();
    }, [startDate, endDate, highlightedKeywords]);

    // Prepare data for the chart
    const chartData = wordCloudData.map((data) => ({
        name: data.text,
        value: data.value / cloudSizeValue,
    }));

    const COLORS = [ThemeColors.chartColor1,
        ThemeColors.chartColor2,
        ThemeColors.chartColor3,
        ThemeColors.chartColor4,
        ThemeColors.chartColor5,
        ThemeColors.chartColor6,/* Add more colors as needed */];

    // Filter chartData to include only highlighted keywords
    const filteredChartData = chartData.filter((data) => highlightedKeywords.includes(data.name));

    const HandleOnClick = (selectedKeyword, wordCloudData) => {
        navigate('/service', { state: { selectedKeyword, wordCloudData, startDate, endDate, isPeriod } });
    }

    return (
        <Cover>
            {highlightedKeywords.length === 0 ? <Info>🚀 키워드를 선택하세요</Info> : <Outer>
                <PieChartContainer>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={filteredChartData}
                                dataKey="value"
                                nameKey="name"
                                cx={isPeriod === "false" ? "50%" : "50%"}
                                cy="50%"
                                outerRadius={windowWidth >= 624 ? pieChartOuterRadius : pieChartOuterRadius*1.3}
                                fill="#8884d8"
                                label={(entry) => entry.name} // 키워드 이름을 라벨로 표시
                                onClick={(event, entry) => {
                                    HandleOnClick(filteredChartData[entry].name, wordCloudData);
                                }}
                            >
                                {filteredChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </PieChartContainer>
                {windowWidth >= 624 && isPeriod === "true" ?  <LineChartContainer>
                    <ResponsiveContainer>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {highlightedKeywords.map((keyword, index) => (
                                <Line
                                    key={keyword}
                                    dataKey={keyword} // 해당 키워드의 데이터 키를 지정
                                    name={keyword}
                                    stroke={COLORS[index % COLORS.length]}
                                    type="monotone" // 선 그래프 유형
                                    dot={false} // 데이터 포인트 점 비활성화
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </LineChartContainer>: null}
                </Outer>}
        </Cover>
    );
}

export default ChartContainer;

