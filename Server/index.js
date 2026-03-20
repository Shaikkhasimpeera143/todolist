const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const TodoModel = require('./models/Todo');
const UserModel = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.log(err));


// ================== AUTH ROUTES ==================

// ✅ Signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            email,
            password: hashedPassword
        });

        res.json(user);
    } catch (err) {
        res.json(err);
    }
});

// ✅ Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) return res.json("User not found");

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.json({ message: "Success", userId: user._id });
        } else {
            res.json("Wrong password");
        }
    } catch (err) {
        res.json(err);
    }
});


// ================== TODO ROUTES ==================

// ✅ Get todos by user
app.get('/get/:userId', (req, res) => {
    const { userId } = req.params;

    TodoModel.find({ userId })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// ✅ Add todo
app.post('/add', (req, res) => {
    const { task, userId } = req.body;

    TodoModel.create({
        task,
        userId
    })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// ✅ Toggle complete
app.put('/update/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findById(id)
        .then(todo => {
            todo.done = !todo.done;
            return todo.save();
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// ✅ Delete todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


// ================== SERVER ==================

const PORT = process.env.PORT || 3001;
// Google Login Route
app.post('/google-login', async (req, res) => {
    const { email, googleId, name } = req.body
    try {
        let user = await UserModel.findOne({ email })
        if (!user) {
            user = await UserModel.create({
                email,
                password: googleId,
                name
            })
        }
        res.json({ userId: user._id })
    } catch (err) {
        res.json(err)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});