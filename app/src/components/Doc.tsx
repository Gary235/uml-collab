import { useEffect, useRef, useState, type FC } from "react";

import useDoc from "../store/doc-store";
import classnames from "../utils/classnames";

import SlideDownButton from "./buttons/SlideDownButton";
import SlideUpButton from "./buttons/SlideUpButton";
import DocType from "./DocType";
import { DOC_TYPES } from "../constants/doc-types";


const Doc: FC = () => {
  const [opened, _setOpened] = useState(true)
  const openedRef = useRef(opened)
  const docRef = useRef<HTMLDivElement | null>(null)

  const setOpened = (newVal: boolean) => {
    _setOpened(newVal);
    openedRef.current = newVal;
  }

  const {docType, setDocType, docValue, setDocValue, send} =
    useDoc(({docType, setDocType, docValue, setDocValue, send}) =>
      ({docType, setDocType, docValue, setDocValue, send}));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openedRef.current) close();
      if (e.key === 'ArrowUp' && !openedRef.current) open();
    }

    // @ts-expect-error this will not break
    function onDocKeyDown(e) {
      if (e.key === 'Tab' && openedRef.current) {
        e.preventDefault();
        const val = e.target.value;
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        onInput(val.substring(0, start) + "\t" + val.substring(end));
      }

      if (e.key === '{' && openedRef.current) {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const val = e.target.value;
        onInput(val.substring(0, start) + "{}" + val.substring(end));
      }
    }

    document.addEventListener('keydown', onKeyDown, true);
    document.querySelector('#doc-text')?.addEventListener('keydown', onDocKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.querySelector('#doc-text')?.removeEventListener('keydown', onDocKeyDown, true)
    }
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

  const onInput = (curr: string) => {
    const prev = docValue;

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
        <div id="doc-types" className={classnames(
          'w-full h-[6%] min-h-12 overflow-hidden py-1',
          'flex gap-2',
          'overflow-x-scroll'
        )}>
          {Object.entries(DOC_TYPES).map(([type, label]) => (
            <DocType
              onClick={() => setDocType(type)}
              label={label}
              key={type}
              isActive={type === docType}
            />
          ))}
        </div>
        <textarea
          name='doc-text'
          id='doc-text'
          autoFocus
          // @ts-expect-error this will not break
          onInput={(e) => onInput(e.target.value)}
          value={docValue}
          autoCorrect='off'
          spellCheck='false'
          autoCapitalize="off"
          placeholder="Start your diagram..."
          className={classnames(
            'bg-transparent',
            'outline-none',
            'resize-none',
            'w-full h-[89%]',
            'text-[#fff2ee]',
            'placeholder:text-[#c9aba2]',
          )}
        ></textarea>
      </div>
    </>
  );
}

export default Doc;
