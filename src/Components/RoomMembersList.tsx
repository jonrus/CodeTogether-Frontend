import RoomMember from "./RoomMember";
import ListGroup from "reactstrap";
interface IRoomMembers {
    members: string[]
}

export default function RoomMembers({members}: IRoomMembers) {
    const JSXMembers: JSX.Element[] = [];    
    for (let name of members) {
        JSXMembers.push(<RoomMember name={name} />)
    }

    return (
        <div className="RoomMembersList">

        </div>
    );
}
