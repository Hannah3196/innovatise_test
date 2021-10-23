import { toast } from 'react-toastify';

export const showSuccess = message => {
  toast.success(message);
};

export const showError = error => {
  toast.error(error);
};

export const showWarning = warning => {
  toast.warn(warning);
};

export const showInfo = info => {
  toast.info(info);
};
