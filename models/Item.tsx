import { Schema, model, models } from 'mongoose'

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    modifiers: [{
      name: String,
      type: { 
        type: String, 
        enum: ['SINGLE', 'MULTIPLE'], // SINGLE for radio buttons, MULTIPLE for checkboxes
        default: 'SINGLE'
      },
      required: { type: Boolean, default: false },
      options: [{
        name: String,
        priceAdd: { type: Number, default: 0 }
      }]
    }],
    available: { type: Boolean, default: true }
}, { timestamps: true })

const Item = models.Item || model('Item', ItemSchema)
export default Item