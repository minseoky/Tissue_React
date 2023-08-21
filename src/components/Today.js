import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThemeColors from "../color_config/ThemeColors";


const TodayContainer = styled.div`
  padding: 20px;
  border-style: solid;
  border-color: ${ThemeColors.borderColor1};
  border-width: 0 0 1px 0;
  color: ${ThemeColors.textColor1};

`
function Today() {
    const [today, setToday] = useState("");

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0,10) + " (" + currentDate.toDateString().slice(0,3) + ")";
        setToday(formattedDate);
    }, []);

    return (
        <TodayContainer>
            {today}

        </TodayContainer>
    );
}

export default Today;
