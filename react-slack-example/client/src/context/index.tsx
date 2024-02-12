import React, { createContext, useReducer, ReactNode } from "react";
import {
	AUTH_INFO,
	CURRENT_CHAT,
	GROUP_CHAT,
	GROUP_LIST,
	USER_LIST,
} from "./action";

interface LoginInfo {
	userId: string;
	socketId: string;
}

interface CurrentChat {
	targetId: string[];
	roomNumber: string;
	targetSocketId: string;
}

interface GroupChat {
	textBarStatus: boolean;
	groupChatNames: string[];
}

interface State {
	loginInfo: LoginInfo;
	userList: string[];
	groupList: string[];
	currentChat: CurrentChat;
	groupChat: GroupChat;
}

interface Action {
	type: string;
	payload: any;
}

const initialState: State = {
	loginInfo: {
		userId: "",
		socketId: "",
	},
	userList: [],
	groupList: [],
	currentChat: {
		targetId: [],
		roomNumber: "",
		targetSocketId: "",
	},
	groupChat: {
		textBarStatus: false,
		groupChatNames: [],
	},
};

const Context = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => null,
});

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case AUTH_INFO:
			return {
				...state,
				loginInfo: action.payload,
			};
		case USER_LIST:
			return {
				...state,
				userList: action.payload,
			};
		case GROUP_LIST:
			return {
				...state,
				groupList: action.payload,
			};
		case CURRENT_CHAT:
			return {
				...state,
				currentChat: action.payload,
			};
		case GROUP_CHAT:
			return {
				...state,
				groupChat: action.payload,
			};
		default:
			return state;
	}
};

interface StoreProviderProps {
	children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, StoreProvider };
