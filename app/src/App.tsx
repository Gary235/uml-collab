import { useEffect, useRef, MouseEvent } from "react";
import classnames from "./utils/classnames";
import mermaid from "mermaid";

import useDoc from "./store/doc-store";

import Doc from "./components/Doc";
import Diagram from "./components/Diagram";
import Nav from "./components/Nav";
import { Toaster } from "react-hot-toast";

interface IMouse {
  isDown: boolean;
  startX: number;
  scrollLeft: number;
  startY: number;
  scrollTop: number;
}

const App = () => {
  const {connect} = useDoc(({connect}) => ({connect}))
  const appRef = useRef<HTMLElement | null>(null)
  const mouse = useRef<IMouse>({ isDown: false, startX: 0, scrollLeft: 0, startY: 0, scrollTop: 0 })

  useEffect(() => {
    mermaid.initialize({startOnLoad: true})
    const params = new URLSearchParams(window.location.search);
    const session = params.get('s') || null;

    if (session) connect(session);
  }, []);

  const onDragStart = (e: MouseEvent) => {
    if (!appRef.current) return;
    if ((e.target as HTMLElement).id !== 'app') return;

    mouse.current = {
      isDown: true,
      startX: e.pageX - appRef.current.offsetLeft,
      scrollLeft: appRef.current.scrollLeft,
      startY: e.pageY - appRef.current.offsetTop,
      scrollTop: appRef.current.scrollTop,
    }
    appRef.current.classList.add('grabbing');
  };

  const stopTrackingMouse = () => {
    mouse.current.isDown = false;
    appRef.current?.classList.remove('grabbing');
  };

  const onDragMove = (e: MouseEvent) => {
    e.preventDefault();
    const {isDown, startX, scrollLeft, scrollTop, startY} = mouse.current;
    if (!isDown || !appRef.current) return;

    const x = e.pageX - appRef.current.offsetLeft;
    const walkX = x - startX;
    appRef.current.scrollLeft = scrollLeft - walkX;

    const y = e.pageY - appRef.current.offsetTop;
    const walkY = y - startY;
    appRef.current.scrollTop = scrollTop - walkY;
  };

  return (
    <main
      id="app"
      ref={appRef}
      className={classnames(
        'w-screen h-screen',
        'overflow-hidden cursor-grab'
      )}
      onMouseDown={onDragStart}
      onMouseLeave={stopTrackingMouse}
      onMouseUp={stopTrackingMouse}
      onMouseMove={onDragMove}
    >
      <Nav />
      <Diagram />
      <Doc />
      <Toaster position="bottom-center" reverseOrder />
    </main>
  );
}

export default App;
