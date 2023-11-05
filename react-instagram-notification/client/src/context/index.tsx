import React, { createContext, useReducer, ReactNode } from "react";
import { AUTH_INFO } from "./action";

type State = {
	userName: string;
};

type Action = {
	type: string;
	payload: string;
};

const initialState: State = {
	userName: "",
};

const Context = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => {},
});

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case AUTH_INFO:
			return {
				...state,
				userName: action.payload,
			};
		default:
			return state;
	}
};

type StoreProviderProps = {
	children: ReactNode;
};

const StoreProvider: React.FC<StoreProviderProps> = ({
	children,
}: StoreProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, StoreProvider };
