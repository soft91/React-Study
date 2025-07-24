import { http } from "msw";
import { FileNode } from "../types";

// 초기 데이터
let nodes: FileNode[] = [
	// === 루트 폴더 ===
	{ id: 1, parent: 0, name: "Root", isFolder: true },

	// === 메인 폴더들 ===
	{ id: 2, parent: 1, name: "Documents", isFolder: true },
	{ id: 3, parent: 1, name: "Pictures", isFolder: true },
	{ id: 4, parent: 1, name: "Music", isFolder: true },
	{ id: 5, parent: 1, name: "Videos", isFolder: true },
	{ id: 6, parent: 1, name: "Downloads", isFolder: true },
	{ id: 7, parent: 1, name: "Projects", isFolder: true },

	// === Documents 하위 폴더들 ===
	{ id: 8, parent: 2, name: "Work", isFolder: true },
	{ id: 9, parent: 2, name: "Personal", isFolder: true },
	{ id: 10, parent: 2, name: "School", isFolder: true },
	{ id: 11, parent: 2, name: "Taxes", isFolder: true },

	// === Work 하위 폴더들 ===
	{ id: 12, parent: 8, name: "Reports", isFolder: true },
	{ id: 13, parent: 8, name: "Presentations", isFolder: true },
	{ id: 14, parent: 8, name: "Contracts", isFolder: true },

	// === Personal 하위 폴더들 ===
	{ id: 15, parent: 9, name: "Diary", isFolder: true },
	{ id: 16, parent: 9, name: "Resume", isFolder: true },
	{ id: 17, parent: 9, name: "Letters", isFolder: true },

	// === School 하위 폴더들 ===
	{ id: 18, parent: 10, name: "Math", isFolder: true },
	{ id: 19, parent: 10, name: "Science", isFolder: true },
	{ id: 20, parent: 10, name: "History", isFolder: true },

	// === Pictures 하위 폴더들 ===
	{ id: 21, parent: 3, name: "Vacation", isFolder: true },
	{ id: 22, parent: 3, name: "Family", isFolder: true },
	{ id: 23, parent: 3, name: "Screenshots", isFolder: true },
	{ id: 24, parent: 3, name: "Wallpapers", isFolder: true },

	// === Vacation 하위 폴더들 ===
	{ id: 25, parent: 21, name: "Japan 2023", isFolder: true },
	{ id: 26, parent: 21, name: "Europe 2022", isFolder: true },
	{ id: 27, parent: 21, name: "Beach 2024", isFolder: true },

	// === Music 하위 폴더들 ===
	{ id: 28, parent: 4, name: "Rock", isFolder: true },
	{ id: 29, parent: 4, name: "Jazz", isFolder: true },
	{ id: 30, parent: 4, name: "Classical", isFolder: true },
	{ id: 31, parent: 4, name: "Pop", isFolder: true },

	// === Videos 하위 폴더들 ===
	{ id: 32, parent: 5, name: "Movies", isFolder: true },
	{ id: 33, parent: 5, name: "TV Shows", isFolder: true },
	{ id: 34, parent: 5, name: "Tutorials", isFolder: true },

	// === Projects 하위 폴더들 ===
	{ id: 35, parent: 7, name: "Web Development", isFolder: true },
	{ id: 36, parent: 7, name: "Mobile Apps", isFolder: true },
	{ id: 37, parent: 7, name: "Data Science", isFolder: true },

	// === Web Development 하위 폴더들 ===
	{ id: 38, parent: 35, name: "React Projects", isFolder: true },
	{ id: 39, parent: 35, name: "Vue Projects", isFolder: true },
	{ id: 40, parent: 35, name: "Node.js Backend", isFolder: true },

	// === 파일들 ===
	// Documents/Work/Reports
	{ id: 41, parent: 12, name: "Q1_Report.pdf", isFolder: false },
	{ id: 42, parent: 12, name: "Q2_Report.pdf", isFolder: false },
	{ id: 43, parent: 12, name: "Annual_Summary.docx", isFolder: false },
	{ id: 44, parent: 12, name: "Budget_Analysis.xlsx", isFolder: false },

	// Documents/Work/Presentations
	{ id: 45, parent: 13, name: "Team_Meeting.pptx", isFolder: false },
	{ id: 46, parent: 13, name: "Client_Presentation.pptx", isFolder: false },
	{ id: 47, parent: 13, name: "Project_Overview.pptx", isFolder: false },

	// Documents/Work/Contracts
	{ id: 48, parent: 14, name: "Employment_Contract.pdf", isFolder: false },
	{ id: 49, parent: 14, name: "NDA_Agreement.pdf", isFolder: false },
	{ id: 50, parent: 14, name: "Vendor_Contract.docx", isFolder: false },

	// Documents/Personal/Diary
	{ id: 51, parent: 15, name: "2024_January.txt", isFolder: false },
	{ id: 52, parent: 15, name: "2024_February.txt", isFolder: false },
	{ id: 53, parent: 15, name: "Goals_2024.md", isFolder: false },

	// Documents/Personal/Resume
	{ id: 54, parent: 16, name: "Resume_2024.pdf", isFolder: false },
	{ id: 55, parent: 16, name: "Cover_Letter_Template.docx", isFolder: false },
	{ id: 56, parent: 16, name: "Portfolio.pdf", isFolder: false },

	// Documents/School/Math
	{ id: 57, parent: 18, name: "Calculus_Notes.pdf", isFolder: false },
	{ id: 58, parent: 18, name: "Algebra_Homework.docx", isFolder: false },
	{ id: 59, parent: 18, name: "Statistics_Project.xlsx", isFolder: false },

	// Documents/School/Science
	{ id: 60, parent: 19, name: "Physics_Lab_Report.pdf", isFolder: false },
	{ id: 61, parent: 19, name: "Chemistry_Notes.docx", isFolder: false },
	{ id: 62, parent: 19, name: "Biology_Research.pdf", isFolder: false },

	// Pictures/Vacation/Japan 2023
	{ id: 63, parent: 25, name: "tokyo_tower.jpg", isFolder: false },
	{ id: 64, parent: 25, name: "kyoto_temple.jpg", isFolder: false },
	{ id: 65, parent: 25, name: "osaka_castle.jpg", isFolder: false },
	{ id: 66, parent: 25, name: "mount_fuji.jpg", isFolder: false },
	{ id: 67, parent: 25, name: "sushi_dinner.jpg", isFolder: false },

	// Pictures/Vacation/Europe 2022
	{ id: 68, parent: 26, name: "paris_eiffel.jpg", isFolder: false },
	{ id: 69, parent: 26, name: "rome_colosseum.jpg", isFolder: false },
	{ id: 70, parent: 26, name: "venice_canal.jpg", isFolder: false },
	{ id: 71, parent: 26, name: "london_bridge.jpg", isFolder: false },

	// Pictures/Vacation/Beach 2024
	{ id: 72, parent: 27, name: "sunset_beach.jpg", isFolder: false },
	{ id: 73, parent: 27, name: "palm_trees.jpg", isFolder: false },
	{ id: 74, parent: 27, name: "ocean_waves.jpg", isFolder: false },

	// Pictures/Family
	{ id: 75, parent: 22, name: "family_portrait.jpg", isFolder: false },
	{ id: 76, parent: 22, name: "birthday_party.jpg", isFolder: false },
	{ id: 77, parent: 22, name: "christmas_2023.jpg", isFolder: false },
	{ id: 78, parent: 22, name: "graduation_day.jpg", isFolder: false },

	// Pictures/Screenshots
	{ id: 79, parent: 23, name: "error_message.png", isFolder: false },
	{ id: 80, parent: 23, name: "website_design.png", isFolder: false },
	{ id: 81, parent: 23, name: "code_snippet.png", isFolder: false },
	{ id: 82, parent: 23, name: "game_screenshot.png", isFolder: false },

	// Pictures/Wallpapers
	{ id: 83, parent: 24, name: "mountain_landscape.jpg", isFolder: false },
	{ id: 84, parent: 24, name: "abstract_art.jpg", isFolder: false },
	{ id: 85, parent: 24, name: "minimal_design.jpg", isFolder: false },
	{ id: 86, parent: 24, name: "space_galaxy.jpg", isFolder: false },

	// Music/Rock
	{ id: 87, parent: 28, name: "Led_Zeppelin_Stairway.mp3", isFolder: false },
	{ id: 88, parent: 28, name: "Pink_Floyd_Dark_Side.mp3", isFolder: false },
	{ id: 89, parent: 28, name: "Queen_Bohemian_Rhapsody.mp3", isFolder: false },
	{ id: 90, parent: 28, name: "The_Beatles_Hey_Jude.mp3", isFolder: false },

	// Music/Jazz
	{ id: 91, parent: 29, name: "Miles_Davis_So_What.mp3", isFolder: false },
	{
		id: 92,
		parent: 29,
		name: "John_Coltrane_Giant_Steps.mp3",
		isFolder: false,
	},
	{ id: 93, parent: 29, name: "Dave_Brubeck_Take_Five.mp3", isFolder: false },

	// Music/Classical
	{ id: 94, parent: 30, name: "Beethoven_Symphony_5.mp3", isFolder: false },
	{ id: 95, parent: 30, name: "Mozart_Requiem.mp3", isFolder: false },
	{
		id: 96,
		parent: 30,
		name: "Bach_Well_Tempered_Clavier.mp3",
		isFolder: false,
	},

	// Music/Pop
	{
		id: 97,
		parent: 31,
		name: "Michael_Jackson_Billie_Jean.mp3",
		isFolder: false,
	},
	{ id: 98, parent: 31, name: "Madonna_Like_A_Prayer.mp3", isFolder: false },
	{ id: 99, parent: 31, name: "Prince_Purple_Rain.mp3", isFolder: false },

	// Videos/Movies
	{ id: 100, parent: 32, name: "The_Godfather.mp4", isFolder: false },
	{ id: 101, parent: 32, name: "Pulp_Fiction.mp4", isFolder: false },
	{ id: 102, parent: 32, name: "The_Matrix.mp4", isFolder: false },
	{ id: 103, parent: 32, name: "Inception.mp4", isFolder: false },

	// Videos/TV Shows
	{ id: 104, parent: 33, name: "Breaking_Bad_S01E01.mp4", isFolder: false },
	{ id: 105, parent: 33, name: "Game_of_Thrones_S01E01.mp4", isFolder: false },
	{ id: 106, parent: 33, name: "Friends_S01E01.mp4", isFolder: false },

	// Videos/Tutorials
	{ id: 107, parent: 34, name: "React_Tutorial_Part1.mp4", isFolder: false },
	{ id: 108, parent: 34, name: "Python_Basics.mp4", isFolder: false },
	{ id: 109, parent: 34, name: "Photoshop_Tutorial.mp4", isFolder: false },

	// Projects/Web Development/React Projects
	{ id: 110, parent: 38, name: "todo_app.jsx", isFolder: false },
	{ id: 111, parent: 38, name: "weather_app.jsx", isFolder: false },
	{ id: 112, parent: 38, name: "portfolio_site.jsx", isFolder: false },
	{ id: 113, parent: 38, name: "package.json", isFolder: false },
	{ id: 114, parent: 38, name: "README.md", isFolder: false },

	// Projects/Web Development/Vue Projects
	{ id: 115, parent: 39, name: "ecommerce_app.vue", isFolder: false },
	{ id: 116, parent: 39, name: "blog_system.vue", isFolder: false },
	{ id: 117, parent: 39, name: "dashboard.vue", isFolder: false },

	// Projects/Web Development/Node.js Backend
	{ id: 118, parent: 40, name: "server.js", isFolder: false },
	{ id: 119, parent: 40, name: "database.js", isFolder: false },
	{ id: 120, parent: 40, name: "routes.js", isFolder: false },
	{ id: 121, parent: 40, name: "package.json", isFolder: false },

	// Projects/Mobile Apps
	{ id: 122, parent: 36, name: "fitness_tracker.swift", isFolder: false },
	{ id: 123, parent: 36, name: "recipe_app.java", isFolder: false },
	{ id: 124, parent: 36, name: "chat_app.dart", isFolder: false },

	// Projects/Data Science
	{ id: 125, parent: 37, name: "data_analysis.ipynb", isFolder: false },
	{ id: 126, parent: 37, name: "machine_learning.py", isFolder: false },
	{ id: 127, parent: 37, name: "data_visualization.py", isFolder: false },
	{ id: 128, parent: 37, name: "requirements.txt", isFolder: false },

	// Downloads (다양한 파일 타입)
	{ id: 129, parent: 6, name: "document_template.docx", isFolder: false },
	{ id: 130, parent: 6, name: "presentation_template.pptx", isFolder: false },
	{ id: 131, parent: 6, name: "spreadsheet_data.xlsx", isFolder: false },
	{ id: 132, parent: 6, name: "compressed_file.zip", isFolder: false },
	{ id: 133, parent: 6, name: "installer.exe", isFolder: false },
	{ id: 134, parent: 6, name: "script.sh", isFolder: false },
	{ id: 135, parent: 6, name: "config.json", isFolder: false },
	{ id: 136, parent: 6, name: "database_backup.sql", isFolder: false },
	{ id: 137, parent: 6, name: "api_documentation.pdf", isFolder: false },
	{ id: 138, parent: 6, name: "user_manual.pdf", isFolder: false },
	{ id: 139, parent: 6, name: "sample_image.png", isFolder: false },
	{ id: 140, parent: 6, name: "sample_video.mp4", isFolder: false },
	{ id: 141, parent: 6, name: "sample_audio.mp3", isFolder: false },
	{ id: 142, parent: 6, name: "archive.tar.gz", isFolder: false },
	{ id: 143, parent: 6, name: "log_file.log", isFolder: false },
	{ id: 144, parent: 6, name: "certificate.crt", isFolder: false },
	{ id: 145, parent: 6, name: "private_key.key", isFolder: false },
];

let nextId = 146;

/**
 * 특정 부모 폴더의 파일/폴더 목록을 반환하는 API 핸들러
 */
export const getFilesHandler = http.get("/api/files", ({ request }) => {
	const url = new URL(request.url);
	const parent = Number(url.searchParams.get("parent") || 1);
	const filteredNodes = nodes.filter((n) => n.parent === parent);
	return new Response(JSON.stringify(filteredNodes), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
});

/**
 * 새로운 폴더를 생성하는 API 핸들러
 */
export const addFolderHandler = http.post(
	"/api/folder",
	async ({ request }) => {
		const { parent, name } = (await request.json()) as {
			parent: number;
			name: string;
		};
		const newFolder: FileNode = {
			id: nextId++,
			parent,
			name,
			isFolder: true,
		};
		nodes.push(newFolder);
		return new Response(JSON.stringify(newFolder), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	}
);

/**
 * 새로운 파일을 생성하는 API 핸들러
 */
export const addFileHandler = http.post("/api/file", async ({ request }) => {
	const { parent, name } = (await request.json()) as {
		parent: number;
		name: string;
	};
	const newFile: FileNode = {
		id: nextId++,
		parent,
		name,
		isFolder: false,
	};
	nodes.push(newFile);
	return new Response(JSON.stringify(newFile), {
		status: 201,
		headers: { "Content-Type": "application/json" },
	});
});

/**
 * 노드의 이름을 변경하는 API 핸들러
 */
export const renameNodeHandler = http.patch(
	"/api/node/:id",
	async ({ params, request }) => {
		const id = Number(params.id);
		const { name } = (await request.json()) as { name: string };
		const node = nodes.find((n) => n.id === id);
		if (node) {
			node.name = name;
		}
		return new Response("{}", { status: 200 });
	}
);

/**
 * 노드를 삭제하는 API 핸들러
 */
export const deleteNodeHandler = http.delete("/api/node/:id", ({ params }) => {
	const id = Number(params.id);
	nodes = nodes.filter((n) => n.id !== id);
	return new Response("{}", { status: 200 });
});

/**
 * 노드를 다른 위치로 이동하는 API 핸들러
 */
export const moveNodeHandler = http.post(
	"/api/node/:id/move",
	async ({ params, request }) => {
		const id = Number(params.id);
		const { parent } = (await request.json()) as { parent: number };
		const node = nodes.find((n) => n.id === id);
		if (node) {
			node.parent = parent;
		}
		return new Response("{}", { status: 200 });
	}
);

/**
 * 노드를 복사하는 API 핸들러
 */
export const copyNodeHandler = http.post(
	"/api/node/:id/copy",
	async ({ params, request }) => {
		const id = Number(params.id);
		const { parent } = (await request.json()) as { parent: number };
		const originalNode = nodes.find((n) => n.id === id);

		if (originalNode) {
			const copiedNode: FileNode = {
				id: nextId++,
				parent,
				name: `${originalNode.name} (복사본)`,
				isFolder: originalNode.isFolder,
			};
			nodes.push(copiedNode);
			return new Response(JSON.stringify(copiedNode), {
				status: 201,
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response("{}", { status: 404 });
	}
);

/**
 * 파일을 업로드하는 API 핸들러
 */
export const uploadFileHandler = http.post(
	"/api/upload",
	async ({ request }) => {
		const formData = await request.formData();
		const parent = Number(formData.get("parent"));
		const file = formData.get("file") as File;

		const uploadedFile: FileNode = {
			id: nextId++,
			parent,
			name: file.name,
			isFolder: false,
		};

		nodes.push(uploadedFile);
		return new Response(JSON.stringify(uploadedFile), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	}
);

/**
 * 모든 폴더 목록을 반환하는 API 핸들러 (폴더 트리용)
 */
export const getAllFoldersHandler = http.get("/api/folders/all", () => {
	const folders = nodes.filter((n) => n.isFolder);
	return new Response(JSON.stringify(folders), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
});

/**
 * 모든 핸들러를 배열로 내보냅니다.
 */
export const handlers = [
	getFilesHandler,
	addFolderHandler,
	addFileHandler,
	renameNodeHandler,
	deleteNodeHandler,
	moveNodeHandler,
	copyNodeHandler,
	uploadFileHandler,
	getAllFoldersHandler,
];
