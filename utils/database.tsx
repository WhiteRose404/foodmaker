import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env')
}

let cached: any = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI || "")
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect