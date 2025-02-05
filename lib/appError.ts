const extractDuplicateErrorDetails = (error: string): [string, string] => {
  // Regular expression to match the email in the parentheses
  const regex = /\(([^)]+)\)=\(([^)]+)\)/;
  const match = error.match(regex);
  let type = "Error";
  let message = "Something went wrong!";
  if (match) {
    // Extract the field and value (email)
    type = match[1]; // This will be 'email' in the error message
    message = `${match[2]} already exists, Please use another one`; // Formatted messag
  }

  return [type, message];
};

const extractOutOfRangeErrorDetails = (message: string): string => {
  const regex = /"([^"]+)"/; // Regular expression to capture text inside quotes
  let value = "Something went wrong!";
  const match = message.match(regex);
  if (match) {
    value = match[1];
  }
  return value + " is out of range, Please use valid number!";
};

export const appError = (
  error: any,
  defaultMessage: string
): { type: string; message: string } => {
  let message = defaultMessage;
  let type = "Error";
  if (error.code === "23505") {
    [type, message] = extractDuplicateErrorDetails(error.detail);
  }

  if (error.code === "22003") {
    type = "universityId";
    message = extractOutOfRangeErrorDetails(error.message);
  }

  return { type, message };
};
