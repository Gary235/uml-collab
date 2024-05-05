import { useEffect, useState, type FC } from "react";
import mermaid from "mermaid";
import classnames from "../utils/classnames";

import useDoc from "../store/doc-store";

const Diagram: FC = () => {
  const [error, setError] = useState('');
  const [diagram, setDiagram] = useState('');
  const [dimensions, setDimensions] = useState({h: '100vh', w: '100vw'});
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
        document.querySelector('#diagram-error')
          ?.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
      }
    };

    // if (docValue) drawDiagram();
    drawDiagram();

    setTimeout(() => {
      const graph: SVGElement | null = document.querySelector('#graphDiv');
      if (graph) {
        const {height, width} = graph.getBoundingClientRect();
        let newHeight = dimensions.h, newWidth = dimensions.w;

        if (height > window.innerHeight - 200) {
          newHeight = `${height * 1.5}px`
        } else if (height < window.innerHeight && dimensions.h !== '100vh') {
          newHeight = `100vh`
        }

        if (width > window.innerWidth - 200) {
          newWidth = `${width * 1.5}px`
        } else if (height < window.innerWidth && dimensions.w !== '100vw') {
          newWidth = '100vw'
        }

        if (newWidth !== dimensions.w || newHeight !== dimensions.h) {
          setDimensions({w: newWidth, h: newHeight})
        }
      }
    }, 200)
  }, [docValue, docType])

  if (error) {
    return (
      <div className={classnames('w-screen h-screen flex items-center justify-center')}>
        <p
          id="diagram-error"
          className={classnames(
            'select-none',
            'bg-red-200 text-red-950 font-semibold',
            'max-w-[50%] text-center',
            'px-4 py-2',
            'rounded-md'
          )}
        >
          🙅 {error}
        </p>
      </div>
    )
  }

  return (
    <div
      id="diagram"
      dangerouslySetInnerHTML={{__html: diagram}}
      style={{
        width: dimensions.w,
        height: dimensions.h
      }}
      className={classnames(
        'flex items-start justify-center',
        'pointer-events-none'
      )}
    />
  );
}

export default Diagram;
