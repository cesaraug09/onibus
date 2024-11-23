const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Onibus = new Schema({
    assentos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios",
      default: null
    }
  ]
})

Onibus.pre("save", function (next) {
  if (this.assentos.length !== 44) {
    while (this.assentos.length < 44) {
      this.assentos.push(null);
    }
  }
  next();
});

mongoose.model("onibus", Onibus)