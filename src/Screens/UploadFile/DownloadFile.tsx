import React, { useState } from 'react'
import { getUrl, getProperties } from '@aws-amplify/storage'
import AWS from 'aws-sdk'
import { fetchAuthSession } from '@aws-amplify/auth'
const DownloadFile: React.FC = () => {
    const [fileId, setFileId] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');

    async function configureAWSSDK() {
        const session :any = await fetchAuthSession();
        const creds :any= session.credentials;

        if (!creds) {
            throw new Error("No credentials found in session.");
        }

        const { accessKeyId, secretAccessKey, sessionToken } = creds; // ✅ Safe access

        console.log("accessKeyId ==== > ",accessKeyId)
        console.log("secretAccessKey ==== > ",secretAccessKey)
        console.log("sessionToken ==== > ",sessionToken)

        AWS.config.update({
            region: 'ap-south-1',
            credentials: {
                accessKeyId,
                secretAccessKey,
                sessionToken,
            },
        });
    }
    const getMetadata = async (fileId: string, identityId: string) => {
        await configureAWSSDK();
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'secure-file-sharing52fb7-dev',
            Key: `private/${identityId}/${fileId}`,
        };

        console.log('Checking S3 URL: ', `https://${params.Bucket}.s3.ap-south-1.amazonaws.com/${params.Key}`);

        try {
            const head = await s3.headObject(params).promise();
            console.log('head=======>:', head);
            console.log('Metadata:', head.Metadata);
            return head.Metadata;
        } catch (err) {
            console.error('Error getting metadata:', err);
            throw err;
        }
    };

    const downloadImage=(downloadUrl:string)=>{
        console.log("downloadUrl ====== > ",downloadUrl)
        const link = document.createElement('a');
        console.log("link ==== > ",link)
        console.log("fileId ==== > ",fileId)
        link.href = downloadUrl;
        link.download = fileId; // Suggests filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    const handleDownload = async () => {
        try {
            const session = await fetchAuthSession();
            const identityId = session.identityId; // 👈 needed to construct S3 key
            if (!identityId) {
                alert('User not authenticated');
                return;
            }

            // ✅ Get metadata from S3 (includes the code)
            const metadata = await getMetadata(fileId, identityId);
            console.log("metaData==== > ",metadata)
            const storedCode = metadata?.code;

            if (storedCode !== codeInput) {
                alert('Invalid access code');
                return;
            }

            // ✅ Access code is correct → get signed URL


            const url  :any = await getUrl({
                key: fileId,
                options: {
                    accessLevel: 'private',
                    expiresIn: 300,
                    contentDisposition: 'attachment',
                },
            });

            console.log("url ===== > ",url)

            setDownloadUrl(url.url);
            downloadImage(url.url)
        } catch (err) {
            console.error('Download error:', err);
            alert('Error downloading file. See console for details.');
        }
    };
    return (
        <div>
            <input
                placeholder="File ID"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
            />
            <input
                placeholder="Access Code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
            />
            <button onClick={()=>handleDownload()}>Download</button>
            {/*{downloadUrl && (*/}
            {/*  <a*/}
            {/*    href={downloadUrl}*/}
            {/*    download*/}
            {/*    target="_blank"*/}
            {/*  >*/}
            {/*      Click to download*/}
            {/*  </a>*/}
            {/*)}*/}


        </div>
    );
};

export default DownloadFile;
