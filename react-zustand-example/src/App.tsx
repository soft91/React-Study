import { TodoContainer } from "./components/TodoContainer";
import { Toaster } from "@/components/ui/sonner";
import { useAlertStore } from "@/store/alertStore";
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

import "./App.css";

function App() {
	const { isOpen, options, closeAlert } = useAlertStore();

	return (
		<div className="container mx-auto">
			<TodoContainer />
			<Toaster />
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
		</div>
	);
}

export default App;
