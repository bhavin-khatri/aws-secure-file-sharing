import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUrl, uploadData } from '@aws-amplify/storage'
import { fetchAuthSession, getCurrentUser, signIn } from '@aws-amplify/auth'
import { fetchImageMetadata, generateCode } from '../../Utils/Utils'
import styles from "./Download.module.css"

const username:any = process.env.REACT_APP_AMPLIFY_USERNAME;
const password:any = process.env.REACT_APP_AMPLIFY_PASSWORD;
const Download: React.FC = () => {
    const [searchParams] = useSearchParams();
    const accessCode = generateCode();
    const fileId = searchParams.get('file') ?? '';
    const [codeInput, setCodeInput] = useState('');
    const [fileReady, setFileReady] = useState(false);
    const [fileResult, setFileResult] = useState<any>({
        message:"",
        status:false
    });

    useEffect(() => {
        const checkAndSignIn = async () => {
            try {
                await getCurrentUser(); // ✅ If this works, user is already signed in
                console.log('User is already signed in');
            } catch {
                // 🔐 If not signed in, then do sign in
                try {
                    signInToAmplify()
                } catch (err) {
                    console.error('Sign in error:', err);
                }
            }
        };

        checkAndSignIn();
    }, []);

    async function signInToAmplify() {
        await signIn({ username: username, password: password }).then((data) => {
            console.log(data)
        }).catch((err) => console.log("error== > ", err));
    }


    useEffect(() => {
        if (fileId) {
            setFileReady(true); // Trigger prompt if fileId is present
        }
    }, [fileId]);

    const updateMetadata = async (key: string, newCode: string) => {
        try {
            // Step 1: Get signed URL to fetch file blob
            const signedUrl: any = await getUrl({
                key,
                options: {
                    accessLevel: 'private',
                    expiresIn: 300,
                },
            });

            // Step 2: Fetch file as blob
            const response = await fetch(signedUrl.url);
            const blob = await response.blob();

            // Step 3: Re-upload the same file with updated metadata
            await uploadData({
                key,
                data: blob,
                options: {
                    accessLevel: 'private',
                    contentType: blob.type,
                    metadata: {
                        code: newCode, // Updated code here
                    },
                },
            }).result;

            console.log('Metadata (code) updated after download.');
        } catch (err) {
            console.error('Error updating metadata:', err);
        }
    };

    const downloadImage = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileId;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setFileResult({message:"Downloaded Successfully",status:true})
    };

    const handleDownload = async () => {
        try {
            const session = await fetchAuthSession();
            console.log("session==== > ",session)
            const identityId = session.identityId;

            if (!identityId) {
                setFileResult({message:"User not authenticated",status:false})
                return;
            }

            const metadata = await fetchImageMetadata(fileId);
            const storedCode = metadata?.code;

            if (storedCode !== codeInput) {
                setFileResult({message:"Invalid Code",status:false})
                return;
            }

            const url: any = await getUrl({
                key: fileId,
                options: {
                    accessLevel: 'private',
                    expiresIn: 300,
                    contentDisposition: 'attachment',
                }
            });
            updateMetadata(fileId,accessCode)
            downloadImage(url.url);

        } catch (err) {
            console.error('Login error:', err);
            setFileResult({message:err,status:false})
        }
    };

    return (
      <div className={styles.mainView}>
          <div className={styles.downloadCurveView}>
              {fileReady ? (
                <>
                    <h2>Download File</h2>
                    <p><strong>File:</strong> {fileId}</p>
                    <input
                      maxLength={4}
                      placeholder="Enter 4 digit code"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      className={styles.codeInput}
                    />
                    {fileResult && fileResult.message ?
                      <text className={styles.fileResultStyle} style={{
                          color: fileResult.status ? '#71d247' : "#d24747"
                      }}>{fileResult.message}</text>
                      :null
                    }
                    <button onClick={()=>handleDownload()} className={styles.downloadButton}>
                        Download
                    </button>

                </>
              ) : (
                <p>No file specified.</p>
              )}

          </div>

      </div>
    );
};

export default Download;
