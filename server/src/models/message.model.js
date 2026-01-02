import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    expiresAt: {
        type: Date,
        required: true
    }

},
{ timestamps: true });

messageSchema.pre("validate", async function() {
    const textEmpty = !this.text || !this.text.trim();
    const imageEmpty = !this.image || !this.image.trim();
  
    if (textEmpty && imageEmpty) {
      this.invalidate("text", "Either text or image must be provided!");
    }
});

messageSchema.index({expiresAt: 1}, {expireAfterSeconds: 0})

const Message = mongoose.model("Message", messageSchema);
export default Message;