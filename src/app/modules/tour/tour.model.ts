import { model, Schema } from "mongoose";
import ITour, { ITourType } from "./tour.interface";

const tourTypeSchema = new Schema<ITourType>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    images: { type: [String], default: [] },
    description: { type: String },
    location: { type: String },
    costForm: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuests: { type: Number },
    minAge: { type: String },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    tourType: { type: Schema.Types.ObjectId, ref: "TourType", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

tourSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const slug = this.title
      .toLowerCase()
      .trim()
      .split(" ")
      .join("-")
      .concat("-tour");
    this.slug = slug;
  }
  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const tour = this.getUpdate() as Partial<ITour>;

  if (tour.title) {
    const slug = tour.title
      .toLowerCase()
      .trim()
      .split(" ")
      .join("-")
      .concat("-tour");
    tour.slug = slug;
  }

  this.setUpdate(tour);

  next();
});

const Tour = model<ITour>("Tour", tourSchema);

export default Tour;
