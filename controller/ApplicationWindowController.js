const catchAsyncError = require("../middleware/catchAsyncError");
const { ApplicationWindow } = require("../services");
const ErrorHandler = require("../utils/ErrorHandler");
const {
  validateApplicationWindow
} = require("../validation/ApplicationWindowValidation");

/**
 * @description open a new application window
 * @route PUT /v1/admin/application-window
 */

exports.setApplicationWindow = catchAsyncError(async (req, res, next) => {
  // First things first, set all previous "upcoming" statuses to "expired"
  await ApplicationWindow.expireAll();

  const validatedData = await validateApplicationWindow(req.body);
  if (validatedData.error) {
    throw new ErrorHandler(validatedData.error, 400);
  }

  await ApplicationWindow.create(validatedData.value);

  return res.status(201).json({
    success: true,
    message: "Application window has been set"
  });
});

/**
 * @description An admin manually ends an application window
 * @route PUT v1/admin/close-application-window
 */
exports.manuallyCloseApplicationWindow = catchAsyncError(
  async (req, res, next) => {
    await ApplicationWindow.manuallyClose();

    return res.status(201).json({
      success: true,
      message: "Application window has been manually closed by an admin"
    });
  }
);
