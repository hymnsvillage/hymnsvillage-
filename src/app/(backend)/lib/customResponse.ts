export const customResponse = ({
  message,
  statusCode = 200,
  data,
}: {
  message?: string;
  statusCode?: number;
  data?: Record<string, unknown>;
}) => {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  return {
    ...(isSuccess ? { message } : { error: message }),
    statusCode,
    success: isSuccess,
    status: isSuccess ? "success" : "failed",
    data,
  };
};
