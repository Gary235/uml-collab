import { FC } from "react";
import classnames from "../utils/classnames";
import randomColor from "../utils/randomColor";

interface IProps {
  usernames: Set<string>;
}

const Avatars: FC<IProps> = ({usernames}) => {
  return (
    <div className="flex gap-1">
      {
        Array.from(usernames).map((username) => (
          <span
            key={username}
            title={username}
            className={classnames(
              'w-4 h-4',
              'rounded-xl border-2 border-white',
              randomColor()
            )}
          />
        ))
      }
    </div>
  )
}

export default Avatars;
