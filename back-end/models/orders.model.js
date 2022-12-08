const mongoose = require('mongoose');

const Orders = new mongoose.Schema({
    client:{type:String},
    product:{type:String},
    qty:{type:String},
},{
    timestamps: true,
});


module.exports = mongoose.model('order', Orders)