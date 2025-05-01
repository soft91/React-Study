import { useAlertStore } from "@/store/alertStore";

export const useAlert = () => {
	const { openAlert, closeAlert, isOpen, options } = useAlertStore();

	return {
		isOpen,
		options,
		openAlert,
		closeAlert,
	};
};
