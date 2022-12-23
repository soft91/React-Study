import { ReactNode } from "react";
const Layout = (props: { children: ReactNode }) => {
	return (
		<div>
			<header>header</header>
			<main>{props.children}</main>
			<footer>footer</footer>
		</div>
	);
};
export default Layout;
