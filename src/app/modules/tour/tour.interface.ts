import { Types } from "mongoose";

export interface ITourType {
    name: string;
}

interface ITour {
    title: string;
    slug: string;
    images?: string[];
    description?: string;
    location?: string;
    costForm?: number;
    startDate?: Date;
    endDate?: Date;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    tourPlan?: string[];
    maxGuests?: number;
    minAge?: number;
    division: Types.ObjectId;
    tourType: Types.ObjectId;
}

export default ITour;
