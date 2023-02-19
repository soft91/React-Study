import "./App.css";
import Carousel from "./components/Carousel";
import InfiniteCarousel from "./components/InfiniteCarousel";

function App() {
	return (
		<div className="App">
			<InfiniteCarousel>
				<div>test</div>
				<div>test2</div>
				<div>test3</div>
			</InfiniteCarousel>
		</div>
	);
}

export default App;
