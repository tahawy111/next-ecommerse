export const getCookies = (cookie: string) => {
  if (!cookie) return {};

  const cookieArr = cookie.split(" ");

  let cookieObj: any = {};
  for (let i = 0; i < cookieArr.length; i++) {
    const keyValue: string[] = cookieArr[i].split("=");
    cookieObj[keyValue[0]] = keyValue[1].replace(";", "");
  }

  return cookieObj;
};
