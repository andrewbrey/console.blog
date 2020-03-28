import React from 'react';

const Sun = ({ className }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="currentColor" stroke="currentColor">
			<line fill="none" strokeMiterlimit="10" x1="1" y1="12" x2="2" y2="12" />
			<line fill="none" strokeMiterlimit="10" x1="4.2" y1="4.2" x2="4.9" y2="4.9" />
			<line fill="none" strokeMiterlimit="10" x1="12" y1="1" x2="12" y2="2" />
			<line fill="none" strokeMiterlimit="10" x1="19.8" y1="4.2" x2="19.1" y2="4.9" />
			<line fill="none" strokeMiterlimit="10" x1="23" y1="12" x2="22" y2="12" />
			<line fill="none" strokeMiterlimit="10" x1="19.8" y1="19.8" x2="19.1" y2="19.1" />
			<line fill="none" strokeMiterlimit="10" x1="12" y1="23" x2="12" y2="22" />
			<line fill="none" strokeMiterlimit="10" x1="4.2" y1="19.8" x2="4.9" y2="19.1" />
			<circle fill="none" stroke="currentColor" strokeMiterlimit="10" cx="12" cy="12" r="6" />
		</g>
	</svg>
);

const Moon = ({ className }) => (
	<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="currentColor" stroke="currentColor">
			<path
				fill="none"
				stroke="currentColor"
				strokeMiterlimit="10"
				d="M19,15C13.5,15,9,10.5,9,5 c0-0.9,0.1-1.8,0.4-2.6C5.1,3.5,2,7.4,2,12c0,5.5,4.5,10,10,10c4.6,0,8.5-3.1,9.6-7.4C20.8,14.9,19.9,15,19,15z"
			/>
		</g>
	</svg>
);

const DarkModeToggle = ({ active, onToggle }) => (
	<div className="flex flex-col">
		<label htmlFor="dark-mode-toggle" className="inline-flex items-center cursor-pointer">
			<span className="relative rounded-full overflow-hidden focus-within:shadow-outline-gray">
				<span className={`${active ? 'bg-smoke-200' : 'bg-smoke-800'} block w-10 h-6 rounded-full shadow-inner`} />
				<span
					className={`${
						active ? 'transform translate-x-full bg-smoke-900' : 'bg-smoke-100'
					} absolute inset-y-0 left-0 block w-4 h-4 mt-1 ml-1 transition-transform duration-100 ease-in-out rounded-full shadow flex items-center justify-center`}
				>
					<input
						id="dark-mode-toggle"
						type="checkbox"
						className="absolute w-0 h-0 opacity-0"
						checked={active}
						onChange={onToggle}
					/>
					{active ? <Moon className="w-3 h-3 text-smoke-100" /> : <Sun className="w-3 h-3 text-smoke-900" />}
				</span>
			</span>
		</label>
	</div>
);

export default DarkModeToggle;
