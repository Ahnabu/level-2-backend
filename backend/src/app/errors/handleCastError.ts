import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleCastError = (error:mongoose.Error.CastError): TGenericErrorResponse => {
    const errorSources: TErrorSource = [{
      path: error?.path,
      message: error?.message,
    }]
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorSources
        }
  };


export default handleCastError;
