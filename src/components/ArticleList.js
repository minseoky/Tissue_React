import styled, {keyframes} from "styled-components";
import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import ThemeColors from "../color_config/ThemeColors";
import tissue_img from "../imgs/Tissue.png";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import LoadingImg from "./LoadingImg";


const LoadingComponent = styled.div`
  height: 800px;
  font-size: 30px;
  margin-top: 200px;
`

const fadeAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OverflowContainer = styled.div`
  display: flex;
  overflow: scroll;
  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 8px;

    /* 가로 스크롤 높이 */
    height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  padding: 25px 20px 30px 20px
`;

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap; /* Prevent wrapping to multiple lines */
  gap: 45px;

  animation: ${fadeAnimation} 0.5s ease-in-out forwards;
`;

const Box = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    width: 200px;
    height: 320px;
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
  border-radius: 10px;
    max-width: 100%;
  height: 120px;
  object-fit: fill;
`;

const ImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 3px;
  height: 120px;
`

const DateAndPress = styled.div`
  font-size: 11px;
  padding-bottom: 4px;
`
const ArticleTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`
const Summary = styled.div`
  padding-top: 5px;
  font-size: 14px;
  line-height: 17px;
  display: -webkit-box; /* Required for multiple lines */
  -webkit-box-orient: vertical; /* Vertical layout */
  -webkit-line-clamp: 8; /* Maximum number of lines to display */
  overflow: hidden; /* Hide overflowing content */
`

const StyledModal = styled(Modal).attrs({
    appElement: document.getElementById('root') // Set the app element here
})`
  background-color: ${ThemeColors.modalColor};
  height: 62vh;
  width: 60vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  padding: 30px;
  margin: 0;
  z-index: 20;
  overflow: auto; /* Add scroll when content overflows */
  white-space: pre-wrap; /* Preserve whitespace and wrap text */
  word-wrap: break-word; /* Allow long words to wrap */
  box-shadow:
          0px 6px 8px rgba(0, 0, 0, 0.1),
            0px -6px 8px rgba(0, 0, 0, 0.1),
          6px 0px 8px rgba(0, 0, 0, 0.1),
          -6px 0px 8px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    /* 세로 스크롤 넓이 */
    width: 8px;

    /* 가로 스크롤 높이 */
    height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  
`
const ModalInner = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`
const ModalTitle = styled.div`
    font-size: 25px;

`
const ImgContainer = styled.img`
  margin-left: 24%;
  width: 52%;
  height: 240px;
  margin-bottom: 10px;
`
const ImgAndTitle = styled.div`
  width: 100%;
  display: inline-grid;
  gap: 10px;
`
const Content = styled.div`

  line-height: 21px;
`
const ETC = styled.div`
  display: block;
  border-bottom: 1px black solid;
  margin-bottom: 10px;
  overflow: auto; /* Add scroll when content overflows */
  & p{
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

const StyledButtonLeft = styled.button`
  position: absolute;
  width: 60px;
  height: 80px;
  border: none;
  top : 23%;
  left: 8%;
  background-color: ${ThemeColors.backButtonColor1};
  transition: background-color 0.2s ease-in-out;
  border-radius: 10px;
  font-size: 40px;
  &:hover{
    cursor: pointer;
    background-color: ${ThemeColors.backButtonColor2};
  }
`
const StyledButtonRight = styled.button`
  position: absolute;
  width: 60px;
  height: 80px;
  border: none;
  top : 23%;
  right: 8%;
  background-color: ${ThemeColors.backButtonColor1};
  transition: background-color 0.2s ease-in-out;
  border-radius: 10px;
  font-size: 40px;
  &:hover{
    cursor: pointer;
    background-color: ${ThemeColors.backButtonColor2};
  }

`

const summaryQuantity = 10;
function ArticleList({endDate, startDate, selectedKeyword}) {

    const [isLoading, setIsLoading] = useState(true);
    const [summaryData, setSummaryData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [date, setDate] = useState("");
    const [press, setPress] = useState("");
    const [index, setIndex] = useState();
    const [summaryDataLength, setSummaryDataLength] = useState();
    useEffect(() => {
        async function fetchData() {
            const dateList = [];
            let currentDate = new Date(endDate);

            while (currentDate >= startDate) {
                dateList.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() - 1);
            }

            const fetchDataForDate = async (date) => {
                const apiUrl = `api/full_summaries?date=${date.toISOString().slice(0, 10)}&topN=${summaryQuantity * 50}&keyword=${selectedKeyword}`;
                try {
                    const response = await fetch(apiUrl);
                    const jsonData = await response.json();
                    return jsonData.map(item => ({
                        img_url: item.img_url,
                        date: item.date,
                        press: item.press,
                        title: item.title,
                        url: item.url,
                        summary: item.summary,
                        content: item.content
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
    }, [selectedKeyword]); //fetch data

    const handleBoxClick = (title, img_url, date, press, content, index, summaryDataLength) => {
        setTitle(title);
        setImgUrl(img_url);
        setContent(content);
        setDate(date);
        setPress(press);
        setIndex(index);
        setSummaryDataLength(summaryDataLength);
        setModalIsOpen(true);
    };

    const leftBtnClick = () => {
        if (index > 0) {
            const newIndex = index - 1;
            const newItem = summaryData[newIndex];
            handleBoxClick(newItem.title, newItem.img_url, newItem.date, newItem.press, newItem.content, newIndex, summaryData.length);
        }
    };

    const rightBtnClick = () => {
        if (index < summaryDataLength - 1) {
            const newIndex = index + 1;
            const newItem = summaryData[newIndex];
            handleBoxClick(newItem.title, newItem.img_url, newItem.date, newItem.press, newItem.content, newIndex, summaryData.length);
        }
    };

    return(
        <OverflowContainer>
            {isLoading ? <LoadingComponent><LoadingImg/></LoadingComponent> : <Outer>
                {summaryData.map((item, index) => (
                    <Box key={index} onClick={() =>
                        handleBoxClick(item.title, item.img_url, item.date, item.press, item.content, index, summaryData.length)}
                    >
                        <ImageWrapper>
                            <Image src={item.img_url ? item.img_url : tissue_img} alt="Article Image" />
                            {/*<Image src={"https://dimg.donga.com/wps/NEWS/IMAGE/2023/05/12/119255016.1.jpg"} alt="Article Image" />*/}
                        </ImageWrapper>


                        <DateAndPress>{item.date.slice(0,16)} | {item.press}</DateAndPress>
                        <ArticleTitle>{item.title}</ArticleTitle>
                        <Summary>{item.summary}</Summary>
                    </Box>
                ))}
            </Outer>}
            <StyledModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <ModalInner>
                    {index !== 0 && <StyledButtonLeft onClick={() => leftBtnClick()}><IoIosArrowBack/></StyledButtonLeft>}
                    {index !== summaryDataLength-1 && <StyledButtonRight onClick={() => rightBtnClick()}><IoIosArrowForward/></StyledButtonRight>}
                    <ImgAndTitle>
                        <ImgContainer src={imgUrl ? imgUrl : tissue_img}/>
                        <ETC>
                            <ModalTitle>{title}</ModalTitle>
                            <p>{date.slice(0,16)} | {press}</p>
                        </ETC>


                    </ImgAndTitle>
                    <Content>{content}</Content>


                </ModalInner>
            </StyledModal>
        </OverflowContainer>
    );
}




export default ArticleList