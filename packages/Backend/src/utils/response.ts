import { Response } from "express";

export function APIResponse(
  res: Response,
  data: any = null,
  message = "",
  status = 200,
  extra: Record<string, any> = {}
) {
  return res.status(status).json({
    success: status >= 200 && status < 300,
    data,
    message,
    ...extra,
  });
}
