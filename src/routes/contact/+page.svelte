<script>
	import linkedin from '$lib/images/linkedin.svg';
	import github from '$lib/images/github.svg';
</script>

<main>
	<div class="text-column">
		<h1>Contact</h1>

		<p>Get in touch!</p>

		<form action="https://formspree.io/f/xjvqazar" method="POST">
			<input type="text" name="name" placeholder="Name">
			<input type="email" name="email" placeholder="Email">
			<textarea  name="message" placeholder="Message" rows="5"></textarea>
			<div id="button-container">
				<button type="submit">Send</button>
				<a href="https://www.linkedin.com/in/ryan-kilpadi-b5742918a">LinkedIn</a>
				<a href="https://github.com/rkilpadi">GitHub</a>
			</div>
		</form>
	</div>
</main>

<style>
	main {
    display: flex;
    justify-content: flex-start;
  }

  form {
    max-width: 400px;
    margin: 0 auto;
	margin-top: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input,
  textarea {
	font: inherit;
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid var(--color-primary);
    border-radius: 4px;
    background-color: transparent;
	backdrop-filter: blur(7px);
	font-weight: bold;
	color: var(--color-primary);
  }

  textarea {
	color: var(--color-secondary);
  }

  button[type="submit"] {
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    border: none;
    border-radius: 4px;
    cursor: pointer;
	font-weight: bold;
  }

  #button-container {
	width: 90%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
  }
</style>
