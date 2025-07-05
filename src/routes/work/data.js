import aws from '$lib/images/aws.svg';
import vassar from '$lib/images/vassar.svg';

export const experiences = [
    {
        location: 'Boston, MA',
        date: 'August 2025 - Present',
        company: 'Amazon Web Services',
        position: 'Software Engineer — AWS Parallel Computing Service, HPC',
        team: 'AWS Parallel Computing Service, HPC',
        image: aws,
    },
    {
        location: 'Boston, MA',
        date: 'May - August 2024',
        company: 'Amazon Web Services',
        position: 'Software Engineer Intern — AWS Parallel Computing Service, HPC',
        image: aws,
        bullets: [
            'Contributed to the launch of a product featuring highly complex architecture, leveraging dozens of AWS services',
            'Designed and implemented a solution in Java to update cluster Slurm configuration stored on Docker containers',
            'Orchestrated creation of required AWS resources using AWS CDKs in TypeScript',
            'Delivered comprehensive integration and unit tests using Jest, JUnit, and Mockito to achieve 100% coverage',
            'Developed scripts in Python and Bash to streamline developer experience, cutting deployment time by up to 90%',
        ],
        links: [
            ['Launch Announcement', 'https://press.aboutamazon.com/2024/8/aws-parallel-computing-service-is-now-generally-available-designed-to-accelerate-scientific-discovery']
        ]
    },
	{
		location: 'Boston, MA',
		date: 'May - August 2023',
		company: 'Amazon Web Services',
		position: 'Software Engineer Intern — AWS ParallelCluster, HPC',
		image: aws,
		bullets: [
			'Scoped, designed, and implemented a solution to support the Spack package manager on HPC clusters, reducing install times for large software packages from hours to seconds',
			'Gained hands-on Linux expertise through managing packages, users, and compilers using Chef automation',
			'Automated seamless creation and configuration of AWS Services such as API Gateway, Lambda, and S3',
			'Developed a Python-based CLI tool and co-authored an official customer-facing AWS blog post to showcase interaction with the Slurm REST API, enhancing visibility for the previous year’s project',
		],
		links: [
			['AWS Blog Post', 'https://aws.amazon.com/blogs/hpc/slurm-rest-api-in-aws-parallelcluster/'],
			['Open source - ParallelCluster Cookbook', 'https://github.com/aws/aws-parallelcluster-cookbook/pull/2373'],
			['Open source - ParallelCluster UI', 'https://github.com/aws/aws-parallelcluster-ui/pull/251']
		]
	},
	{
		location: 'Seattle, WA',
		date: 'June - August 2022',
		company: 'Amazon Web Services',
		position: 'Software Engineer Intern — AWS ParallelCluster, HPC',
		image: aws,
		bullets: [
			'Engineered a full-stack job submission solution by enabling the Slurm REST API on cluster creation',
			'Extended functionality of a React-based frontend and wrote tests using Jest',
			'Expanded REST API endpoints in a Flask backend and wrote tests using Pytest',
			'Enhanced security by automating JWT authentication and NGINX configuration as a secure reverse proxy',
		],
		links: [
			['Open source - Slurm REST API', 'https://github.com/aws-samples/pcluster-manager/pull/197'],
			['Open source - ParallelCluster UI', 'https://github.com/aws-samples/pcluster-manager/pull/235']
		]
	},
	{
		location: 'Poughkeepsie, NY',
		date: 'August 2023 - February 2024',
		company: 'Vassar College',
		position: 'Grading Assistant - Linear Algebra and Number Theory — Mathematics Department',
		image: vassar
	},
	{
		location: 'Poughkeepsie, NY',
		date: 'September 2021 - May 2022',
		company: 'Vassar College',
		position: 'Regional and International Programs Assistant — Alumnae Office',
		image: vassar
	}
];

