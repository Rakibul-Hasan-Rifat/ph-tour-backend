import httpStatusCodes from 'http-status-codes';
import AppError from "../../errors/app.error";
import IDivision from "./division.interface";
import Division from "./division.model";

const createDivisionService = async (payload: IDivision) => {

  
  const isDivisionAvailable = await Division.findOne({ name: payload.name });
  
  if (isDivisionAvailable) {
    throw new AppError(409, "The division is already inserted!");
  }
  
  const slug = payload.name.toLowerCase().trim().split(" ").join("-").concat("-division");
  payload.slug = slug;

  console.log(slug);
  

  const division = await Division.create(payload);

  return division;
};

const getDivisionService = async () => {
  const divisions = await Division.find();
  const totalDivisions = await Division.countDocuments();

  return {
    data: divisions,
    meta: {
      total: totalDivisions,
    },
  };
};

const updateDivisionService = async (
  divisionId: string,
  payload: Partial<IDivision>
) => {
  const isDivisionAvailable = await Division.findById(divisionId);

  if (!isDivisionAvailable) {
    throw new AppError(400, "The division is already in database!");
  }

  const isDivisionDuplicate = await Division.findOne({
    name: payload.name,
    _id: { $ne: divisionId },
  });

  if (isDivisionDuplicate) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Failed operation because of duplication on insertion")
  }

  if(payload.name) {
    const slug = payload.name.toLowerCase().trim().split(" ").join("-").concat("-division");
    payload.slug = slug;
  }

  const updateDivision = await Division.findByIdAndUpdate(divisionId, payload, {new: true, runValidators: true})

  return updateDivision;
};

const deleteDivisionService = async (divisionId: string) => {
    await Division.findByIdAndDelete(divisionId);
    return null
}

const divisionServices = {
  createDivisionService,
  getDivisionService,
  updateDivisionService,
  deleteDivisionService
};

export default divisionServices;
