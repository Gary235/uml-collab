import { create } from 'zustand'
import DiffMatchApply from 'diff-match-patch';

export interface IDocStore {
  socket: WebSocket | null;
  docValue: string;
  username: string | null;
  docId: string | null;
  messageCount: number;
  usernames: Set<string>;
  getUserCount: () => number;
  setDocValue: (newVal: string) => void;
  connect: (session: string | null) => string;
  disconnect: () => void;
  send: (prev: string, curr: string) => void;
}

const useDoc = create<IDocStore>((set, get) => ({
  socket: null,
  docValue: '',
  username: null,
  docId: null,
  usernames: new Set<string>(),
  messageCount: 0, // TODO: find the reason why messages are being duplicated so to aovid doing this
  getUserCount: () => get().usernames.size,
  setDocValue: (newVal: string) => set({docValue: newVal}),
  connect: (session = null) => {
    const username = sessionStorage.getItem('username') || crypto.randomUUID();
    const docId = session || crypto.randomUUID();
    const socket = new WebSocket(`ws://uml-collab-server.zeabur.app//doc/?username=${username}&doc=${docId}`);

    socket.addEventListener('error', () => console.error('hubo un erro con el websocket'))
    socket.addEventListener("message", (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.id <= get().messageCount) return;
        console.log('msg', msg);

        switch (msg.type) {
          case 'new': {
            set((state) => ({ usernames: new Set([...state.usernames, msg.sender]) }))
            if (msg.sender === get().username) break;
            const msgValue = {
              type: 'lastMessage',
              msg: get().docValue,
              receiver: msg.sender,
              usernames: [...get().usernames]
            }
            get().socket?.send(JSON.stringify(msgValue))
            break;
          }
          case 'diff': {
            if (msg.sender === get().username) break;
            const dmp = new DiffMatchApply();
            const parsedPatches = dmp.patch_make(msg.msg)
            const [updated] = dmp.patch_apply(parsedPatches, get().docValue);
            set(({ docValue: updated }))
            break;
          }
          case 'close': {
            console.log(msg.msg);
            if (msg.sender === get().username) break;
            const currUsernames = get().usernames;
            currUsernames.delete(msg.sender)
            set(({ usernames: currUsernames }))
            break;
          }
          case 'history':
            if (msg.receiver !== get().username) break;
            set(({ docValue: msg.msg, usernames: new Set([...msg.usernames]) }))
            break
          default:
            break
        }

        set(({ messageCount: msg.id }))
      } catch (e) {
        console.error(e);
      }
    });

    if (!sessionStorage.getItem('username')) sessionStorage.setItem('username', username);
    set(({ socket, username, docId, usernames: new Set([username])}));
    return docId;
  },
  send: (prev, curr) => {
    const {socket, username} = get();
    if (!socket) return;

    const dmp = new DiffMatchApply();
    const diff = dmp.diff_main(prev, curr, false);

    socket.send(JSON.stringify({
      sender: username,
      msg: diff,
      type: 'diff'
    }));
  },
  disconnect: () => {
    const {socket} = get();
    socket?.close();
    set(({
      socket: null,
      username: null,
      docId: null,
      usernames: new Set(),
      messageCount: 0
    }));
    sessionStorage.clear();
    console.log('desconecto');
  }
}));

export default useDoc;
