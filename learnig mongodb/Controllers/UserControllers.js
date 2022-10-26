const UserModel = require("../Models/UserModel")
const bcrypt = require("bcrypt");


module.exports.login = async (request,response)=>
{   let data = request.body;
    try{
         let result = await UserModel.findOne({ //usimg findone
                email:data.email
            });
        if(result==null)
        {
            response.status(200).send({
                status:false,
                message:" username invalid"
            });}

        else {
            let isValid = await bcrypt.compare(data.password,result.password);
            if(isValid){
                response.status(200).send({
                    status:true,
                    message:"login successfully"
                });
            }
            else{
                response.status(200).send({
                    status:false,
                    message:"invalid password"  });
            }          
            }

}
catch(error){
    response.status(500).send({
        status:false,
        error
    })
}
}

module.exports.signUp = async (request,response)=>
{
    let data = request.body;
    try{
    // creating instance
    let salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(data.password,salt);
    let newUser = new UserModel ({
        full_name :data.full_name,
        email:data.email,
        password:newPassword,
        mobile:data.mobile
    });
    // save method
    let result = await newUser.save()
    response.status(200).send({
        status:true,
        result
    });
}

catch(error){
    response.status(200).send({
        status:false,
        error
    })
}
}

