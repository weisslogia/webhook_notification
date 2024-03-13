require('dotenv').config();
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()

const PORT = process.env.PORT ?? 3000;
/** Midlewares */
app.use(bodyParser.json({ limit: '10mb' }));
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });


  app.listen(PORT, () => {
    console.log(`Service running on port: ${PORT}`);
  });

  app.post('/api/v1/webhook', async (req, res) => {
    const body = req.body
    await axios.post(`https://api.telegram.org/${process.env.BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.CHAT_ID,
        text: JSON.stringify(body)
    })
    res.status(204).json({})
  })