import RoomMember from "./RoomMember";
import {ListGroup} from "reactstrap";
import {v4 as uuid} from "uuid";

interface IRoomMembers {
    members: string[]
}

export default function RoomMembersList({members}: IRoomMembers) {
    const JSXMembers: JSX.Element[] = [];
    for (let name of members) {
        JSXMembers.push(<RoomMember name={name} key={uuid()}/>)
    }

    return (
        <div className="RoomMembersList">
            <div className="RoomMembersList-Heading">Room Members</div>
            <ListGroup type="unstyled" className="RoomMembersList-List">
                {JSXMembers}
            </ListGroup>
        </div>
    );
}
