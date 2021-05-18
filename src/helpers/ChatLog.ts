/*
    Helper class(es) for use with storing the chatlog,
    this is all overkill and a simply array would have worked just fine
    but I had the time and wanted to have a Chat log that would be linear
    time for triming.
    Also this is not a 100% complete linked list as I will have no use for
    removing items [by index or value], or getting an item at X pos.
    This will simply be client side storage of chat messages
*/
interface IChatMsg {
    text: string,
    name: string,
    type: string
}
interface IChatLog {
    addMsg(data: IChatMsg): void,
}
export default class ChatLog implements IChatLog{
    msgList: LinkedList<IChatMsg>;

    constructor(lim = 100) {
        this.msgList = new LinkedList<IChatMsg>(lim);
    }

    public addMsg(data: IChatMsg) {
        this.msgList.push(data);
    }

    *[Symbol.iterator]() {
        let msg = this.msgList.first();
        while (msg !== null) {
            yield msg.data;
            msg = msg.next;
        }
    }
}

class Node<T> {
    public next: Node<T> | null = null;

    constructor(public data: T | null = null) {
        this.data = data;
    }
}

interface LinkedListInterface<T> {
    push(data: T): Node<T>;
    size(): number;
    first(): Node<T> | null;
    last(): Node<T> | null;
}
class LinkedList<T> implements LinkedListInterface<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private _len = 0;
    private trimLevel: number;

    constructor(trimLen = 100) {
        this.trimLevel = trimLen;
    }

    public push(data: T): Node<T> {
        const newNode = new Node(data);

        //Check if list empty
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else if (this.tail) { //A check to make TS happy...
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this._len++;
        this.autoTrim();
        return newNode;
    }

    public size() {
        return this._len;
    }

    private autoTrim() {
        //allow unlimited index lists
        if (this.trimLevel === -1) return;

        if (this._len > this.trimLevel) {
            if(this.head !== null) {
                this.head = this.head.next;
                this._len--;
            }
        }
    }
    
    public last() {
        return this.tail;
    }

    public first() {
        return this.head;
    }
}