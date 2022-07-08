import { Typography } from "@mui/material";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { useTranslation } from 'react-i18next';
import { ProgressProvider } from "./animation";
import 'react-circular-progressbar/dist/styles.css';
import { CirclePercent, CircleSub, CircleSubNormal, CircleSubOther } from "./styles";

type Props = {
    animated?: boolean,
    owned: number,
    total: number,
    percent: number,
    subOwned: number | false,
    subTotal: number | false,
}

const Circle = ({ animated, owned, total, percent, subOwned, subTotal }: Props) => {
    const { t } = useTranslation();
    const circle = (
        <CircularProgressbarWithChildren
            value={owned + (subOwned || 0)}
            maxValue={total + (subTotal || 0)}
            styles={buildStyles({
                pathColor: '#6E55AE',
                textColor: '#ddd',
                trailColor: '#333',
            })}
        >
            <CirclePercent>{percent}%</CirclePercent>
            <CircleSub>
                <CircleSubNormal>{owned} / {total}</CircleSubNormal>
                {subTotal && <CircleSubOther>{subOwned} / {subTotal}</CircleSubOther>}
            </CircleSub>
        </CircularProgressbarWithChildren>
    );
    return (
        <>
            {animated && <ProgressProvider valueStart={0} valueEnd={owned}>{ (value: number) => circle}</ProgressProvider>}
            {!animated && circle}
        </>
    );
}

export default Circle;