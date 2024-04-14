import { type FC } from "react";
import classnames from "../utils/classnames";
import useDoc from "../store/doc-store";
import Avatars from "./Avatars";
import toast from "react-hot-toast";

const Nav: FC = () => {
  const {connect, docId, usernames, disconnect} =
    useDoc(({connect, docId, usernames, disconnect}) => ({connect, docId, usernames, disconnect}));

  const onConnect = () => {
    const s = connect(null);
    window.history.pushState({}, '', `?s=${s}`);
    toast.success(
      'The doc is now connected! \n\nShare the url with your colleagues to edit at the same time.',
      {duration: 7000}
    );
  }

  const onDisconnect = () => {
    disconnect();
    window.history.pushState({}, '', window.location.origin);
    toast.success('The doc was disconnected.');
  }

  return (
    <div className={classnames(
      'font-mono',
      'bg-[rgba(41,13,8,0.6)] text-[#fff2ee]',
      'backdrop-blur-md',
      'w-[50%] h-15',
      'rounded-[6px]',
      'shadow-lg',
      'p-3',
      'fixed left-[25%] top-2',
      'flex items-center justify-between',
      'transition-all'
    )}>
      UMLCollab
      {!!docId && <Avatars usernames={usernames} />}
      <button
        onClick={docId ? onDisconnect : onConnect}
        className={classnames(
          'bg-[#ee542e] text-[#fff2ee] hover:bg-[#f15555]',
          'px-3 py-1',
          'rounded-[4px]',
          'transition-colors duration-200'
        )}
      >
        {docId ? 'disconnect' : 'connect'}
      </button>
    </div>
  );
}

export default Nav;
