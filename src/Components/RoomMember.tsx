import {memo} from "react";

interface IRoomMember {
    name: string
}

function RoomMember({name}: IRoomMember) {
    return (
        <li><span className="RoomMember">{name}</span></li>
    );
}

export default memo(RoomMember);