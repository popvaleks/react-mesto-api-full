const mongoose = require('mongoose');
const { Types } = require('mongoose');
const { linkRegExp } = require('../helpers/regExp');

const cardSchema = new mongoose.Schema({
  "likes": {
    type: [{
      type: Types.ObjectId,
    }],
    required: true,
    default: []
  },
  "name": {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  "link": {
    type: String,
    required: true,
    validate: {
      validator: v => {
        //return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        return new RegExp(linkRegExp).test(v);
      },
      message: 'Не корректная ссылка'
    }
  },
  "owner": {
    type: Types.ObjectId,
    required: true
  },
  "createdAt": {
    type: Date,
    default: Date.now
  }
})

const cardModel = mongoose.model('card', cardSchema);

module.exports = cardModel;