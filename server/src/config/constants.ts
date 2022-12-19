import dotenv from 'dotenv';

dotenv.config();

const config = {
MONGO_URL: process.env.mongo_url || 'mongodb+srv://monugod:mAtlaspass123@cluster0.uhxg2wf.mongodb.net/smurfs?retryWrites=true&w=majority',
JWT_SECRET: process.env.JWT_SECRET as string || 'Qdf6uh4',
PORT: Number(process.env.PORT) || 3000
}

export default config;
