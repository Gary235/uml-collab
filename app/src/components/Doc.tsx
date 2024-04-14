import { useEffect, useRef, useState, type FC } from "react";

import useDoc from "../store/doc-store";
import classnames from "../utils/classnames";

import SlideDownButton from "./buttons/SlideDownButton";
import SlideUpButton from "./buttons/SlideUpButton";


const Doc: FC = () => {
  const [opened, _setOpened] = useState(true)
  const openedRef = useRef(opened)
  const docRef = useRef<HTMLDivElement | null>(null)

  const setOpened = (newVal: boolean) => {
    _setOpened(newVal);
    openedRef.current = newVal;
  }

  const {docValue, setDocValue, send} =
    useDoc(({docValue, setDocValue, send}) => ({docValue, setDocValue, send}));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openedRef.current) close();
      if (e.key === 'ArrowUp' && !openedRef.current) open();
    }

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [])

  const open = () => {
    setOpened(true);
    if (docRef.current) {
      docRef.current.classList.replace('doc-slide-down', 'doc-slide-up');
      docRef.current.focus();
    }
  }

  const close = () => {
    setOpened(false)
    if (docRef.current) docRef.current.classList.replace('doc-slide-up', 'doc-slide-down')
  }

  // @ts-expect-error this will not break
  const onInput = (e) => {
    const prev = docValue;
    const curr = e.target.value;

    send(prev, curr)
    setDocValue(curr)
  }

  return (
    <>
      <div ref={docRef} className={classnames(
        'font-mono',
        'bg-[rgba(41,13,8,0.6)]',
        'backdrop-blur-md',
        'w-[50%] h-[80%]',
        'rounded-[6px]',
        'shadow-[0_35px_60px_-15px_rgba(41,13,8,0.6)]',
        'p-3',
        'fixed left-[25%]',
        'doc-slide-up',
        'flex flex-col gap-3',
        'transition-all'
      )}>
        <div className={classnames('w-full h-[5%]', 'flex items-center justify-between')}>
          {opened ? <SlideDownButton onClick={close} />: <SlideUpButton onClick={open} />}
        </div>
        <textarea
          name='doc-text'
          id='doc-text'
          onInput={onInput}
          value={docValue}
          autoCorrect='off'
          spellCheck='false'
          autoCapitalize="off"
          placeholder="Start your diagram..."
          className={classnames(
            'bg-transparent',
            'outline-none',
            'resize-none',
            'w-full h-[95%]',
            'text-[#fff2ee]',
            'placeholder:text-[#c9aba2]',
          )}
        ></textarea>
      </div>
    </>
  );
}

export default Doc;
