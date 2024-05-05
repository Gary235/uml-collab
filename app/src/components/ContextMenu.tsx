import { FC, MutableRefObject } from "react";
import classnames from "../utils/classnames";

interface IProps {
  reference: MutableRefObject<HTMLElement | null>;
  show: boolean;
  x: number;
  y: number;
  close: () => void;
}

const ContextMenu: FC<IProps> = ({reference, show, x, y, close}) => {
  const btnStyles = 'h-12 border-b border-[#29000021] hover:bg-[#fff2ee] transition-colors cursor-pointer';
  const btnDisabled = 'text-gray-400 cursor-not-allowed'

  const hiddenStyles = 'hidden opacity-0';
  const visibleStyles = `visible opacity-1`;

  const exportAsSvg = () => {
    const svg = document.getElementById('graphDiv');
    if (!svg) {
      alert('We couldn\'t find a diagram to export :(')
      return;
    }

    const svgContent = new XMLSerializer().serializeToString(svg);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(svgContent));
    element.setAttribute('download', 'diagram.svg');
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    close();
  }

  return (
    <menu
      ref={reference}
      style={{left: x, top: y}}
      className={classnames(
        'w-52 h-36',
        'bg-white rounded-lg',
        'shadow-lg',
        'flex flex-col',
        'fixed',
        show ? visibleStyles : hiddenStyles
      )}
    >
      <button className={btnStyles} onClick={exportAsSvg}> Export as <strong>SVG</strong></button>
      <button className={`${btnStyles} ${btnDisabled}`} disabled> Export as <strong>PNG</strong></button>
      <button className={`${btnStyles} ${btnDisabled}`} disabled> Export as <strong>JPG</strong></button>
    </menu>
  )
}

export default ContextMenu