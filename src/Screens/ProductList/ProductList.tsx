// import React, { useEffect, useState } from 'react';
// import { list } from '@aws-amplify/storage';
//
// interface FileItem {
//   key: string;
//   name: string;
// }
//
// const ProductList: React.FC = () => {
//   const [files, setFiles] = useState<FileItem[]>([]);
//   const [loading, setLoading] = useState(false);
//
//   const fetchFiles = async () => {
//     setLoading(true);
//     try {
//       const result = await list('', {
//         accessLevel: 'private',
//       });
//
//       const fileList = result.items.map(item => ({
//         key: item.key,
//         name: item.key.split('/').pop() || item.key,
//       }));
//
//       setFiles(fileList);
//     } catch (error) {
//       console.error('Error fetching file list:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   useEffect(() => {
//     fetchFiles();
//   }, []);
//
//   const handleShare = (file: FileItem) => {
//     console.log('Share clicked for:', file.name);
//     // You can trigger a modal, generate a signed URL, etc.
//   };
//
//   return (
//     <div>
//       <h2>Uploaded Files</h2>
//       {loading ? (
//         <p>Loading files...</p>
//       ) : (
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {files.map((file) => (
//             <li
//               key={file.key}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 marginBottom: '1rem',
//                 border: '1px solid #ccc',
//                 padding: '10px',
//                 borderRadius: '8px',
//               }}
//             >
//               <div
//                 style={{
//                   width: 50,
//                   height: 50,
//                   backgroundColor: '#eee',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginRight: '1rem',
//                   borderRadius: '4px',
//                   fontSize: '1.5rem',
//                 }}
//               >
//                 📄
//               </div>
//               <div style={{ flexGrow: 1 }}>{file.name}</div>
//               <button onClick={() => handleShare(file)}>Share</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
//
// export default ProductList;
