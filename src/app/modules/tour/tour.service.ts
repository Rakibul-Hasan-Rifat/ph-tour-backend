import { Query } from "mongoose";
import AppError from "../../errors/app.error";
import { searchableFields } from "./tour.constant";
import ITour, { ITourType } from "./tour.interface";
import Tour, { TourType } from "./tour.model";

const createTourService = async (payload: ITour) => {
  const isTourAvailable = await Tour.findOne({ title: payload.title });
  if (isTourAvailable) {
    throw new AppError(409, "The tour is already existed");
  }

  const tour = await Tour.create(payload);

  return tour;
};

class QueryBuilder<T> {

  public modelQuery;
  public readonly query;
  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

filter() {
  console.log(this.query);
  
}

}

const getTourService = async (query: Record<string, string>) => {
  const {
    search = "",
    sort = "-createdAt",
    fields = "",
    page = 1,
    limit = 10,
    ...filter
  } = query;

  const searchQuery = {
    $or: searchableFields.map((field) => ({
      [field]: { $regex: search, $option: "i" },
    })),
  };

  const tours = await Tour.find(filter)
    .find(searchQuery)
    .sort(sort)
    .select(fields.split(",").join(" "))
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const totalTours = await Tour.countDocuments();

  const meta = {
    page,
    limit,
    total: totalTours,
    totalPages: totalTours / Number(limit),
  };

  return {
    data: tours,
    meta: {
      total: totalTours,
    },
  };
};

const updateTourService = async (tourId: string, payload: Partial<ITour>) => {
  const isTourAvailable = await Tour.findById(tourId);
  if (!isTourAvailable) {
    throw new AppError(404, "The tour is no more in database");
  }

  const updatedTour = await Tour.findByIdAndUpdate(tourId, payload);
  return updatedTour;
};

const deleteTourService = async (tourId: string) => {
  await Tour.findByIdAndDelete(tourId);
  return null;
};

const createTourTypeService = async (payload: Partial<ITourType>) => {
  const isTourTypeAvailable = await Tour.findOne({ title: payload.name });
  if (isTourTypeAvailable) {
    throw new AppError(409, "The tour is already existed");
  }

  const tourType = await TourType.create(payload);

  return tourType;
};

const getTourTypeService = async () => {
  const tourTypes = await TourType.find({});
  const totalTourTypes = await TourType.countDocuments();

  return {
    data: tourTypes,
    meta: {
      total: totalTourTypes,
    },
  };
};

const updateTourTypeService = async (
  tourTypeId: string,
  payload: Partial<ITourType>
) => {
  const isTourAvailable = await Tour.findById(tourTypeId);
  if (!isTourAvailable) {
    throw new AppError(404, "The tour is no more in database");
  }
  const updatedTourType = await Tour.findByIdAndUpdate(tourTypeId, payload);
  return updatedTourType;
};

const deleteTourTypeService = async (tourTypeId: string) => {
  await TourType.findByIdAndDelete(tourTypeId);
  return null;
};

const tourServices = {
  // tour services
  createTourService,
  getTourService,
  updateTourService,
  deleteTourService,

  // tour-type services
  createTourTypeService,
  getTourTypeService,
  updateTourTypeService,
  deleteTourTypeService,
};

export default tourServices;
