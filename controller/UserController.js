const UserSchema = require('../model/User');

const signJswtToken = require('../config/jwt');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email, !password) {
            return res.status(301).send({ message: "Entere all fields" });
        }
        const existinguser = await UserSchema.findOne({ email: email });

        if (!existinguser) {
            return res.status(409).send({ message: "user does not exists" });
        }
        if (password != existinguser.password) {
            return res.status(404).send({ message: "Email or password incorrect" });
        }
        //   return res.status(200).send({message:"User logged in " , existinguser});
        let user = existinguser.toJSON();

        let token = signJswtToken(user);
        return res.status(200).send({ message: "User logged in ", token: token });

    } catch (err) {
        return res.status(500).send({ err: err });
    }

}

exports.register = async (req, res) => {

    const { fullName, dateOfBirth, mobile, sequrityQuestion, address, city, state, zipCode, country, email, password, confirmPassword } = req.body;


    if (!fullName || !dateOfBirth || !mobile || !sequrityQuestion || !address || !city || !state || !zipCode || !country || !email || !password || !confirmPassword) {
        return res.status(300).send({ message: "please enter all fields" });
    }
    try {
        const existinguser = await UserSchema.findOne({ email: email });
        console.log(existinguser)
        if (existinguser) {
            return res.status(409).send({ message: "user already exists" });
        }
        const newUser = await UserSchema.create({ fullName, dateOfBirth, mobile, sequrityQuestion, address, city, state, zipCode, country, email, password, confirmPassword });
        console.log(newUser)
        return res.status(200).send({ user: newUser, message: "user created" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ error: err });
    }

}

exports.getDetails = async (req, res) => {


    console.log(req)
    try{
        if (req.user) {
            return res.status(200).send({ user: req.user });
        }
        console.log(req.user)
         return res.status(400).send({message:"user not verified"});
        
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:err});
    }
}