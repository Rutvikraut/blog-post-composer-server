import axios from 'axios';

export const generateData = async (prompt) => {
  const imgapi = "https://blog-post-composer-server.vercel.app/generateimg";
  const textapi = "https://blog-post-composer-server.vercel.app/generatetitle";
  const contentapi = "https://blog-post-composer-server.vercel.app/generatecontent";

  const data = { prompt };
  const [imgresponse, textresponse, contentresponse] = await Promise.all([
    axios.post(imgapi, data),
    axios.post(textapi, data),
    axios.post(contentapi, data)
  ]);

  return {
    imgsrc: imgresponse.data.src,
    title: textresponse.data,
    content: contentresponse.data
  };
};