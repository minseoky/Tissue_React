import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ThemeColors from "../color_config/ThemeColors";

const DatePickerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center; /* 아이콘과 DatePicker를 수평으로 중앙에 정렬 */
  margin: 15px 0 15px 0;
  p{
    margin-left: 1.5%;
    margin-right: 3%;
    font-size: 24px;
  }
`
const IconContainer = styled.div`
  margin-right: 10px; /* 아이콘과 날짜 선택기 사이의 간격 설정 */
`

const StyledDatePicker = styled(DatePicker)`
  display: flex;
  align-items: center;
  border: 2px solid black;
  border-radius: 25px;
  background-color: white;
  box-sizing: border-box;
  width: 90%;
  height: 32px;
  color: ${ThemeColors.textColor2};
  text-align: center;
  font-size: 16px;
  outline: none;

  &:focus {
    border: 2px solid ${ThemeColors.datePickerColorActive};
  }
  @media (max-width: 624px) {
    width: 80%;
    height: 28px;
    font-size: 14px;
  }
`

function PeriodSelector({ startDate, setStartDate, endDate, setEndDate }) {
    const handleStartDateChange = (date) => {
        if (date <= endDate) {
            setStartDate(date);
        } else {
            alert("시작 날짜는 종료 날짜보다 빠를 수 없습니다.");
        }
    };

    const handleEndDateChange = (date) => {
        if (date >= startDate) {
            setEndDate(date);
        } else {
            alert("종료 날짜는 시작 날짜보다 늦을 수 없습니다.");
        }
    };

    return (
        <div className={"step_4"} style={{display: "flex", width: "70%", textAlign: "center", marginLeft: "15%"}}>
            <DatePickerContainer>
                <IconContainer>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </IconContainer>

                <StyledDatePicker
                    locale={ko}
                    selected={startDate}
                    closeOnScroll={true}
                    onChange={handleStartDateChange}
                    shouldCloseOnSelect={true}
                    dateFormat="yyyy-MM-dd"
                />
                <p>~</p>
                <IconContainer>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </IconContainer>
                <StyledDatePicker
                    locale={ko}
                    selected={endDate}
                    closeOnScroll={true}
                    onChange={handleEndDateChange}
                    shouldCloseOnSelect={true}
                    dateFormat="yyyy-MM-dd"
                />
            </DatePickerContainer>
        </div>
    );
}

export default PeriodSelector;
