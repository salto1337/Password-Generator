import { useState } from "react";
import { copyToClipboard } from "./utils/copyToClipboard";
import { LOWERCASE, NUMBERS, SYMBOLS, UPPERCASE } from "./constants/index";
import copy_icon from "./assets/copy.png";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [passwordLength, setPasswordLength] = useState(8);
	const [options, setOptions] = useState({
		upper: true,
		lower: false,
		numbers: false,
		symbols: false,
	});

	function generatePassword(e) {
		e.preventDefault();
		const { upper, lower, numbers, symbols } = options;

		if (!upper && !lower && !numbers && !symbols) return;

		let passwordChars = "";

		if (upper) passwordChars += UPPERCASE;
		if (lower) passwordChars += LOWERCASE;
		if (numbers) passwordChars += NUMBERS;
		if (symbols) passwordChars += SYMBOLS;

		const newPassword = Array.from(
			{ length: passwordLength },
			() => passwordChars[Math.floor(Math.random() * passwordChars.length)]
		).join("");

		setInputValue(newPassword);
	}

	const handleCheckboxChange = (key) => () => {
		setOptions((prevOptions) => ({
			...prevOptions,
			[key]: !prevOptions[key],
		}));
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={generatePassword}
				className="border rounded-md p-5 w-[350px] sm:w-[400px]">
				<h1 className="font-semibold text-xl">Password Generator</h1>
				<p className="text-p text-sm">
					Generate a secure password with customizable length and character
					types.
				</p>
				<div className="flex items-center justify-between mt-12">
					<h2 className="text-[13px] font-medium">Password Length</h2>
					<input
						className="py-[6px] w-[70px] border pl-3 rounded-md text-sm"
						type="number"
						min={8}
						max={32}
						value={passwordLength}
						onChange={(e) => setPasswordLength(Number(e.target.value))}
					/>
				</div>
				<div className="mt-5">
					{Object.keys(options).map((key) => (
						<div key={key} className="flex items-center gap-2 mt-1">
							<input
								id={key}
								type="checkbox"
								checked={options[key]}
								onChange={handleCheckboxChange(key)}
							/>
							<label className="text-[13px] font-medium" htmlFor={key}>
								{`Include ${key.charAt(0).toUpperCase() + key.slice(1)}`}
							</label>
						</div>
					))}
				</div>
				<div className="mt-5 flex gap-2">
					<input
						className="border w-full rounded-md py-1 pl-2 text-[12px]"
						type="text"
						value={inputValue}
						readOnly
					/>
					<button
						type="button"
						className="bg-red flex justify-center items-center rounded-md w-[50px] transition-colors hover:bg-second_red"
						onClick={() => copyToClipboard(inputValue)}>
						<img className="w-[15px]" src={copy_icon} alt="copy" />
					</button>
				</div>
				<button className="mt-5 w-[150px] py-2 text-[14px] text-white rounded-md transition-colors bg-red hover:bg-second_red">
					Generate Password
				</button>
			</form>
		</div>
	);
}

export default App;
