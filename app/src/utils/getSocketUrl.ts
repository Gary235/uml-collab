export default function(username: string, docId: string) {
  if (window.location.origin.includes('localhost'))
    return `ws://localhost:5432/doc/?username=${username}&doc=${docId}`

  return `${import.meta.env.VITE_WEBSOCKET_URL}?username=${username}&doc=${docId}`
}