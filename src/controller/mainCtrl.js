const mainCtrl = {
    home: async (req, res) => {
        const locals = {
            title: "Node.js Task App",
            description: "Free NodeJS Task App",
        }
        res.render('index', {locals, layout: "../views/layouts/front-page"})
    },
    about: async (req, res) => {
        const locals = {
            title: "About Node.js Task App",
            description: "Free NodeJS Task App",
        }
        res.render('about', {locals})
    }
}

module.exports = mainCtrl;