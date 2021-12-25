const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema ({
    flightNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            message: "Characters and Digits Only",
            validator: (input) => {
                pattern = /^[a-z0-9]*$/i
                return pattern.test(input)
            }
        }
    },
    departureDate: {
        type : String, 
        required: true,
    },
    arrivalDate: {
        type : String,
        required: true,
    //    validate: [dateValidator,'Arrival Date must be greater than or equal Departure Date']
    },
    departureTime: {
        type : String, 
       required: true,
   },
   arrivalTime: {
       type : String,
       required: true,
   },
    economySeats: {
        type: Number,
        required: true,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    businessSeats: {
        type: Number,
        required: true,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    totalSeats: {
        type: Number,
        required: true,
        default: function() {
            if (this.economySeats && this.businessSeats) {
              return this.economySeats + this.businessSeats;
            }
            return null;
          },
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    from: {
        type: String,
        required: true,
        validate: {
            message: "Characters Only",
            validator: (input) => {
                pattern = /^[a-z]*$/i
                return pattern.test(input)
            }
        }
    },
    to: {
        type: String,
        required: true,
        validate: {
            message: "Characters Only",
            validator: (input) => {
                pattern = /^[a-z]*$/i
                return pattern.test(input)
            }
        }
    },
    price: {
        type: Number,
        required: true,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    baggageAllowance: {
        type: Number,
        required: true,
        default: 2,
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<input
            }
        }
    },
    reservedBusinessSeats: {
        type: Array,
        required: true,
        default: function() {
            if (this.businessSeats) {
                var seats = [];
                for(let i=0; i<this.businessSeats; i++){
                    seats[i] = false;
                }
              return seats;
            }
            return [];
          }
    },
    reservedEconomySeats: {
        type: Array,
        required: true,
        default: function() {
            if (this.economySeats) {
                var seats = [];
                for(let i=0; i<this.economySeats; i++){
                    seats[i] = false;
                }
              return seats;
            }
            return [];
          }
    },
    availableBusinessSeats: {
        type : Number,
        required: true,
        default: function() {
            if (this.businessSeats && this.reservedBusinessSeats) {
                return this.businessSeats - this.reservedBusinessSeats.filter(x => x).length 
            }
          },
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<=input
            }
        }
    },
    availableeconomySeats: {
        type : Number,
        required: true,
        default: function() {
            if (this.economySeats && this.reservedEconomySeats) {
                return this.economySeats - this.reservedEconomySeats.filter(x => x).length 
            }
          },
        validate: {
            message: "Must be a Positive Number",
            validator: (input) => {
                return 0<=input
            }
        }
    }
}, {timestamps:true})

// function that validate the startDate and endDate
function dateValidator(value) {
    if(this.departureDate)
        return Date.parse(this.departureDate) <= Date.parse(value);
    else
        return Date.parse(this._update.$set.departureDate) <= Date.parse(value);
}

const Flight = mongoose.model('Flight',flightSchema);
module.exports = Flight;    
