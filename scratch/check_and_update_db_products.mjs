import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  category: String,
  gender: String,
  description: String,
  image: String,
  badge: String,
  unitCodes: Array,
  reviews: Array,
  customizable: Boolean,
  specs: Object
});

const Product = mongoose.model('Product', productSchema, 'products');

const sampleImages = [
  'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop'
];

async function run() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://zenith_admin:XfKCHbG6mDo1j1Uh@ac-bggeit8-shard-00-00.fg0dyzo.mongodb.net:27017,ac-bggeit8-shard-00-01.fg0dyzo.mongodb.net:27017,ac-bggeit8-shard-00-02.fg0dyzo.mongodb.net:27017/khroniq-watches?ssl=true&authSource=admin';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Found ${products.length} products in DB`);

    let updatedCount = 0;
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      console.log(`Product ${i + 1}: ${p.name} -> image: "${p.image}"`);

      // If image is missing, blank, or placeholder.jpg, give it a beautiful high-res image
      if (!p.image || p.image === '/placeholder.jpg' || p.image.trim() === '') {
        p.image = sampleImages[i % sampleImages.length];
        await p.save();
        updatedCount++;
        console.log(`  Updated image to: ${p.image}`);
      }
    }

    console.log(`Done! Updated ${updatedCount} products.`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
