const mongoose = require('mongoose'); 
const mongoURI = process.env.dblink;
//add mongoURI variable 

//const connectDB = async () => {
async function connectDB() {
	try {
			await mongoose.connect(mongoURI, {
			useNewUrlParser: true, 
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('MongoDB connected');
	} catch (error) {
		console.error(error.message); 
		process.exit(1); 

	}
};


module.exports = connectDB; 
