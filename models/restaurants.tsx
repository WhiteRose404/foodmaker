import { Schema, model, models } from 'mongoose'

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    brandColor: String,
    logo: String,
    categories: [{
      name: { type: String, required: true },
      description: String,
      order: { type: Number, default: 0 },
      items: [{
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        order: { type: Number, default: 0 } // For sorting items within category
      }],
      active: { type: Boolean, default: true }
    }],
    tables: [{
      tableNumber: { type: String, required: true },
      qrCode: String,
      isOccupied: { type: Boolean, default: false }
    }],
    active: { type: Boolean, default: true }
}, { timestamps: true })
  
const Restaurant = models.Restaurant || model('Restaurant', RestaurantSchema)
export default Restaurant