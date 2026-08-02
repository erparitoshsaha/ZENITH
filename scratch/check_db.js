import 'dotenv/config';
import mongoose from 'mongoose';
import Media from '../api/_models/Media.js';

const directFallbackURI = 'mongodb://zenith_admin:XfKCHbG6mDo1j1Uh@ac-bggeit8-shard-00-00.fg0dyzo.mongodb.net:27017,ac-bggeit8-shard-00-01.fg0dyzo.mongodb.net:27017,ac-bggeit8-shard-00-02.fg0dyzo.mongodb.net:27017/khroniq-watches?ssl=true&authSource=admin';
const mongoURI = process.env.MONGODB_URI || directFallbackURI;

async function run() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to DB');
    const media = await Media.find({});
    console.log('Media count:', media.length);
    console.log('Media items:', JSON.stringify(media, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}
run();
