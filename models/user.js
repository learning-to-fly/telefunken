var mangoose = require('mangoose');

var userSchema = mangoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(text) {
                return text.indexOf('@') === 0;
            },
            message: 'Email address must contain @'
        }
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required:true
    },
    passwordConf: {
        type: String,
        required:true
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
});