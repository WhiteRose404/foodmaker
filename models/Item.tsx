import { Schema, model, models } from 'mongoose'

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    isCombo: { type: Boolean, default: false },
    comboItems: [{
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 },
      isOptional: { type: Boolean, default: false }
    }],
    customization: [{
      name: String,
      options: [{
        name: String,
        priceAdd: { type: Number, default: 0 }
      }]
    }],
    available: { type: Boolean, default: true }
}, { timestamps: true })

const Item = models.Item || model('Item', ItemSchema)
export default Item