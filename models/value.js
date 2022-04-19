const mongoose=require('mongoose')

const inputSchema = mongoose.Schema({
  
  content: String
 
});

const inputModel = mongoose.model('inputModel', inputSchema);
module.exports=inputModel;