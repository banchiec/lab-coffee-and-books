const router = require("express").Router();
const Place = require('../models/place.model')

/* GET home page */
router.get("/", (req, res, next) => {
    Place
        .find()
        .then(place => {
            res.render('place/place', { place });
        })
        .catch(err => console.log(err))
});

// Crear
router.get("/crea", (req, res, next) => {

    res.render("place/place-create");

});

router.post("/crea", (req, res, next) => {
    // console.log(req.body)
    const { name, type, latitud, longitud } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitud, longitud]
    }

    Place
        .create({ name, type, location })
        .then((place) => {
            console.log(place)
            res.redirect("/lugares");
        })
        .catch(err => console.log(err))
});


// Editar
router.get('/editar/:id', (req, res) => {

    console.log(req.params)
    const { id } = req.params

    Place
        .findById(id)
        .then(place => {
            console.log(place)
            res.render('place/place-edit', place)
        })
        .catch(err => console.log(err))
})

router.post('/editar/:id', (req, res) => {

    const { id } = req.params
    const { name, type, coordinates } = req.body

    const location = {
        type: 'Point',
        coordinates: [coordinates[0], coordinates[1]]
    }

    Place
        .findByIdAndUpdate(id, { name, type, location }, { new: true })
        .then(theBook => res.redirect(`/lugares`))
        .catch(err => console.log(err))
})

router.get('/eliminar/:id', (req, res) => {
    const { id } = req.params
    console.log("El id es : " + id)
    Place
        .findOneAndDelete(id)
        .then((place) => {
            console.log(place)
            res.redirect('/lugares')
        })
        .catch(error => console.error(error))
})

module.exports = router;
