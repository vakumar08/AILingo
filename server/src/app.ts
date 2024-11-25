import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { runAI } from './ai';

const app = express();
const port = 3001;
const upload = multer({ dest: "uploads/" , limits: {fileSize: 9000000}});
const corsOptions: cors.CorsOptions = {
  origin: true,
  methods: ['GET','POST'],
  preflightContinue: false,
  optionsSuccessStatus: 200 
};

//CORS
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to AILingo!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// Send query text to LLM
app.post('/ai', upload.single("audio"), async (req: any, res) => {
  const queryText = req.body.text;
  try{
    const response = await runAI(req.file.filename, queryText);
    res.json(response);
  }
  catch(e){
    console.log("Issue with querying and returning data");
  }
})
