const zod = require("zod");
const  User  = require("../models/user.models");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const Account = require("../models/account.models");

const signupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})
const signUpHandler =  async (req, res) => {
    const { firstName, lastName, password, username } = req.body;
    
    if (firstName === "" || lastName === "" || password === "" || username === "") {
        return res.status(422).json({ message: "Please fill all the fields" });
    }

    const {success} = signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(403).json({message: "Credentials not accepted"});
    }

    const userExist = await User.findOne({username});
    if (userExist) {
        return res.status(422).json({ message: "User already exists" });
    }

    const newUser = await User.create({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
    });

    if (!newUser) {
        return res.status(500).json({message: "Failed to create user"})
    }

    const account = await Account.create({
        owner: newUser._id,
        balance: 1 + Math.random() * 10000
    });

    return res.status(200).json({message: "User created successfully", user: newUser, account: account});
    
};

const loginHandler = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(422).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({username});

    if(!user) {
        return res.status(404).json({ message: "User does not exist" });
    }

    if (user.password !== password) {
        return res.status(403).json({ message: "Invalid password" });
    }

    const token = jwt.sign({_id: user._id}, JWT_SECRET);

    return res.status(200).json({token: token, message: "User logged in successfully"});
    
}

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
});

const updateUser = async (req, res) => {
    
    const {success} = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(403).json({message: "Credentials not accepted"});
    }

     const user = await User.findByIdAndUpdate(
        req.userId,
        req.body,
        {new: true} 
    )
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({message: "User updated successfully", user});
}


const getUser = async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        }, {
            lastName: { 
                $regex: filter
            }
        }]
    })

   return res.status(200).json({
    user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        _id: user._id,
    }))
   });

}

module.exports = {signUpHandler, loginHandler, updateUser, getUser};