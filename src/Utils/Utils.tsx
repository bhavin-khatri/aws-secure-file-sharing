import { Logger } from '../Components/Logger/Logger'

export const isEmpty = (inputString: any) => {
  return inputString.length == 0
}

export const setDeveloperData = (data: any) => {
  sessionStorage.setItem('DEV_DATA', JSON.stringify(data))
}
export const getDeveloperData = () => {
  return sessionStorage.getItem('DEV_DATA')
}

export const getDeveloperFirebase = () => {
  let developerInfo: any = getDeveloperData()
  developerInfo = JSON.parse(developerInfo)
  return developerInfo[0]
}

export const isMobileDevice = () => {
  const userAgent = navigator.userAgent
  const mobileDeviceRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return mobileDeviceRegex.test(userAgent)
}

export const getFormattedText = (inputString: string, length: number) => {
  if (inputString.length > length) {
    return inputString.substring(0, length) + '...'
  } else {
    return inputString
  }
}

export const countTotalExperience = (startDate:any,endDate:any) => {
  Logger("StartDate======>",startDate)
  Logger("endDate======>",endDate)
  let end = endDate === 'Present' ? new Date() : new Date(endDate);
  let start = new Date(startDate)
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - (start.getMonth() - 1))
  let years = months / 12;
  const wholeYears = Math.floor(years);
  const decimalPart = years - wholeYears;
  let output = '';
  if (decimalPart >= 0.1 && decimalPart < 0.5) {
    output = `${wholeYears}+ years`;
  } else if (decimalPart === 0.5) {
    output = `${wholeYears}.5+ years`;
  } else if (decimalPart > 0.5) {
    output = `${wholeYears + 0.5}+ years`;
  } else {
    output = `${wholeYears}+ years`;
  }
  return output;
};

export const countExperience=(startDate:any,endDate:any)=>{
  let result = '';
  let end = endDate === 'Present' ? new Date() : new Date(endDate);
  let start = new Date(startDate);
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - (start.getMonth() - 1));
  let years = Math.floor(months / 12);
  months = months % 12;
  if (years > 0) {
    result += `${years}.${months} ${months > 1 ? 'Years' : 'Year'}`;
  }else if (months > 0) {
    result += `${months} ${months > 1 ? 'Months' : 'Month'}`;
  }else {
    result = '0 Months';
  }
  return result
}

export const sortExperience=(experiences:Array<any>)=>{
  return experiences.sort((a, b) => {
    if (a.endDate === "Present") return -1; // Place "Present" first
    if (b.endDate === "Present") return 1;  // Place "Present" first
    const dateA :any= new Date(a.endDate);
    const dateB:any = new Date(b.endDate);
    if (isNaN(dateA) || isNaN(dateB)) {
      throw new Error("Invalid endDate format. Please check the dates.");
    }
    return dateB - dateA;
  });
}

