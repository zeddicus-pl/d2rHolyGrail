import { Button, Checkbox, FormControl } from "@mui/material";
import { ChangeEvent, MouseEvent } from "react";
import { ItemsInSaves } from "../../@types/main";
/* @ts-ignore */
import CheckBoxOutlineBlank from '@mui/material/internal/svg-icons/CheckBoxOutlineBlank';
import { CheckboxCounter, CheckboxCounterButtons } from "./styles";
import { countInSaves } from "../../utils/objects";

type ManualControlProps = {
    isPlaceholder?: boolean,
    items: ItemsInSaves,
    itemName: string,
    className?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>, itemName: string) => void,
    onNumberChange: (event: MouseEvent<HTMLButtonElement>, itemName: string, count: number) => void,
}
const ManualControl = ({ isPlaceholder, items, itemName, className, onChange, onNumberChange }: ManualControlProps) => {
    if (isPlaceholder) {
        return <div style={{ width: 30, display: 'inline-block' }}></div>;
    }
    let count = 0;

    if (items[itemName] && items[itemName].inSaves) {
        count = countInSaves(items[itemName]);
    }

    // previous manual items save format does not store the "inSaves" so we assume that's 1 item
    if (items[itemName] && count == 0) {
        count = 1;
    }
    
    return <FormControl className="checkboxWithButtons">
        <Checkbox
            className={className}
            edge="start"
            checked={!!items[itemName]}
            tabIndex={-1}
            checkedIcon={count > 1 ? <>
                <CheckBoxOutlineBlank />
                <CheckboxCounter>{count}</CheckboxCounter>
            </> : undefined}
            disableRipple
            onChange={(e) => onChange(e, itemName)}
            onClick={(e: MouseEvent<HTMLButtonElement>) => { e.stopPropagation() }}
        />
        <CheckboxCounterButtons>
            {count > 0 &&
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={(e) => onNumberChange(e, itemName, count + 1)}
                >+</Button>
            }
            {count > 1 &&
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={(e) => onNumberChange(e, itemName, count - 1)}
                >-</Button>
            }
        </CheckboxCounterButtons>
    </FormControl>
}

export default ManualControl;