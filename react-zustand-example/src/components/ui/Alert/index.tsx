import { useAlertStore } from "@/store/alertStore";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "./alert-dialog";

export function Alert() {
	const { isOpen, options, closeAlert } = useAlertStore();

	return (
		<AlertDialog open={isOpen} onOpenChange={closeAlert}>
			{options && (
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
						<AlertDialogAction onClick={options.onConfirm}>
							{options.confirmText || "확인"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			)}
		</AlertDialog>
	);
}
