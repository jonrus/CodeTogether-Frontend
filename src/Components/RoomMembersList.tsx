import RoomMember from "./RoomMember";
import {ListGroup} from "reactstrap";
import {v4 as uuid} from "uuid";

interface IRoomMembers {
    members: {name: string, color: string}[]
}

export default function RoomMembersList({members}: IRoomMembers) {
    const JSXMembers: JSX.Element[] = [];
    for (let mem of members) {
        JSXMembers.push(<RoomMember name={mem.name} color={mem.color} key={uuid()}/>)
    }

    return (
        <div className="RoomMembersList">
            <div className="RoomMembersList-Heading" style={{textAlign: "center", paddingBottom: "5px"}}>
                Room Members:
            </div>
            <ListGroup className="RoomMembersList-List">
                {JSXMembers}
            </ListGroup>
        </div>
    );
}
