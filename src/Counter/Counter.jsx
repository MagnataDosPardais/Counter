import React, {useState} from "react"
import "./Counter.css"

function Counter() {
	const [name, setName] = useState('');
	const [value, setValue] = useState(0);
	const [saved, setSaved] = useState([]);

	function resCounter() { setValue(0); }

	function subCounter() { setValue(v => v - 1); }

	function addCounter() { setValue(v => v + 1); }

        function handleName(newName) {  setName(n => newName); }

	function defCounter(newValue) { setValue(newValue); }

	function addSaved(n, v) {
		n = n === "" ? 'Save' : n;
		setSaved(s => [...s, {id: s.length + 1, name: n, value: v}]);
		setName(n => '');
	}

	function moveSavedUp(i) {
		let updateList = [...saved];
		if(!i > 0) return;

		[updateList[i], updateList[i-1]] = [updateList[i-1], updateList[i]];
		setSaved(updateList);
	}

	function moveSavedDown(i) {
		let updateList = [...saved];
		if(!i < saved.length - 1) return;

		[updateList[i], updateList[i+1]] = [updateList[i+1], updateList[i]];
		setSaved(updateList);
	}

	function remSaved(index) { setSaved(s => s.filter((_,i) => i !== index)); }

	return (
		<div className="count">
			<h1 className="count-title"> C0UNT3R </h1>
			<div className="count-pannel">
				<input
					className="count-val"
					type="number" placeholder="Type..." value={value}
					onChange={(e) => defCounter(e.target.value)}
				/>

				<div className="button-section">
					<button onClick={() => subCounter()}>-</button>
					<button onClick={() => resCounter()}>0</button>
					<button onClick={() => addCounter()}>+</button>
				</div>
			</div>
			<div className="marker">
				<div className="marker-form">
					<label>
						<input
							className="marker-input"
							type="text" placeholder="Save name" value={name} maxLength={15}
							onChange={(e) => handleName(e.target.value)}
						/>
					</label>
					<button className="marker-button" onClick={() => addSaved(name,value)}> 💾 </button>
				</div>
				<ul className="marker-list">
					{{saved.length !== 0
						? saved.map(
							(s,i) => <li key={i} className="marker-list-item">
								<span className="marker-list-item-title">{s.name}: </span>
								<span className="marker-list-item-value">{s.value}</span>
								<button className="marker-list-item-delete" onClick={() => remSaved(i)}> ✖ </button>
								<button className="marker-list-item-down" onClick={() => moveSavedDown(i)}> 👇 </button>
								<button className="marker-list-item-up" onClick={() => moveSavedUp(i)}> 👆 </button>
							</li>
						)
						: <p className="marker-list-empty"> Nothing for now... 😐 </p>
					})
				</ul>	
			</div>
		</div>
	);
}

export default Counter
