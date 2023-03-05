export const BASE_URL =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

// export function setCookie({
//   cname,
//   cvalue,
//   path = "/",
//   exdays,
// }: {
//   cname: string;
//   cvalue: string;
//   path?: string;
//   exdays: number;
// }): void {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = `${cname}=${cvalue};${expires};path=${path};`;
// }
