import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="flex items-center justify-center h-screen bg-gray-100">
						<div className="text-center p-8 bg-white rounded-lg shadow-lg">
							<h1 className="text-2xl font-bold text-red-600 mb-4">
								오류가 발생했습니다
							</h1>
							<p className="text-gray-600 mb-4">
								애플리케이션에서 예상치 못한 오류가 발생했습니다.
							</p>
							<button
								onClick={() => window.location.reload()}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
							>
								페이지 새로고침
							</button>
						</div>
					</div>
				)
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
