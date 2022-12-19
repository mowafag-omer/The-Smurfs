import dotenv from 'dotenv';

dotenv.config();

const config = {
MONGO_URL: process.env.mongo_url || 'mongodb+srv://monugod:mAtlaspass123@cluster0.uhxg2wf.mongodb.net/?retryWrites=true&w=majority',
PORT: Number(process.env.PORT) || 3000
}

export default config;
