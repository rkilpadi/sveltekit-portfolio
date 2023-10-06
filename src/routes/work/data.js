import aws from '$lib/images/aws.svg';
import vassar from '$lib/images/vassar.svg';

export const experiences = [
    {
        location: "Boston, MA",
        date: "May - August 2023",
        company: "Amazon Web Services",
        position: "Software Engineer Intern | AWS ParallelCluster, HPC",
        image: aws,
        bullets: [
            "Developed a Chef script to install the Spack package manager on HPC clusters",
            "Gained hands-on Linux expertise through managing packages, users, and compilers",
            "Updated ParallelCluster UI architecture to enable restricted access within a private VPC",
            "Automated creation and configuration of AWS Services such as API Gateway, Lambda, and S3",
            "Co-authored an official customer-facing AWS blog post about the previous year’s project",
            "Exceeded initial expectations by completing two major projects",
        ],
    },
    {
        location: "Seattle, WA",
        date: "June - August 2022",
        company: "Amazon Web Services",
        position: "Software Engineer - Propel Intern | AWS ParallelCluster, HPC",
        image: aws,
        bullets: [
            "Gained insights from experienced developers while contributing to a large open-source project",
            "Engineered a Chef script to enable the Slurm API on HPC clusters, enhancing job submission via UI",
            "Configured NGINX to function as a secure reverse proxy for HTTPS API calls",
            "Integrated functionality into a React-based frontend and extended API endpoints using Flask",
            "Completed initial project scope within one month",
        ],
    },
    {
        location: "Poughkeepsie, NY",
        date: "August 2023 - Present",
        company: "Vassar College",
        position: "Linear Algebra Grading Assistant | Mathematics Department",
        image: vassar,
    },
    {
        location: "Poughkeepsie, NY",
        date: "Sep 2021 - May 2022",
        company: "Vassar College",
        position: "Regional and International Programs Assistant | Alumnae Office",
        image: vassar,
    },
];
