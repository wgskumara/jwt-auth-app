import Customer from '../model/CustomerModel.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    try {
        const existingCustomer = await Customer.findOne({ email: req.body.email });
        if (existingCustomer) {
            return res.status(409).json({
                status: false,
                message: "Email already exists",
                data: undefined
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const customer = new Customer({ ...req.body, password: hashedPassword });
        const savedCustomer = await customer.save();

        return res.status(201).json({
            status: true,
            message: "Customer created successfully",
            data: savedCustomer
        });
    } catch (err) {
        console.error('Error creating customer:', err);
        return res.status(500).json({
            status: false,
            message: err.message,
            data: undefined
        });
    }
};

export { register };
