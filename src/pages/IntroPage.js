import Title from "../components/Title";
import Slogan from "../components/Slogan";
import MainContainer from "../components/MainContainer";
import {useLocation, useNavigate} from "react-router-dom";
import {is} from "date-fns/locale";



function IntroPage() {
    const { state } = useLocation();
    let startDate = new Date();
    let endDate = new Date();
    let isPeriod = "false";
    if(state !== null){
        startDate = state.startDate;
        endDate = state.endDate;
        isPeriod = state.isPeriod;
    }
    return (
        <div>
            <Title/>
            <Slogan/>
            <MainContainer startDateDefault={startDate} endDateDefault={endDate} isPeriodDefault={isPeriod}/>
        </div>
    );
}

export default IntroPage