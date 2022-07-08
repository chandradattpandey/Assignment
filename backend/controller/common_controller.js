const dealerSchema = require("../model/dealerSchema");
const carSchema = require("../model/carSchema");


function addDealer(req, res) {
    let dealer = new dealerSchema({
        dealer_name: req.body.dealer_name,
        totalBudget: req.body.totalBudget,
        remaining: req.body.remaining,
        location: {
            longitude: req.body.longitude,
            latitude: req.body.latitude
        },
        owner: {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
    })

    dealer.save().then(result => {
        res.status(200).json({ messege: "user registerd", result })
    }).catch(err => {
        res.status(400).json({ error: "user not register" })
    });
};



function addCar(req, res) {
    let car = new carSchema({
        dealerId: req.body.dealerId,
        name: req.body.name,
        brand: req.body.brand,
        modal: req.body.modal,
        color: req.body.color,
        price: req.body.price
    })
    car.save().then(result => {
        res.status(200).json({ messege: "car add successfully" });
        console.log(result);
    }).catch(err => {
        res.status(400).json({ error: "car not added" });
    });
};


function readCar(req, res) {
    let brand = req.params.brand;
    carSchema.find({ 'brand': brand }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json({ error: "car not found" })
    });
};

function readDealer(req, res) {
    dealerSchema.find({}).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json({ error: "dealer not found" })
    });
};

function carFindById(req, res) {
    let id = req.params.id;
    carSchema.findById({ '_id': id }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}

function dealerFindById(req, res) {
    let id = req.params.id;
    dealerSchema.findById({ '_id': id }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}


function editDealer(req, res) {
    let id = req.params.id;
    let dealer_name = req.body.dealer_name;
    let totalBudget = req.body.totalBudget;
    let remaining = req.body.remaining;

    dealerSchema.findByIdAndUpdate({ '_id': id }, {
        $set: {
            'dealer_name': dealer_name,
            'totalBudget': totalBudget,
            'remaining': remaining,
        }
    },
        { new: true }).then(result => {
            res.status(200).json({ message: "update successfully", result })
        }).catch(err => {
            res.status(400).json({ error: "user not found" })
        });
}



function editCar(req, res) {
    let id = req.params.id;
    let name = req.body.name;
    let modal = req.body.modal;
    let color = req.body.color;
    let price = req.body.price;
    carSchema.findByIdAndUpdate({ '_id': id }, {
        $set: { 'name': name, 'modal': modal, 'color': color, 'price': price }
    },
        { new: true }).then(result => {
            res.status(200).json({ message: "user update successfully", result })
        }).catch(err => {
            res.status(400).json({ error: "user not found" })
        });
}


function deleteCar(req, res) {
    let id = req.params.id;
    carSchema.findByIdAndRemove({ "_id": id }).then((result) => {
        res.status(200).json({ message: "car delete succeccfully", result });
        console.log(result);
    }).catch(err => {
        res.status(400).json({ error: "car not found" });
    });
};

function deleteDealer(req, res) {
    let id = req.params.id;
    dealerSchema.findByIdAndRemove({ "_id": id }).then((result) => {
        res.status(200).json({ message: "dealer delete succeccfully", result });
        console.log(result);
    }).catch(err => {
        res.status(400).json({ error: "dealer not found" });
    });
};

function getData(req, res) {
    carSchema.aggregate([
        {
            $lookup: {
                from: 'dealers',
                localField: 'dealerId',
                foreignField: '_id',
                as: 'dealership',
            },
        },
        {
            $unwind: "$dealership",
        },
        {
            $project: {
                dealer_name: "$dealership.dealer_name",
                totalBudget: "$dealership.totalBudget",
                price: 1,
                name: 1
            }
        }]).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(400).json({ error: "data not found" })
        });
}

function ppltData(req, res) {
    carSchema.find({}).populate({
        path: 'dealerId',
        select: ['dealer_name', 'totalBudget']
    }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}



function dealerSearchApi(req, res) {
    let key = req.params.key;
    dealerSchema.find({ dealer_name: { $regex: key } }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(400).json(err);
    });
}

function carSearchApi(req, res) {
    let key = req.params.key;
    carSchema.find({ name: { $regex: key } }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(400).json(err);
    });
}

module.exports = {
    addDealer, addCar, readCar, readDealer, deleteCar, deleteDealer,editCar, getData,
    editDealer, carFindById, dealerFindById, dealerSearchApi, carSearchApi, ppltData
}