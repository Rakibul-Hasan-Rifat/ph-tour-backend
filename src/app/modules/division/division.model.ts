import { model, Schema } from "mongoose";
import IDivision from "./division.interface";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: String,
    description: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

divisionSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const slug = this.name
      .toLowerCase()
      .trim()
      .split(" ")
      .join("-")
      .concat("-division");
    this.slug = slug;
  }
  next();
});

divisionSchema.pre("findOneAndUpdate", async function (next) {
  const division = this.getUpdate() as Partial<IDivision>;

  if (division.name) {
    const slug = division.name
      .toLowerCase()
      .trim()
      .split(" ")
      .join("-")
      .concat("-division");
    division.slug = slug;
  }

  this.setUpdate(division);

  next();
});

const Division = model<IDivision>("Division", divisionSchema);

export default Division;
