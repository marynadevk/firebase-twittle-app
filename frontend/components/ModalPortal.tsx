// 'use client';

// import { FC, ReactNode } from 'react';
// import { createPortal } from 'react-dom';

// interface ModalPortalProps {
//   children: ReactNode;
// }

// const ModalPortal: FC<ModalPortalProps> = ({ children }) => {
//   if (typeof window === 'undefined') return null;

//   const modalRoot = document.getElementById('modal-root');
//   return modalRoot ? createPortal(children, modalRoot) : null;
// };

// export default ModalPortal;
