import {memo} from "react";

interface IRoomMember {
    name: string,
    color: string
}

function RoomMember({name, color}: IRoomMember) {
    return (
        <li className="RoomMember" style={{marginBottom: "6px"}}>
            <span style={{backgroundColor: color, color: "white", padding: "4px"}}>{name}</span>
        </li>
    );
}

export default memo(RoomMember);
