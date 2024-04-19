import axios from 'axios';

export const generateData = async (prompt) => {
  const imgapi = "http://localhost:8200/generateimg";
  const textapi = "http://localhost:8200/generatetitle";
  const contentapi = "http://localhost:8200/generatecontent";

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