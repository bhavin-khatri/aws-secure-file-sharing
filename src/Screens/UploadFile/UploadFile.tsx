import React, { useState } from 'react'
import { uploadData } from '@aws-amplify/storage'
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth'
import { Logger } from '../../Components/Logger/Logger'

const UploadFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const generateCode = (): string => Math.floor(1000 + Math.random() * 9000).toString();

  const handleUpload = async () => {
    const user = await getCurrentUser();
    console.log("user",user)
    if (!user) {
      alert('Please sign in to upload files.');
      return;
    }
    if (!file) {
      alert('Please select a file.');
      return;
    }

    try {
      // 🔒 Check if user is authenticated
      const session = await fetchAuthSession();
      const isAuthenticated = !!session.credentials;
      console.log("session ===== > ",session)
      Logger("isAuthenticated ===== > ",isAuthenticated)
      if (!isAuthenticated) {
        alert('Please sign in to upload files.');
        return;
      }
      const key = file.name;
      const accessCode = generateCode();

      await uploadData({
        key,
        data: file,
        options: {
          accessLevel: 'private',
          metadata: { code: accessCode },
          contentType: file.type,
        },
      }).result;
      setFileId(key);
      setCode(accessCode);
      alert('Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Upload failed. Please check the console for details. ${error}`);
    }
  };

  return (
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button onClick={handleUpload}>Upload</button>
        {fileId && code && (
            <p>
              File ID: {fileId} <br />
              Access Code: {code}
            </p>
        )}
      </div>
  );
};

export default UploadFile;
