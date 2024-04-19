import React,{useState} from 'react';
import './Template.css'
import { Button } from '@material-tailwind/react';
import html2canvas from "html2canvas";
import { generateData } from '../../API/api';
import BarLoader from "react-spinners/BarLoader";
import toast, {Toaster} from "react-hot-toast";

const Template1 = ({date,author,imgsrc,title,content,prompt}) => {
  const [img,setimg]=useState(imgsrc)
  const [blogtitle,setblogtitle]=useState(title)
  const [blogcontent,setblogcontent]=useState(content)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading,setloading]=useState(false)
  const [openalert,setopenalert]=useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleBlogDownload = async () => {
    if (!imageLoaded) return;

    const element = document.getElementById('print');
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');

    link.href = data;
    link.download = 'screenimage.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRegenerate=async()=>{
    console.log(prompt)
    try {
      setloading(true)
      const { imgsrc, title, content } = await generateData(prompt); // Use the API function
      // Update state or perform any necessary actions...
      setimg(imgsrc)
      setblogtitle(title)
      setblogcontent(content)
    } catch (error) {
      console.error('Error occurred while regenerating:', error);
    } finally{
      setloading(false)
    }
  };
  const handleCopyContent=async()=>{
    try{
      const contentElement = document.querySelector('.blog-content');
    
    // Extract only text content without HTML tags
      const contentText = contentElement.innerText;

      // Copy the text content to the clipboard
      await navigator.clipboard.writeText(contentText);
      setopenalert(true)
      toast.success('Copied Successfully', {
        style: {
          border: '1px solid #36454F',
          padding: '16px',
          color: '#36454F',
        },
        iconTheme: {
          primary: '#36454F',
          secondary: '#FFFAEE',
        },
      })
    }catch(err){
      alert("Copy Failed",err)
    }
  }
  const handleImageDownload=async()=>{
    try {
      const element = document.querySelector('.image img');
  
      // Create a canvas from the image
      const canvas = await html2canvas(element);
  
      // Convert canvas to data URL
      const imageData = canvas.toDataURL('image/jpeg');
  
      // Create a link element to trigger download
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'image.jpg';
  
      // Simulate click on the link to trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Image download failed:', err);
    }
  }

  return (
    <div>
      {
        loading?
        <div className='pb-52 h-screen flex justify-center items-center'>
          <BarLoader color={"#2b303b"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/>
        </div>
        :
        <div className='p-5 flex flex-col justify-center'>
          <div><Toaster toastOptions={{duration:5000}}/></div>
          <div className='p-5 flex flex-col gap-5 blog'id='print'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-left font-bold text-4xl'>{blogtitle}</h1>
              <div className='flex gap-3'>
                <p><span className='font-semibold'>Author :</span> {author}</p>
                <p><span className='font-semibold'>Date :</span> {date}</p>
              </div>
            </div>
            <div className='w-1/2 image'>
              <img src={`data:image/jpeg;base64,${img}`} alt="" onLoad={handleImageLoad}/>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{__html:blogcontent}} className='blog-content'>
              </div>
            </div>
          </div>
          <div className='p-5 flex gap-4'>
            <Button onClick={handleBlogDownload}>Download Blog</Button>
            <Button onClick={handleRegenerate}>Regenerate</Button>
            <Button onClick={handleCopyContent}>Copy Content</Button>
            <Button onClick={handleImageDownload}>Download Image</Button>
          </div>
        </div>
      }
    </div>
    
  )
}

export default Template1;