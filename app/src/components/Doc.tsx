import { useEffect, useRef, useState, type FC } from "react";

import useDoc from "../store/doc-store";
import classnames from "../utils/classnames";

import SlideDownButton from "./buttons/SlideDownButton";
import SlideUpButton from "./buttons/SlideUpButton";
import DocType from "./DocType";
import { DOC_TYPES } from "../constants/doc-types";
import DocEditor from "./DocEditor";
import { getLanguageDocURL } from "../constants/languages";


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
        'w-[95%] h-fit max-h-[90%]',
        'rounded-[6px]',
        'shadow-[0_35px_60px_-15px_rgba(41,13,8,0.6)]',
        'p-3',
        'fixed left-[2.5%]',
        'doc-slide-up',
        'flex flex-col gap-3',
        'transition-all',
        'lg:w-[50%] lg:left-[25%]',
      )}>
        <div className={classnames('w-full h-10', 'flex items-center justify-between')}>
          {opened ? <SlideDownButton onClick={close} />: <SlideUpButton onClick={open} />}
        </div>
        <div id="doc-types" className={classnames(
          'w-full h-8 min-h-12 overflow-hidden py-1',
          'flex gap-4',
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
        <DocEditor onChange={onInput} value={docValue} language={docType} />
        <p className="text-[12px] text-[#fff2ee]">
          Don't know how to write your diagrams?
          <a
            href={getLanguageDocURL(docType)}
            target="_blank"
            className={classnames(
              'whitespace-nowrap',
              'text-[rgb(255,163,139)]',
              'underline underline-offset-2',
              'hover:underline-offset-4',
              'transition-all',
              'pl-2'
            )}
          >
            Check the docs!
          </a>
        </p>
      </div>
    </>
  );
}

export default Doc;
