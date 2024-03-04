const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

const Task = require("../model/taskModel")

const dashCtrl = {
    dashboard: async (req, res) => {
        const locals = {
            title: "Dashboard",
            description: "My supper app."
        }

        let perPage = 6;
        let page = (req.query.page * 1) || 1;

        try {
            ////  task
            const tasks = await Task.aggregate([
                {$sort: {updateAt: -1}},
                {$match: {user: new mongoose.Types.ObjectId(req.user.id)}}
            ]).skip(perPage*page - perPage).limit(perPage).exec()

            let count = await Task.find({user: req.user.id})
            count = count.length


            res.render('dashboard/index', {userName: req.user.firstName, locals, tasks, current: page, pages: Math.ceil(count/perPage), layout: "../views/layouts/dashboard"})
        } catch (error) {
            console.log(error);
        }
    },

    ////  get create task app

    addPage: async (req, res) => {
        res.render('dashboard/add', {layout: '../views/layouts/dashboard'})
    },

    /////   Add new Task
    AddTask: async (req, res) =>{
        req.body.user = req.user.id
        try {
            await Task.create(req.body)
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error);
        }
    },

    /////#   view a task
    viewTask: async (req, res) => {
        const {id} = req.params
        try {
            const task = await Task.findById(id)
            if(task) {
                res.render('dashboard/view-task', {taskId: id, task, layout: '../views/layouts/dashboard'})
            } else {
                res.send('Something went wrong!')
            }
        } catch (error) {
            console.log(error);
        }
    },

    ////#  update a Task
    updateTask: async (req, res) => {
        const {id} = req.params
        const {title, body} = req.body
        try {
            await Task.findByIdAndUpdate({_id: id}, {title, body, updatedAt: Date.now()})
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error);
        }
    },


    ////#   Serch task Page get
    searchTask: async(req, res) => {
        try {
            res.render('dashboard/search', {searchResult: "", layout: "../views/layouts/dashboard"})
        } catch (error) {
            console.log(error);
        }
    },
    

    /////#    delete resks
    deleteTask: async (req, res) => {
        const {id} = req.params
        try {
            await Task.findByIdAndDelete(id)
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error); 
        }
    },

    ////#   Serch task Post get
    searchResult: async (req, res) => {
        const {searchTerm} = req.body

        try {
            const key = new RegExp(searchTerm, "i")
            const searchResult = await Task.find({
                $or: [{title: {$regex: key}}, {body: {$regex: key}}]
            })

            res.render('dashboard/search', {searchResult, layout: "../views/layouts/dashboard"})
        } catch (error) {
            console.log(error);
        }
    },

    sendContact: async (req, res) => {
        try {
            res.render('dashboard/adminMessage', { layout: "../views/layouts/dashboard"} )
        } catch (error) {
            console.log(error);
        }
    },

    adminMssage: async (req, res) => {
        const {name, company, email, phone, message} = req.body
    try {
        const config = {
            service: "gmail",
            auth: {
                user: 'xabibullayevsunnat9@gmail.com',
                pass: "thrh tbqb fbgj wgjq"
            }
        }
        let transporter = nodemailer.createTransport(config);

        const output = `
            <h3> Contact Details </h3>
            <ul>
                <li>Name: ${name}</li>
                <li>Company: ${company}</li>
                <li>Email: ${email}</li>
                <li>Phone: ${phone}</li>
                <li>Message: ${message}</li>
            </ul>
        `

        const msg = {
            to: ["xabibullayevsunnat9@gmail.com"],
            from: email,
            subject: "Contact Request via Nodemailer",
            text: "Mail is sent by Sendgrid App",
            html: output,
        }

        transporter.sendMail(msg)
        console.log("hammasi nazoratim ostida");
        res.render('dashboard/status')
    } catch (error) {
        console.log(error);
    }
    }



}

module.exports = dashCtrl