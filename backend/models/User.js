const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    cpf: {type:Number, required:true, unique:true, length:11},
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, enum: ["Manager","Landlord","Tenant",'Employer'], default:"landlord"},
}, {timestamps: true});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()

        const salt =  await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
})

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});


userSchema.methods.matchPassword =  async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("Users", userSchema);

