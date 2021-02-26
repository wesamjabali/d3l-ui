import store from "../store";

const snack = {
  success: (message = "Success!") => {
    store.commit("snack", { message: message, type: "success" });
  },
  error: (message = "Error!") => {
    store.commit("snack", { message: message, type: "error" });
  },
  info: (message = "Info.") => {
    store.commit("snack", { message: message, type: "grey darken-4" });
  },
};

export default snack;
