const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: {type:String,required: true, unique: true },
    qty: {type:Number},
},{
    timestamps: true,
});


module.exports = mongoose.model('product', product)