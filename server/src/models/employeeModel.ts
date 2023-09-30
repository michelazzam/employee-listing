import mongoose, { Schema, Document } from "mongoose";

interface IEmployee extends Document {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  country: string;
  profilePicture: string;
}

const employeeSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: Date,
    country: String,
    profilePicture: String,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
export default Employee;
