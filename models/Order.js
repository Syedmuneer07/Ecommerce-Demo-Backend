const mongoose=require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'processing','shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    }
    ,
    paymentMethod: {
        type: String,
        enum: ['Razorpay', 'COD'],
        default: 'cash'
    },

    razorpayPaymentId: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);