const uri = 'mongodb+srv://Bobur:2vhYyYBf659w6eCm@cluster0.jnpjw6n.mongodb.net/People'
const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(uri, () => {
            console.log('MongoDB connected successfully');
        })
    } catch (error) {
        console.log(error);
    }
}