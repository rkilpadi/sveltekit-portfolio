# Tarka: A Rudimentary Verification-Aware Lisp Dialect

On many occasions, minor bugs in software have cost companies millions of dollars. The current standard for validation in software development is unit testing, which provides evidence that programs work as expected by running through finitely many test cases. But this approach simply tells us that our code works on cases we foresee, and does not provably verify the correctness of code. Instead, we could compile production code to be verified by an SMT (Satisfiability Modulo Theories) solver like [Z3](https://github.com/Z3Prover/z3), thereby achieving mathematically correct code. This is called a **verification condition generator** (VCG).

[SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) generalizes the Boolean Satisfiability Problem (SAT) in order to provide a language that solvers can use to determine the satisfiability of mathematical formulae. There are a few practical (but rarely used outside of academia) programming languages such as [Dafny](https://github.com/dafny-lang/dafny) and [F*](https://github.com/FStarLang/FStar) that compile their code into a format that is parsed by an SMT solver to ensure their validity. This strategy essentially removes the possibility for software bugs, as long as contracts are correctly specified for the solver. As long as the internals of the language itself has no errors, any software written in it can be rigorously verified in its own native code. These languages allow the user to verify, for example, that an index of an array always remains within its bounds, making any dangerous out-of-bounds errors due to human error impossible.

 # Tarka

I implemented a simple verification condition generator for a rudimentary language I am calling Tarka (which means “logic” in Sanskrit). In doing so, I extended a compiler written in OCaml for a toy language that I built in a compilers class. My VCG adds a stage before compilation that converts code written in my language into logical expressions that can be interpreted by the Z3 SMT solver. It allows users to input preconditions and postconditions that will be formally verified. If verification fails, the code will not compile. As long as my VCG and the SMT solver I am using have no flaws, users can definitively prove their assertions. For example, the following Tarka function will verify that the sum of two positive integers is greater than both integers:

  
```
(def (add n : Num m : Num) : Num (
	(requires (> m 0))
	(requires (> n 0))
	(ensures (> result  n))
	(ensures (> result m))
)
	(+ n m)
)
```
In order to design the syntax for Tarka, I took inspiration from existing languages such as F* and learned about Hoare logic, which is a formal system for reasoning about the correctness of programs using preconditions and postconditions. In Tarka, the precondition of a function is the logical and of all requires clauses, while the postcondition is the logical and of all ensures clauses. During the verification stage, Tarka checks the satisfiability of the precondition, the function body, and the negation of the postcondition. If the result is unsatisfiable, then verification succeeds, as we have shown that the precondition must imply the postcondition because no counterexample exists. If the result is satisfiable, verification fails, and Tarka gives a counterexample if it can find one.

SMT solvers are great at checking satisfiability in formulae in [first-order logic](https://en.wikipedia.org/wiki/First-order_logic). But since Tarka is a functional language, most interesting programs rely on recursion. For each recursive call, an inductive hypothesis is added to the solver, using the updated argument expression. For example, consider the following function:

  ```
(def (fibonacci n : Num) : Num (
	(requires (>= n 0))
	(ensures (>= result 0))
)
	(if (< n 2)
		n
		(+ (fibonacci (- n 1)) (fibonacci (- n 2)))
	)
)
```
  
The SMT solver will validate the following Tarka code by checking the satisfiability of everything in the first-order logic example along with two inductive hypotheses. Namely, it will check whether the preconditions `(>= (- n 1) 0)` and `(>= (- n 2) 0)` imply the postcondition, that the result is greater than or equal to zero.

This approach does allow users to formally verify that their code is correct as before, but there are a couple flaws. Firstly, it requires users to specify a sufficiently strong precondition to prove their postcondition. In the above example, only the first inductive hypothesis is necessary, but the VCG generates two. Similarly, there are many cases where the SMT solver cannot verify the implication of the postcondition despite the assertion being true. This is an inherent design flaw in a VCG and is difficult to overcome. Secondly, there is the distinction between partial and total correctness of a program. Currently, Tarka can only validate partial correctness of the above code, meaning that if the program terminates, the postcondition holds. If the base case of the recursion were removed, the program would still be verified as partially correct. Total correctness, which is necessary to verify that the program always runs as intended, is impossible to prove in general due to the [undecidability of the halting problem](https://en.wikipedia.org/wiki/Halting_problem). However, in practical software, the halting problem for most functions *is* decidable. In the future, I plan to add new annotations to allow the user to prove that a function terminates. For example, in the fibonacci function above, the user could assert that the function is decreasing and therefore must reach the base case.

I have a lot more ideas to improve my VCG and language, and I hope to extend it to a full Lisp dialect in the future. Technically, it isn't feature-rich enough yet to be a real dialect. For now, Tarka only has integers and booleans as types. However, it is Turing-complete! Unfortunately, I cannot yet share my code as it contains work I did in a college class on compilers, but I hope to rewrite and share it soon.
