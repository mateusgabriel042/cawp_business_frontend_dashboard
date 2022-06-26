import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

export async function showNotify(type, message) {
	switch(type){
		case "success":
			toast.success(message);
			break;
		case "info":
			toast.info(message);
			break;
		case "error":
			toast.error(message);
			break;
		default:
			break;
	}
}

export const verifyError = (error) => {
	const dataError = error?.response?.data;
	if(dataError !== null && dataError?.code === 403){
		useHistory.push(`/error-page/${dataError.code}`);
	}
}