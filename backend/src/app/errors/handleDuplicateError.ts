import { TErrorSource, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError = (err:any): TGenericErrorResponse => { 
    //extract value within double quotes
    if (err?.code === 11000) {
        const match = err?.message?.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
        const extractedMessage = match ? match[0] : "Duplicate key error";
        const errorSource: TErrorSource = [{
            path:'',
            message:extractedMessage
        }]
        return {
            statusCode: 400,
            message: `Duplicate value: ${extractedMessage}`,
            errorSources: errorSource
        };
    }
    return {
        statusCode: 500,
        message: "An unknown error occurred",
        errorSources: []
    };
}


export default handleDuplicateError;