// importing package
import mongoose from 'mongoose';


// connecting to db
mongoose.connect("mongodb://localhost/eduweb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(console.log('database is connected...'))
.catch((err) => console.log(err))