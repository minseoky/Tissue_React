
import WordCloud from "react-d3-cloud";
import ThemeColors from "../color_config/ThemeColors";


function Cloud({ wordCloudData,onWordClick,width,height }) {

    const randomColor = () => {
        const colors = [
            ThemeColors.cloudTextColor1,
            ThemeColors.cloudTextColor2,
            ThemeColors.cloudTextColor3
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return (
        <div>
            <div className={"step_5"}>
            <WordCloud
                data={wordCloudData}
                width={width*5}
                height={height*5}
                font="Pretendard"
                fill={() => randomColor()}
                rotate={() => 0}
                padding={(width+height)/35}
                random={() => 0.5}
                onWordClick={onWordClick}
            />
            </div>
        </div>
    );
}

export default Cloud;
