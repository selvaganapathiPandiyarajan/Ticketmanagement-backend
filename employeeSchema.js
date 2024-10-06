const mongoose =require('mongoose');


const employeeDetails =new mongoose.Schema(
    {
        firstname:
        {
            type:String,
            requried:true
        },
        lastname:
        {
            type:String,
            requried:true   
        },
        email:
        {
            type:String,
            requried:true    
        },
        password:
        {
            type:String,
            requried:true      
        },
        conpassword:
        {
            type:String,
            requried:true    
        },
        designation:
        {
            type:String,
            requried:true          
        },
        category:
        {
            type:String,
            requried:true   
        },
        otpValue:
        {
            type:String,
            requried:true  
        }
    }
)
module.exports=mongoose.model('employeeDetails',employeeDetails)