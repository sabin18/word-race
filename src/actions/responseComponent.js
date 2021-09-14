import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const ErrorResponse = (Error) => {
  if (Error === 'Your subscription has ended,Please contact service provider to renew your subscription') {
    toast.error(Error, { autoClose: 8000 });
    window.location.replace('/pharmacy');
  } else {
    toast.error(
      Array.isArray(Error)
        ? Error[0] : Error, { autoClose: 8000 },
    );
  }
};

const SuccessResponse = (response) => {
  toast.success(response.message);
};

export default { ErrorResponse, SuccessResponse };
