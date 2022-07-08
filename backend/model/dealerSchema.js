const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealerSchema = new Schema({

    dealer_name:{type:String},

    location:{
        longitude:{type:Number},
        latitude:{type:Number}
    },
    
    totalBudget:{type:Number},
    remaining:{type:Number},
    
    owner:{
        first_name:{type:String},
        last_name:{type:String}
    }
});

module.exports = mongoose.model('dealers',dealerSchema);