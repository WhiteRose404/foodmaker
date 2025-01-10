import { Schema, model, models } from 'mongoose';

const SizeSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const AddonSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
}, { _id: false });


const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    sizes: {
      type: [SizeSchema],
      default: []
    },
    addons: {
      type: [AddonSchema],
      default: []
    },
    available: { type: Boolean, default: true }
}, { timestamps: true })

// Create indexes for common queries
// ItemSchema.index({ name: 1 });
// ItemSchema.index({ price: 1 });

// Add validation for price
ItemSchema.path('price').validate(function(price) {
  return price >= 0;
}, 'Price must be a non-negative number');

const Item = models.Item || model('Item', ItemSchema);

export default Item;