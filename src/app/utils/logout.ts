import Cookies from "js-cookie";

export const logoutClean = () => {
  Cookies.remove("token");
  Cookies.remove("role");
  window.location.href = "/login";
};
