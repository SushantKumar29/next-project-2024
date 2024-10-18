export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center h-full p-4 md:p-8'>
			<div className='text-2xl md:text-4xl font-bold mb-4 md:mb-8'>
				Welcome to Next Project 2024
			</div>
			<p className='text-lg md:text-xl mb-8 md:mb-12'>
				This project is a starting point for a NextJS project with
			</p>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'>
				<div className='p-4 md:p-8 border rounded-lg'>
					<h2 className='text-xl md:text-2xl font-bold mb-4'>Features</h2>
					<ul className='list-disc pl-4 md:pl-8'>
						<li>Authentication with Clerk</li>
						<li>Responsive design with Tailwind CSS and Shadcn</li>
						<li>Type safety with Typescript</li>
						<li>Database integration with MongoDB</li>
					</ul>
				</div>
				<div className='p-4 md:p-8 border rounded-lg'>
					<h2 className='text-xl md:text-2xl font-bold mb-4'>
						Technologies used
					</h2>
					<ul className='list-disc pl-4 md:pl-8'>
						<li>Clerk</li>
						<li>Tailwind CSS and Shadcn</li>
						<li>Typescript</li>
						<li>MongoDB</li>
					</ul>
				</div>
			</div>
			<p className='text-lg md:text-xl my-8 md:mb-12'>
				You can check out the{" "}
				<a
					href='https://github.com/SushantKumar29/next-project-2024'
					className='underline'
					target='_blank'
					rel='noreferrer'
				>
					source code
				</a>{" "}
				on GitHub.
			</p>
		</div>
	);
}
