import React, { useEffect, useState } from 'react'
import { list, uploadData } from '@aws-amplify/storage'
import styles from './ProductList.module.css'
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth'
import { fetchImageMetadata, generateCode, isValidEmail } from '../../Utils/Utils'
import emailjs from '@emailjs/browser'
import { remove } from '@aws-amplify/storage';

const tempJSON = [
  {image:'', fileName: 'Image' , code :"1234", type:"png"},
]
const serviceId:any= process.env.REACT_APP_EMAIL_SERVICE_ID
const templateId:any= process.env.REACT_APP_EMAIL_TEMPLATE_ID
const publicKey:any= process.env.REACT_APP_EMAIL_PUBLIC_KEY
const ProductList: React.FC = () => {
  const [productList, setProductList] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [showAddProductPopUp,setShowAddProductPopup]= useState(false)
  const [selectedProduct, setSelectedProduct] = useState<File | null>(null);
  const [selectedShareProduct, setSelectedShareProduct] = useState<any>({
    code:'',
  });
  const [email,setEmail] = useState<string>('')
  const [showEmailPopUp,setShowEmailPopup] = useState<boolean>(false)
  const [fileResult, setFileResult] = useState<any>({
    message:"",
    status:false
  });

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const result = await list({
        prefix: '',
        options: {
          accessLevel: 'private',
          listAll: true,
        },
      });

      const imageItems = result.items.filter(item =>
        /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(item.key)
      );

      const fileList = await Promise.all(
        imageItems.map(async (item) => {
          const fileName = item.key.split('/').pop() || item.key;
          const type = fileName.split('.').pop()?.toLowerCase();
          const metadata = await fetchImageMetadata(item.key);
          return {
            key: item.key,
            fileName,
            type,
            code: metadata.code,
            lastModified: metadata.lastModified,
            image:metadata?.imageUrl
          };
        })
      );

      // Sort by lastModified descending
      fileList.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

      setProductList(fileList);
    } catch (error) {
      console.error('Error fetching file list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    emailjs.init(publicKey);
    fetchFiles();
    setProductList(tempJSON)
  }, []);

  const handleShare = (file: any) => {
    const isValid = isValidEmail(email)
    const downloadUrl = `${window.location.origin}/download?file=${encodeURIComponent(file.fileName)}`;

    if(isValid){
      emailjs.send(serviceId,templateId,{
        passcode: file?.code,
        download_url: downloadUrl,
        email: email,
      }).then((data:any)=>{
        console.log("dataaaaaaa emailll ===== > ",data)
        setFileResult({
          message:'Email Sent',
          status:true
        })
        setShowEmailPopup(false)
      }).catch((error)=>{
        setFileResult({
          message:'',
          status:false
        })
      })

    }else{
      setFileResult({
        message:'Invalid Email',
        status:false
      })
    }
  };

  const handleUpload = async () => {
    const user = await getCurrentUser();
    console.log("user",user)
    if (!user) {
      setFileResult({ message:'Please sign in to upload files.' ,status:false});
      return;
    }
    if (!selectedProduct) {
      setFileResult({ message:'Please select a file.' ,status:false});
      return;
    }

    try {
      // 🔒 Check if user is authenticated
      const session = await fetchAuthSession();
      const isAuthenticated = !!session.credentials;
      console.log("session ===== > ",session)
      if (!isAuthenticated) {
        setFileResult({ message:'Please sign in to upload files.' ,status:false});
        return;
      }

      const key = selectedProduct.name;
      const accessCode = generateCode();

      await uploadData({
        key,
        data: selectedProduct,
        options: {
          accessLevel: 'private',
          metadata: { code: accessCode },
          contentType: selectedProduct.type,
        },
      }).result;
      setFileResult({ message:'Product Added Successfully' ,status:true});
      setTimeout(()=> {
        setShowAddProductPopup(false)
        fetchFiles()
      },500)
    } catch (error) {
      console.error('Upload failed:', error);
      setFileResult({ message:error ,status:false});
    }
  };
  const handleDelete = async (key: string) => {
    try {
      await remove({
        key: key, // this is the filename or full S3 key
        options: {
          accessLevel: 'private', // since you're storing privately
        },
      }).then((data:any)=>{
        console.log("dataDelete == > ",data)
      });
      console.log('File deleted successfully');
      fetchFiles(); // refresh the file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete the file.');
    }
  };

  return (
    <div className={styles.parentView}>
      {showAddProductPopUp ?
        <div className={styles.addProductView} >
          <div style={{
            flexDirection:'row'
          }} className={styles.addProductCurveView}>
            <div className={styles.fileNameMainView}>
            <input type="file" onChange={(e) => {
              console.log("selectedFile ==== > ",e.target.files)
              setSelectedProduct(e.target.files?.[0] ?? null)
              setFileResult({ message:'' ,status:false});
            }} />
              {fileResult && fileResult.message ?
                <text className={styles.fileResultStyle} style={{
                  color: fileResult.status ? '#71d247' : "#d24747"
                }}>{fileResult.message}</text>
                :null
              }
            </div>
            <button onClick={()=>handleUpload()} className={styles.addButtonSmall}>
              Add
            </button>
          </div>

        </div>
        :null
      }
      {showEmailPopUp ?
        <div className={styles.addProductView}>
          <div className={styles.addProductCurveView}>
            <text className={styles.shareEmailPopup}>Send Image via Email</text>
            <div className={styles.fileNameMainView}>
              <input
                type="email"
                placeholder="Enter email"
                className={styles.emailInput}
                onChange={(e) => {
                  console.log("Entered email ====>", e.target.value);
                  setEmail(e.target.value);
                }}
              />
              {fileResult && fileResult.message ?
                <text className={styles.fileResultStyle} style={{
                  color: fileResult.status ? '#71d247' : "#d24747"
                }}>{fileResult.message}</text>
                :null
              }

            </div>
            <button onClick={()=> {
              handleShare(selectedShareProduct)
            }} className={styles.addButtonSmall}>
              Send
            </button>

          </div>

        </div>
        :null
      }

        <div className={styles.mainView}>
          <div className={styles.rowView} style={{alignItems:'flex-end'}}>
            <div>
              <text className={styles.title}>Product List</text>
              <text style={{cursor:'pointer'}} className={styles.title} onClick={()=>fetchFiles()}> 🔄</text>
            </div>

            <button className={styles.addButton} onClick={()=> {
              setFileResult({ message:'' ,status:false});
              setShowAddProductPopup(true)
            }}>
              Add Product
            </button>
          </div>
          {loading ? (
            <p>Fetching list...</p>
          ) : (
        <ul style={{ listStyle: 'none', padding: 0 }} >
          {productList.map((fileItem) => (
            <li key={fileItem.key} className={styles.listView}>
              <div className={styles.rowView}>
                <div className={styles.imageBg}>
                {fileItem.image ?
                  <img src={fileItem.image} style={{
                    height:40,width:40
                  }}/>
                  :
                  <div>📄</div>
                }

                </div>

                <div className={styles.fileNameContainer}>{fileItem.fileName}</div>
              </div>
              <div className={styles.accessCode}>Access Code: <b>{fileItem.code}</b></div>
              <div>
              <button className={styles.shareButtonSmall} onClick={() => {
                setShowEmailPopup(true)
                setSelectedShareProduct(fileItem)
                setFileResult({
                  message:'',
                  status:false
                })
              }}>Share</button>
              <button style={{
                backgroundColor:'#d24747'
              }} className={styles.shareButtonSmall} onClick={() => handleDelete(fileItem.fileName)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
            )}
        </div>

    </div>
  );
};

export default ProductList;
