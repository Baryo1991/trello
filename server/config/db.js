
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_CONNECTION, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log(`MongoDB is Connected: ${connection.host}`)
  } catch (error) {
      console.error(error);
    process.exit(1)
  }
}

