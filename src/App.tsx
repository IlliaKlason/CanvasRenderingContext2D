import  {useState} from 'react';
import CanvasComponent from "./components/Canvas";
import Canvas from "./models/Canvas";
import Button from "./components/Button";

function App() {
	// eslint-disable-next-line 
	const [canvas, setCanvas] = useState(new Canvas());

	return (
		<div className="App">
			<CanvasComponent canvas={canvas} />
			<Button onClick={canvas.collapse.bind(canvas)}/>
		</div>
	);
}

export default App;
