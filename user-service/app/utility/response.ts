export const formatResponse = (
  statusCode: number,
  message: string,
  data: unknown
) => {
  const result = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: {},
  };
  if (data) {
    result.body = JSON.stringify({
      message,
      data,
    });
  } else {
    result.body = JSON.stringify({
      message,
    });
  }

  return result;
};
export const SuccessResponse = (data: object) => {
  return formatResponse(200, "success", data);
};
export const ErrorResponse = (code = 1000, error: unknown) => {
  if (Array.isArray(error)) {
    const errorObject = error[0].constraints;

    const errorMessage =
      errorObject[Object.keys(errorObject)[0]] || "Error Occurred";

    return formatResponse(code, errorMessage, errorMessage);
  }
  return formatResponse(code, `${error}`, []);
};
