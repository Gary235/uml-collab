import { useEffect } from "react";
import classnames from "./utils/classnames";
import mermaid from "mermaid";

import useDoc from "./store/doc-store";

import Doc from "./components/Doc";
import Diagram from "./components/Diagram";
import Nav from "./components/Nav";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {connect} = useDoc(({connect}) => ({connect}))

  useEffect(() => {
    mermaid.initialize({startOnLoad: true})
    const params = new URLSearchParams(window.location.search);
    const session = params.get('s') || null;

    if (session) connect(session);
  }, []);


  return (
    <main
      id="app"
      className={classnames(
        'w-screen h-screen',
        'flex justify-center items-center',
        'bg-[#fff2ee]',
        'relative'
      )}
    >
      <Nav />
      <Diagram />
      <Doc />
      <Toaster position="bottom-center" reverseOrder={true} />
    </main>
  );
}

export default App;
