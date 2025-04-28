import { useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";

type UseAlertOptions = {
	title: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
};

export const useAlert = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<UseAlertOptions | null>(null);

	const openAlert = (opts: UseAlertOptions) => {
		setOptions(opts);
		setIsOpen(true);
	};

	const Alert = () =>
		options ? (
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{options.title}</AlertDialogTitle>
						{options.description && (
							<AlertDialogDescription>
								{options.description}
							</AlertDialogDescription>
						)}
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							{options.cancelText || "취소"}
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								options.onConfirm();
								setIsOpen(false);
							}}
						>
							{options.confirmText || "확인"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		) : null;

	return { openAlert, Alert };
};
