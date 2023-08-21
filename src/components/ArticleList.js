import styled from "styled-components";
import {useEffect, useState} from "react";

const OverflowContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 25px 20px 30px 20px
`;

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap; /* Prevent wrapping to multiple lines */
  gap: 46px;
`;

const Box = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    width: 200px;
    height: 300px;
    border-radius: 20px;
  background-color: white;
  border: none;
  box-shadow:
          0px 6px 8px rgba(0, 0, 0, 0.03),
            0px -6px 8px rgba(0, 0, 0, 0.03),
          6px 0px 8px rgba(0, 0, 0, 0.03),
          -6px 0px 8px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease-in-out; /* Add a transition effect */
  &:hover {
    transform: scale(1.1); /* Scale up by 10% on hover */
    cursor: pointer;
  }
`;

const Image = styled.img`
    max-width: 100%;
    height: auto;
`;

const DateAndPress = styled.div`
  font-size: 13px;
  padding-bottom: 7px;
`
const ArticleTitle = styled.div`
  font-size: 18px;
  padding-bottom: 6px;
`
const Summary = styled.div`
  font-size: 15px;
`
const summaryQuantity = 10;
function ArticleList({endDate, startDate, selectedKeyword}) {

    const [isLoading, setIsLoading] = useState(true);
    const [summaryData, setSummaryData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const dateList = [];
            let currentDate = new Date(endDate);

            while (currentDate >= startDate) {
                dateList.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() - 1);
            }

            const fetchDataForDate = async (date) => {
                const apiUrl = `http://localhost:8080/api/full_summaries?date=${date.toISOString().slice(0, 10)}&topN=${summaryQuantity * 50}&keyword=${selectedKeyword}`;
                try {
                    const response = await fetch(apiUrl);
                    const jsonData = await response.json();
                    return jsonData.map(item => ({
                        img_url: item.img_url,
                        date: item.date,
                        press: item.press,
                        title: item.title,
                        url: item.url,
                        summary: item.summary
                    }));
                } catch (error) {
                    console.error("Error fetching");
                    return [];
                }
            };

            const fetchDataPromises = dateList.map((date) => fetchDataForDate(date));

            try {
                const fetchedDataList = await Promise.all(fetchDataPromises);
                const combinedData = fetchedDataList.flat();
                const sortedData = combinedData.sort((a, b) => b.value - a.value).slice(0, summaryQuantity);
                setSummaryData(sortedData);
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
    }, []); //fetch data

    const handleBoxClick = (url) => {
        window.open(url, "_blank"); // Open the URL in a new tab
    };

    return(
        <OverflowContainer>
            <Outer>
                {summaryData.map((item, index) => (
                    <Box key={index} onClick={() => handleBoxClick(item.url)}>
                        {/*<Image src={item.img_url} alt="Article Image" />*/}
                        <Image src={"https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg"} alt="Article Image" />
                        <DateAndPress>{item.date.slice(0,16)} | {item.press}</DateAndPress>
                        <ArticleTitle>{item.title}</ArticleTitle>
                        <Summary>{item.summary}</Summary>
                    </Box>
                ))}
            </Outer>
        </OverflowContainer>
    );
}

export default ArticleList