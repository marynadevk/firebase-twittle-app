// import React, { FC, ReactNode } from 'react';
// import ModalPortal from './ModalPortal';

// type NewPostModalProps = {
//   children: ReactNode;
//   isOpen: boolean;
//   onClose: () => void;
// };

// const NewPostModal: FC<NewPostModalProps> = ({ children, isOpen, onClose }) => {
//   return (
//     <ModalPortal>
//       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//         <div className="bg-white p-6 rounded shadow-lg flex flex-col">
//           {children}
//           <div className="bg-white p-6 rounded shadow-lg flex flex-col">
//             <button className="btn btn-outline btn-accent" onClick={onClose}>
//               Close
//             </button>
//             <button className="btn btn-outline btn-accent">Create Post</button>
//           </div>
//         </div>
//       </div>
//     </ModalPortal>
//   );
// };

// export default NewPostModal;
