import axios from 'axios';

export const generateData = async (prompt) => {
  const imgapi = "https://blog-post-composer-server.vercel.app/generateimg";
  const textapi = "https://blog-post-composer-server.vercel.app/generatetitle";
  const contentapi = "https://blog-post-composer-server.vercel.app/generatecontent";

  const data = { prompt };
  const axiosConfig = {
    timeout: 30000 // Timeout set to 30 seconds (adjust as needed)
  };
  const [imgresponse, textresponse, contentresponse] = await Promise.all([
    axios.post(imgapi, data, axiosConfig),
    axios.post(textapi, data, axiosConfig),
    axios.post(contentapi, data, axiosConfig)
  ]);

  return {
    imgsrc: imgresponse.data.src,
    title: textresponse.data,
    content: contentresponse.data
  };
};