import { create } from "zustand";

type AlertOptions = {
	title: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
};

type AlertState = {
	isOpen: boolean;
	options: AlertOptions | null;
	openAlert: (options: AlertOptions) => void;
	closeAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
	isOpen: false,
	options: null,
	openAlert: (options) => set({ isOpen: true, options }),
	closeAlert: () => set({ isOpen: false, options: null }),
}));
