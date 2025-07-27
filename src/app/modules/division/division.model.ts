import { model, Schema } from "mongoose";
import IDivision from "./division.interface";

const divisionSchema = new Schema<IDivision>({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    thumbnail: String,
    description: String
}, {
    timestamps: true,
    versionKey: false
})

const Division = model<IDivision>("Division", divisionSchema);

export default Division;