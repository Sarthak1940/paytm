const mongoose = require("mongoose");
const Account = require("../models/account.models");

const getBalance = async (req, res) => {
    const account = await Account.findOne({owner: req.userId});
    
    
    if (!account) {
       return res.status(404).json({message: "account not found"})
    }
    return res.status(200).json({balance: account.balance});
}

const transferMoney = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    const account = await Account.findOne({owner: req.userId}).session(session);

    if (account.balance < amount) {
        await session.abortTransaction();
        return res.status(401).json({message: "insufficient balance"})
    }

    const toAccount = await Account.findOne({owner: to}).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(404).json({message: "account not found"})
    }

    account.balance -= amount;
    toAccount.balance += amount;

    await account.save();
    await toAccount.save();

    await session.commitTransaction();
    return res.status(200).json({message: "transaction successful"});
}

module.exports = {
    getBalance,
    transferMoney,
}