import aws from '$lib/images/aws.svg';
import vassar from '$lib/images/vassar.svg';

export const experiences = [
	{
		location: 'Boston, MA',
		date: 'May - August 2023',
		company: 'Amazon Web Services',
		position: 'Software Engineer Intern | AWS ParallelCluster, HPC',
		image: aws,
		bullets: [
			'Scoped, designed, and implemented a solution to support the Spack package manager on HPC clusters, reducing install times for large software packages from hours to seconds',
			'Gained hands-on Linux expertise through managing packages, users, and compilers using Chef automation',
			'Automated seamless creation and configuration of AWS Services such as API Gateway, Lambda, and S3',
			'Developed a Python-based CLI tool and co-authored an official customer-facing AWS blog post to showcase interaction with the Slurm REST API, enhancing visibility for the previous year’s project',
			'Exceeded expectations by delivering two major projects within the timeframe of one'
		],
		links: [
			['AWS Blog Post', 'https://aws.amazon.com/blogs/hpc/slurm-rest-api-in-aws-parallelcluster/'],
			[
				'Open source - ParallelCluster Cookbook',
				'https://github.com/aws/aws-parallelcluster-cookbook/pull/2373'
			],
			['Open source - ParallelCluster UI', 'https://github.com/aws/aws-parallelcluster-ui/pull/251']
		]
	},
	{
		location: 'Seattle, WA',
		date: 'June - August 2022',
		company: 'Amazon Web Services',
		position: 'Software Engineer Intern | AWS ParallelCluster, HPC',
		image: aws,
		bullets: [
			'Engineered a full-stack job submission solution by enabling the Slurm REST API on cluster creation',
			'Validated solution on six different Linux distributions and dozens of instance types',
			'Extended functionality of a React-based frontend and wrote tests using Jest',
			'Expanded REST API endpoints in a Flask backend and wrote tests using Pytest',
			'Enhanced security by automating JWT authentication and NGINX configuration as a secure reverse proxy',
			'Exceeded expectations by completing initial project to enable Slurm REST API in one-third of allocated time'
		],
		links: [
			['Open source - Slurm REST API', 'https://github.com/aws-samples/pcluster-manager/pull/197'],
			[
				'Open source - ParallelCluster UI',
				'https://github.com/aws-samples/pcluster-manager/pull/235'
			]
		]
	},
	{
		location: 'Poughkeepsie, NY',
		date: 'August 2023 - Present',
		company: 'Vassar College',
		position: 'Linear Algebra Grading Assistant | Mathematics Department',
		image: vassar
	},
	{
		location: 'Poughkeepsie, NY',
		date: 'Sep 2021 - May 2022',
		company: 'Vassar College',
		position: 'Regional and International Programs Assistant | Alumnae Office',
		image: vassar
	}
];
