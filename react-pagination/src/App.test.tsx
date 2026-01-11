import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// Mock fetch API
const mockFetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve({
				todos: [],
				total: 0,
				skip: 0,
				limit: 10,
			}),
	})
) as jest.Mock;

Object.defineProperty(global, "fetch", {
	writable: true,
	value: mockFetch,
});

beforeEach(() => {
	mockFetch.mockClear();
	mockFetch.mockResolvedValue({
		json: async () => ({
			todos: [],
			total: 0,
			skip: 0,
			limit: 10,
		}),
	});
});

test("renders table headers", async () => {
	render(<App />);

	await waitFor(() => {
		const idHeader = screen.getByText("ID");
		// @ts-ignore - toBeInTheDocument is provided by jest-dom in setupTests.ts
		expect(idHeader).toBeInTheDocument();
	});
});
