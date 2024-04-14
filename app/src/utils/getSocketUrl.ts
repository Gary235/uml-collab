export default function(username: string, docId: string) {
  console.log(window.location.origin.includes('localhost'));

  if (window.location.origin.includes('localhost'))
    return `ws://localhost:5432/doc/?username=${username}&doc=${docId}`

  return `wss://uml-collab-server.zeabur.app/doc/?username=${username}&doc=${docId}`
}