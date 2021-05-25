import {memo} from "react";
import parse from "html-react-parser";
import {fa} from "unfont";
/*
    Fab Component will render a fontawesome icon as a SVG
    made with unfont, and passed through html-react-parser
    to create JSX out of it.
*/

interface IFab {
    iconDec: string,
    id: string
}

function Fab({iconDec, id}: IFab) {
    const icon = fa(iconDec, {attributes: {id}});
    const parsed = parse(icon);
    return (parsed as JSX.Element);
}

export default memo(Fab);
