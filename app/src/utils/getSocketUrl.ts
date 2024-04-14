export default function(username: string, docId: string) {
  if (window.location.origin.includes('localhost'))
    return `ws://localhost:5432/doc/?username=${username}&doc=${docId}`

  return `wss://uml-collab.onrender.com/doc/?username=${username}&doc=${docId}`
}