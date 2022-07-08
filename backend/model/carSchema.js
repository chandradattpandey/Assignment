const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    
    dealerId:{ type: mongoose.Schema.Types.ObjectId, ref:'dealers',require:true},
    
    name :{type:String},
    brand:{type:String},
    modal:{type:String},
    color:{type:String},
    price:{type:Number},

});

module.exports = mongoose.model('cars',carSchema);