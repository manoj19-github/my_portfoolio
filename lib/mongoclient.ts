import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL!;

if (!uri) {
  throw new Error('❌ DATABASE_URL is not defined');
}

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
};

export const client:any =
  globalForMongo.mongoClient ??
  new MongoClient(uri);

if (process.env.NODE_ENV !== 'production') {
  globalForMongo.mongoClient = client;
}

// connect once
export const connectDB = async () => {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db(); // default DB from URI
};