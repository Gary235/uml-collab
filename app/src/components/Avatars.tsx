import { FC } from "react";
import classnames from "../utils/classnames";
import getColor from "../utils/getColor";

interface IProps {
  usernames: Set<string>;
}

const Avatars: FC<IProps> = ({usernames}) => {
  return (
    <div className="flex gap-1">
      {
        Array.from(usernames).map((username, index) => (
          <span
            key={username}
            title={username}
            className={classnames(
              'w-4 h-4',
              'rounded-xl border-2 border-white',
              getColor(index)
            )}
          />
        ))
      }
    </div>
  )
}

export default Avatars;
