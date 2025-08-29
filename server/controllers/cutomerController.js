const router = require("express").Router();
const asynHandler = require("express-async-handler");
const {
    CustomerModel,
    validationNewUser,
    validationUpdateUser
} = require("../models/CustomerModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 * @desc get all customers
 * @route /api/customer
 * @method Get
 * @access private (only admin) 
*/

const getAllCustomersCtrl = asynHandler(
    async (req, res) => {
        // 1. get all customers
        const customers = await CustomerModel.find();
        res.status(200).json(customers);
    }
);

/*===========================================*/

/**
 * @desc add new customer
 * @route /api/customer
 * @method Post
 * @access private (only admin) 
*/

const newCustomerCtrl = asynHandler(
    async (req, res) => {
        // 1. validation
        const { error } = validationNewUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. check if the user already exists with same name and email
        let customer = await CustomerModel.findOne({ name: req.body.name, email: req.body.email });

        // 3. show error msg
        if (customer) {
            return res.status(404).json({ message: "email or name already exist" })
        }

        // 4. create new customer
        customer = await CustomerModel.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });

        // 5. send response to client
        res.status(201).json({ message: "Create New Customer Successfully,please Go Back !" });
    }
);

/*===========================================*/

/**
 * @desc get customer
 * @route /api/customer/:id
 * @method Get
 * @access private (only admin) 
*/
const getCustomerCtrl = asynHandler(
    async (req, res) => {
        // 1.check if the customer exist with his id
        const customer = await CustomerModel.findById(req.params.id);
        // 2. if no customer exsits with id ,show error msg
        if (!customer) {
            return res.status(404).json({ message: "customer not found" });
        }
        res.status(200).json(customer);
    }
);

/*===========================================*/

/**
 * @desc update customer 
 * @route /api/customer/:id
 * @method Put
 * @access private (only admin) 
*/
const updateCustomerCtrl = asynHandler(
    async (req, res) => {
        // 1. validation
        const { error } = validationUpdateUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // 2. find the customer and update
        const customer = await CustomerModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age
                },
            },
            { new: true }
        );
        res.status(200).json({ message: "Customer Updated Successfully,please Go Back !" });
    }
);

/*===========================================*/

/**
 * @desc delete customer 
 * @route /api/customer/:id
 * @method Delete
 * @access private (only admin) 
*/
const deleteCustomerCtrl = asynHandler(
    async (req, res) => {
        // 1. check if the customer exists with id
        const customer = await CustomerModel.findById(req.params.id);

        // 2. if customer exists delete ,ohterwise show not found msg
        if (customer) {
            await CustomerModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "customer has been deleted" });
        } else {
            res.status(404).json({ message: "customer not found" });
        }
    }
);

/*===========================================*/

/**
 *@desc get count customer
 *@route /api/customer/count
 *@method Get
 *@access private (only admin) 
*/

const countCustomersCtrl = asynHandler(
    async (req, res) => {
        // 1. get count of customers
        const count = await CustomerModel.countDocuments();
        res.status(200).json(count);
    }
);

module.exports = {
    getAllCustomersCtrl,
    newCustomerCtrl,
    getCustomerCtrl,
    updateCustomerCtrl,
    deleteCustomerCtrl,
    countCustomersCtrl
}