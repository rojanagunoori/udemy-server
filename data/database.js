import mongoose from 'mongoose'

//console.log(process.env.MONGO_URI)


export const connectDB=async()=>{
  
    try {
      //console.log(process.env.MONGO_URI);

      const connection=  await mongoose.connect(process.env.MONGO_URI,{
        dbName:"nikhil",
      });

      console.log(`Server connected to database ${connection.connection.host}`)
        
    } catch (error) {
        console.log("Some Error Occurred",error);
        process.exit(1);
        
    }
}
