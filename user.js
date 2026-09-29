const express = require('express');
const User = require('../models/user');

const router = new express.Router();
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.get('/users',  (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((e) => {
        res.status(500).send(e);
    })
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send("User not found");
        } 
        res.status(200).send(user);
    }).catch((e) => {
        res.status(500).send(e);
    })
})
router.patch('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndUpdate(_id, req.body,
            { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})
module.exports = router; 