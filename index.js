import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {chatCompletion, InferenceClient} from '@huggingface/inference';
import contentRoutes from './routes/content.route.js'

dotenv.config();
const app = express()

app.use(cors({
    origin: 'https://blog-post-composer.vercel.app'
  }))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const token = new InferenceClient(process.env.HUGGING_FACE_ACCESS_TOKEN)

app.get('/', (req, res) => {
    return res.status(200).send("Server is up")
})

// app.post('/generateimg', async (req, res) => {
//     const { prompt } = req.body;
//     console.log(prompt)
//     if (!prompt) {
//         return res.status(400).send('Bad Request')
//     }
//     try {
//         const response = await openai.images.generate({
//             prompt,
//             n: 1,
//             size:"1024x1024",
//             response_format: 'b64_json'
//         },{
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//             }
//         });
//         const blob = response.data[0].b64_json;
//         return res.status(200).send({
//             src: blob
//         });

//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({error})
//     }

// })

// app.post('/generatetitle', async (req, res) => {
//     console.log(req.body.prompt)
//     const inputdata = req.body.prompt;
//     console.log(inputdata)
//     if (!inputdata) {
//         return res.status(400).send('Bad Request');
//     }

//     try {
//         const result = await openai.completions.create({
//             model: 'gpt-3.5-turbo-instruct',
//             prompt: `Generate creative title for ${inputdata}.`,
//             temperature: 0.8,
//             max_tokens: 50,
//             top_p: 1.0,
//             frequency_penalty: 0.5,
//             presence_penalty: 0.0
//         },{
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//             }
//         });
//         const jsonData = result.choices[0].text;
//         console.log(jsonData)
//         const parsedData = JSON.parse(jsonData);

//         return res.status(200).json(parsedData);
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ error: error.message });
//     }
// });
// app.get('/generate', async (req, res) => {
//     // console.log(req.body.prompt)
//     // const inputdata = req.body.prompt;
//     // console.log(inputdata)
//     // if (!inputdata) {
//     //     return res.status(400).send('Bad Request');
//     // }

//     try {
//         const result = await token.chatCompletion({
//             model:"google/gemma-2-2b-it",
//             messages:[
//                 {
//                     role:'user',
//                     content:`Write a blog post on shivaji maharaj with html tags for the title and content only`,
//                 },
//             ],
//             max_tokens:500,
            
//         });
//         console.log(result.choices[0].message.content)
//         const jsonData = result.choices[0].text;
//         console.log(jsonData)
//         // const parsedData = JSON.parse(jsonData);

//         return res.status(200).json(jsonData);
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ error: error.message });
//     }
//     // return res.status(200).send("Server is up");
// });

// app.use('/api',contentRoutes)


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})
