import React, { type PropsWithChildren, type ReactNode } from 'react';
import style from './index.module.css'

interface IProps extends PropsWithChildren {
  title: string;
  operation?: ReactNode;
}

export const Content:React.FC<IProps> = ({title, children, operation}) => {
  return (
    <div>
      <div className={style.title}>
        {title}
        {operation && <span className={style.btn}>{operation}</span>}
      </div>
      <div className={style.content}>{children}</div>
    </div>
  )

}