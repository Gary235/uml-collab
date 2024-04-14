import { useEffect, useState, type FC } from "react";
import mermaid from "mermaid";
import classnames from "../utils/classnames";

import useDoc from "../store/doc-store";

const Diagram: FC = () => {
  const [error, setError] = useState('');
  const [diagram, setDiagram] = useState('');
  const docValue = useDoc(({docValue}) => docValue);

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
  }, [docValue])

  if (error) return <p className="select-none">Oops! An error ocurred, {error}</p>
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
