import { useEffect, useState, type FC } from "react";
import mermaid from "mermaid";
import classnames from "../utils/classnames";

import useDoc from "../store/doc-store";

const Diagram: FC = () => {
  const [error, setError] = useState('');
  const [diagram, setDiagram] = useState('');
  const {docValue, docType} = useDoc(({docValue, docType}) => ({docValue, docType}));

  useEffect(() => {
    const drawDiagram = async () => {
      if (error) setError('');
      try {
        const {svg} = await mermaid.render('graphDiv', docValue);
        setDiagram(svg);
      } catch (error) {
        // @ts-expect-error this will not break
        setError(error?.message || '');
      }
    };

    if (docValue) drawDiagram();
  }, [docValue, docType])

  if (error) {
    return (
      <p className={classnames(
        'select-none',
        'bg-red-200 text-red-950 font-semibold',
        'max-w-[25%] text-center ',
        'px-4 py-2',
        'rounded-md'
      )}>
        🙅 {error}
      </p>
    )
  }
  return (
    <>
      <div
        dangerouslySetInnerHTML={{__html: diagram}}
        className={classnames(
          'w-screen h-fit'
        )}
      />
    </>
  );
}

export default Diagram;
