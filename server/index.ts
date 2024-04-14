import { type ServerWebSocket } from "bun";

let messageCount = 0;
const messageCountPerDoc: Record<string, number> = {}

interface IData {
  username: string;
  doc: string;
}

const getMessageId = (doc: string) => {
  if (messageCountPerDoc[doc] === undefined) messageCountPerDoc[doc] = 0;
  return messageCountPerDoc[doc]++;
}

const server = Bun.serve({
  port: 3002,
  async fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === "/doc/") {
      const username = url.searchParams.get('username');
      const doc = url.searchParams.get('doc');
      if (server.upgrade(req, { data: { username, doc } })) return;
    }

    return new Response(':(');
  },
  websocket: {
    idleTimeout: 960, // max (16 min)
    open(ws: ServerWebSocket<IData>) {
      const {username, doc} = ws.data;
      ws.subscribe(doc);
      const msg = {
        sender: username,
        msg: `${username} has entered the doc`,
        type: 'new',
        id: getMessageId(doc)
      }
      server.publish(doc, JSON.stringify(msg));
    },
    message(ws, message: string) {
      const {doc}: any = ws.data;
      const parsedMessage = JSON.parse(message);
      if (parsedMessage?.type === 'lastMessage') {
        const msgToNewSubscriber = {
          receiver: parsedMessage.receiver,
          msg: parsedMessage.msg,
          type: 'history',
          id: getMessageId(doc),
          usernames: parsedMessage.usernames
        }
        server.publish(doc, JSON.stringify(msgToNewSubscriber));
        return;
      }

      server.publish(doc, JSON.stringify({...parsedMessage, id: getMessageId(doc)}));
    },
    close(ws) {
      const {username, doc}: any = ws.data;
      ws.unsubscribe(doc);
      const msg = {
        sender: username,
        msg: `${username} has left the doc`,
        type: 'close',
        id: getMessageId(doc)
      }
      server.publish(doc, JSON.stringify(msg));
    }
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);