import WordCloud from "react-d3-cloud";
import ThemeColors from "../color_config/ThemeColors";

function Cloud({ wordCloudData, onWordClick, width, height, sizeValue, keywordQuantity = 10 }) {
    const colorCount = 3; // Total number of available colors
    let colorIndex = 0; // Index to keep track of the current color

    const getNextColor = () => {
        const colors = [
            ThemeColors.cloudTextColor1,
            ThemeColors.cloudTextColor2,
            ThemeColors.cloudTextColor3
        ];
        const nextColor = colors[colorIndex % colorCount];
        colorIndex += 1;
        return nextColor;
    };

    return (
        <div>
            <div className={"step_5"}>
                <WordCloud
                    data={wordCloudData}
                    width={width * sizeValue/5.5 + keywordQuantity*4}
                    height={height * sizeValue/5.5 - keywordQuantity}
                    font="Pretendard"
                    fill={() => getNextColor()}
                    rotate={() => 0}
                    padding={(width + height) / 110}
                    random={() => 0.5}
                    onWordClick={onWordClick}
                />
            </div>
        </div>
    );
}

export default Cloud;
