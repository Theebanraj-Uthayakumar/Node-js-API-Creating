const express = require('express');
const router = express.Router();
const Cleaning = require('../models/Cleaning');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './uploads/');
    },
    filename: function (req, file, cd) {
        cd(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cd) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cd(null, true);
    } else {
        cd(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//GET ALL THE CLEANING COMPANY DETAILS
router.get('/', async (req, res) => {
    try {
        const cleaning = await Cleaning.find();
        res.json(cleaning);
    } catch (err) {
        res.json({ message: err });
    }
});

//SUBMIT CLEANING COMPANY INFORMATION
router.post('/', upload.single('Image'), async (req, res) => {
    console.log(req.file);
    const cleaning = new Cleaning({
        CName: req.body.CName,
        Location: req.body.Location,
        NOE: req.body.NOE,
        CNumber: req.body.CNumber,
        Since: req.body.Since,
        Image: req.file.path,
        Description: req.body.Description
    });

    try {
        const savedCleaning = await cleaning.save();
        res.json(savedCleaning);
    } catch (err) {
        res.json({ message: err });
    }
});

//SPECIFIC CLEANING COMPANY
router.get('/:cleaningId', async (req, res) => {
    try {
        const cleaning = await Cleaning.findById(req.params.cleaningId);
        res.json(cleaning);
    } catch (err) {
        res.json({ message: err });
    }
});

//DELETE SPECIFIC CLEANING COMPANY
router.delete('/:cleaningId', async (req, res) => {
    try {
        const removeCleaning = await Cleaning.remove({ _id: req.params.cleaningId });
        res.json(removeCleaning);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A CLEANING COMPANY DETAILS
router.patch('/:cleaningId', upload.single('Image'), async (req, res) => {
    try {
        const updateCleaning = await Cleaning.updateOne(
            { _id: req.params.cleaningId },
            {
                $set: {
                    CName: req.body.CName, Location: req.body.Location, NOE: req.body.NOE, CNumber: req.body.CNumber, Since: req.body.Since,
                    Image: req.file.path, Description: req.body.Description
                }
            }
        );
        res.json(updateCleaning);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;