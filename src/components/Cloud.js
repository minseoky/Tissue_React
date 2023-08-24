
import WordCloud from "react-d3-cloud";
import ThemeColors from "../color_config/ThemeColors";


function Cloud({ wordCloudData,onWordClick,width,height }) {

    return (
        <div>
            <WordCloud
                data={wordCloudData}
                width={width}
                height={height}
                font="Pretendard"
                fill={(d) =>
                    d.value > 1900
                        ? ThemeColors.cloudTextColor1
                        : d.value > 800
                            ? ThemeColors.cloudTextColor2
                            : ThemeColors.cloudTextColor3
                }
                rotate={() => 0}
                padding={(width+height)/90}
                random={() => 0.5}
                onWordClick={onWordClick}
            />
        </div>
    );
}

export default Cloud;
