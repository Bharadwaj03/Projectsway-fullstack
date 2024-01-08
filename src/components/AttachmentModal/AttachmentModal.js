



// import React from 'react';
// import './AttachmentModal.css';

// const AttachmentModal = ({ selectedFile, selectedDocument, downloadAttachment, closeAttachmentModal }) => {
//   console.log("selectedFiles", selectedFile);
//   return (
//     selectedDocument && (
//       <div className="attachment-modal">
//         <div className="attachment-details">
//           <h2>Attachments</h2>
          
        
//           {selectedDocument.attachment && (
//             <p style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '12px', marginRight: '199px', display: 'inline', marginTop: '30px' }}>{selectedDocument.attachment}</p>
//           )}

          
//           {selectedFile && selectedFile.length > 0 && (
//             <div>
//               {selectedFile.map((file, index) => (
//                 <p key={index} style={{ backgroundColor: 'lightgrey', width: '120px', marginTop: '20px', borderRadius: '8px',padding:'5px' }}>{file.name}</p>
//               ))}
//             </div>
//           )}

//           <button style={{marginTop:'22px'}} onClick={downloadAttachment}>Download</button>
//           <span className="closess" onClick={closeAttachmentModal}>&times;</span>
//         </div>
//       </div>
//     )
//   );
// };

// export default AttachmentModal;


import React from 'react';
import './AttachmentModal.css';

const AttachmentModal = ({ selectedFile, selectedDocument, downloadAttachment, closeAttachmentModal }) => {
  console.log("selectedFile", selectedFile);

  return (
    selectedDocument && (
      <div className="attachment-modal">
        <div className="attachment-details">
          <h2>Attachments</h2>

          {selectedDocument.attachment && (
            <p style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '12px', marginRight: '199px', display: 'inline', marginTop: '30px' }}>{selectedDocument.attachment}</p>
          )}

          {selectedFile && selectedFile.length > 0 ? (
            <div>
              {selectedFile.map((file, index) => (
                <p key={index} style={{ backgroundColor: 'lightgrey', width: '120px', marginTop: '20px', borderRadius: '8px', padding: '5px' }}>{file.name}</p>
              ))}
            </div>
          ) : (
            <p></p>
          )}

          <button style={{ marginTop: '22px' }} onClick={downloadAttachment}>Download</button>
          <span className="closess" onClick={closeAttachmentModal}>&times;</span>
        </div>
      </div>
    )
  );
};

export default AttachmentModal;


// import React from 'react';
// import './AttachmentModal.css';

// const AttachmentModal = ({ selectedFile, selectedDocument, downloadAttachment, closeAttachmentModal }) => {
//   console.log("selectedFile", selectedFile);

//   return (
//     selectedDocument && (
//       <div className="attachment-modal">
//         <div className="attachment-details">
//           <h2>Attachments</h2>

//           {selectedDocument.attachment && (
//             <p style={{ backgroundColor: 'lightgrey', padding: '10px', borderRadius: '12px', marginRight: '199px', display: 'inline', marginTop: '30px' }}>{selectedDocument.attachment}</p>
//           )}

// {selectedFile[selectedDocument.index] ? (
//   <div>
//     <p style={{ backgroundColor: 'lightgrey', width: '120px', marginTop: '20px', borderRadius: '8px', padding: '5px' }}>
//       {selectedFile[selectedDocument.index].name}
//     </p>
//   </div>
// ) : (
//   <p>No file selected</p>
// )}


//           <button style={{ marginTop: '22px' }} onClick={downloadAttachment}>Download</button>
//           <span className="closess" onClick={closeAttachmentModal}>&times;</span>
//         </div>
//       </div>
//     )
//   );
// };

// export default AttachmentModal;


