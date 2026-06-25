let toastCallback = null;

export const registerToastCallback = (cb) => {
  toastCallback = cb;
};

export const showToast = (message, type = "success") => {
  if (toastCallback) {
    toastCallback(message, type);
  } else {
    console.log(`[Toast ${type}] ${message}`);
  }
};
