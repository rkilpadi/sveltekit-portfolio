export const posts = [
    {
        slug: "neural-network-math",
        title: "The Math Behind Building a Neural Network From Scratch",
        date: "June 2025",
        summary: "When I was first learning about machine learning, I remember being told not to worry about the math behind the models I built. Now that I have a deeper background in math, I decided to take a look into the mathematical foundations of neural networks and try to build my own using only NumPy. This post will be math-heavy, but if you have an understanding of linear algebra and multivariable calculus, you'll understand why the logic behind neural networks essentially boils down to a minimization problem."
    },
    {
        slug: "tarka",
        title: "Tarka: A Rudimentary Verification-Aware Lisp Dialect",
        date: "April 2025",
        summary: "On many occasions, minor bugs in software have cost companies millions of dollars. The current standard for validation in software development is unit testing, which provides evidence that programs work as expected by running through finitely many test cases. But this approach simply tells us that our code works on cases we foresee, and does not provably verify the correctness of code. Instead, we could compile production code to be verified by an SMT (Satisfiability Modulo Theories) solver, thereby achieving mathematically correct code. This is called a verification condition generator (VCG)."
    },
    {
        slug: "flippy-road",
        title: "Flippy Road: A Game for the Flipper Zero",
        date: "March 2024",
        summary: "I built a little Frogger-inspired game for the Flipper Zero to improve my C skills. It's published on the Flipper app store!"
    },
    {
        link: "https://aws.amazon.com/blogs/hpc/slurm-rest-api-in-aws-parallelcluster/",
        title: "Slurm REST API in AWS ParallelCluster",
        date: "August 2023",
        summary: "As part of my first internship at AWS ParallelCluster in 2022, I built a feature that enables users to interact with Slurm jobs through the API after running a post-install script on their clusters. I realized the next year that customers were using this add-on feature, so I took the time to polish it and write an AWS blog post with my mentor to increase visibility."
    }
];

