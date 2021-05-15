import {memo} from "react";

interface IRoomMember {
    name: string
}

function RoomMember({name}: IRoomMember) {
    return (
        <span className="RoomMember">
            {name}
        </span>
    );
}

export default memo(RoomMember);