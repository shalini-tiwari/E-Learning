import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbConnection = async () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect("mongodb+srv://admin:admin%40123@e-learning.b8sexcy.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected')
    })
    .catch((err) => {
      console.log(err)
    })
}

export default dbConnection
