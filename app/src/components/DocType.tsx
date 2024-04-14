import { FC } from "react";
import classnames from "../utils/classnames";

interface IProps {
  onClick: () => void;
  isActive: boolean;
  label: string;
}

const DocType: FC<IProps> = ({onClick, isActive, label}) => {

  return (
    <button onClick={onClick} className={classnames(
      'py-1 px-3',
      'border-2 rounded-[20px]',
      'text-sm whitespace-nowrap select-none',
      'hover:bg-[#ee542eb4] transition-colors hover:text-[#fff2ee]',
      isActive && 'bg-[#ee542e73] text-[#fff2ee] border-[#fff2ee]',
      !isActive && 'bg-transparent text-[#c9aba2] border-[#c9aba2]',
    )}>
      {label}
    </button>
  )
}

export default DocType;
