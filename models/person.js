const mongoose = require("mongoose");
// this is used to encrypt the password
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true,
        enum: ["chef", "waiter", "owner"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//.pre means we need to do it before saving data in db
personSchema.pre('save', async (next) => {
    const person = this;
    // if password is not modified
    if (!person.isModified('password')) {
        return next();
    }
    //hash the password only when updated or new
    try {
        // salt genration 
        const salt = await bcrypt.genSalt(10);
        //hash password
        const hashedpassword = await bcrypt.hash(person.password, salt);
        person.password = hashedpassword;
        next();
    } catch (error) {
        return next(error);
    }
})


// this is a method which is used for verifying whetehr the entered password is correcct or not 
personSchema.methods.comparePassword = async (candidatePassword) => {
    try {

        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    } catch (error) {
        throw error;

    }
}


// create model

const person = mongoose.model('person', personSchema);

module.exports = person;