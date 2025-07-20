import React, { memo, lazy, Suspense } from "react";
import { Editor, Element, Frame } from "@craftjs/core";

// 지연 로딩으로 성능 최적화
const Button = lazy(() => import("./components/Button").then(module => ({ default: module.Button })));
const Text = lazy(() => import("./components/Text").then(module => ({ default: module.Text })));
const Toolbox = lazy(() => import("./components/Toolbox").then(module => ({ default: module.Toolbox })));
const SettingsPanel = lazy(() => import("./components/SettingPanel").then(module => ({ default: module.SettingsPanel })));
const Container = lazy(() => import("./components/Container").then(module => ({ default: module.Container })));
const Card = lazy(() => import("./components/Card").then(module => ({ default: module.Card })));
const Topbar = lazy(() => import("./components/Topbar").then(module => ({ default: module.Topbar })));

// 로딩 컴포넌트
const LoadingSpinner = () => (
	<div className="flex items-center justify-center p-4">
		<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
	</div>
);

// 메인 캔버스 컴포넌트
const MainCanvas = memo(() => (
	<div className="md:col-span-3 bg-gray-100 p-4 rounded shadow">
		<Frame>
			<Element
				is="div"
				padding={5}
				background="#d2d2d2"
				style={{
					height: "300px",
				}}
				canvas
			/>
		</Frame>
	</div>
));

// 사이드바 컴포넌트
const Sidebar = memo(() => (
	<div className="md:col-span-2 bg-white rounded shadow p-4 space-y-4">
		<Suspense fallback={<LoadingSpinner />}>
			<Toolbox />
		</Suspense>
		<Suspense fallback={<LoadingSpinner />}>
			<SettingsPanel />
		</Suspense>
	</div>
));

// 컴포넌트 리졸버
const componentResolver = {
	Card,
	Button,
	Text,
	Container,
};

const App = () => {
	return (
		<div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-50 m-auto">
			<h1 className="text-2xl font-semibold text-center mb-6">
				A super simple page editor
			</h1>

			<Editor resolver={componentResolver}>
				<Suspense fallback={<LoadingSpinner />}>
					<Topbar />
				</Suspense>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
					<MainCanvas />
					<Sidebar />
				</div>
			</Editor>
		</div>
	);
};

export default memo(App);
