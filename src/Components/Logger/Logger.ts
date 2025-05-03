import ConfigConstants from "../../Constants/ConfigConstants";
import { LogTypes } from "../../Constants/AppConstants";

export const Logger = (message?: any, value?: any, logType?: string) => {
  let isLoggerEnabled = ConfigConstants.isLoggerDisplay;
  if (isLoggerEnabled) {
    let logString = `${message} ${JSON.stringify(value)}`;
    switch (logType) {
      case LogTypes.error:
        console.error(logString);
        break;
      case LogTypes.warning:
        console.warn(logString);
        break;
      default:
        console.info(logString);
    }
    return logString;
  } else {
    return "";
  }
};
