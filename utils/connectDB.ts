
import  mongoose  from 'mongoose';

const connectDB = () => {
     if(mongoose.connections[0].readyState) {
          console.log("Already Connected.")
          return;
     }
     mongoose.set('strictQuery', true);
     mongoose.connect(`${process.env.MONGODB_URL}`,(err) => {
          if(err) throw err
          console.log("Connected to mongodb.")
     })
} 

export default connectDB