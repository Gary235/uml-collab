import { useEffect, useRef, MouseEvent, useState } from "react";
import classnames from "./utils/classnames";
import mermaid from "mermaid";

import useDoc from "./store/doc-store";

import Doc from "./components/Doc";
import Diagram from "./components/Diagram";
import Nav from "./components/Nav";
import { Toaster } from "react-hot-toast";
import ContextMenu from "./components/ContextMenu";

interface IMouse {
  isDown: boolean;
  startX: number;
  scrollLeft: number;
  startY: number;
  scrollTop: number;
}

interface IMenu {
  x: number;
  y: number;
}


const App = () => {
  const {connect} = useDoc(({connect}) => ({connect}))

  const appRef = useRef<HTMLElement | null>(null)
  const contextMenuRef = useRef<HTMLElement | null>(null)
  const mouse = useRef<IMouse>({ isDown: false, startX: 0, scrollLeft: 0, startY: 0, scrollTop: 0 })
  const menu = useRef<IMenu>({ x: 0, y: 0 })

  const [showContextMenu, setShowContextMenu] = useState(false)

  useEffect(() => {
    mermaid.initialize({startOnLoad: true})
    const params = new URLSearchParams(window.location.search);
    const session = params.get('s') || null;

    if (session) connect(session);

    const onClickOutsideContextMenu = (e: Event) => {
      if (!showContextMenu) return;
      if (contextMenuRef.current?.contains((e.target as HTMLElement))) return;

      hideMenu();
    }
    document.addEventListener('click', onClickOutsideContextMenu)

    return () => {document.removeEventListener('click', onClickOutsideContextMenu)}
  }, []);

  const hideMenu = () => setShowContextMenu(false);

  const onDragStart = (e: MouseEvent) => {
    if (!appRef.current) return;
    if ((e.target as HTMLElement).id !== 'app') return;
    if (showContextMenu) hideMenu();

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

  const onContextMenu = (e: MouseEvent) => {
    if (!appRef.current) return;
    if ((e.target as HTMLElement).id !== 'app') return;
    e.preventDefault();

    menu.current = {
      x: e.clientX + 215 <= window.innerWidth ? e.clientX + 5 : e.clientX - 215,
      y: e.clientY + 215 <= window.innerHeight ? e.clientY : e.clientY - 215
    }
    setShowContextMenu(true)
  }

  return (
    <main
      id="app"
      ref={appRef}
      className={classnames('w-screen h-screen', 'overflow-hidden cursor-grab')}
      onMouseDown={onDragStart}
      onMouseLeave={stopTrackingMouse}
      onMouseUp={stopTrackingMouse}
      onMouseMove={onDragMove}
      onContextMenu={onContextMenu}
    >
      <ContextMenu
        reference={contextMenuRef}
        show={showContextMenu}
        x={menu.current.x}
        y={menu.current.y}
        close={hideMenu}
      />
      <Nav />
      <Diagram />
      <Doc />
      <Toaster position="bottom-center" reverseOrder />
    </main>
  );
}

export default App;
