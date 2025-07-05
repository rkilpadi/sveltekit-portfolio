# The Math Behind Building a Neural Network From Scratch

When I was first learning about machine learning, I remember being told not to worry about the math behind the models I built. Now that I have a deeper background in math, I decided to take a look into the mathematical foundations of neural networks and try to build my own using only NumPy. This post will be math-heavy, but if you have an understanding of linear algebra and multivariable calculus, you'll understand why the logic behind neural networks essentially boils down to a minimization problem.

I took heavy inspiration from the [series by 3blue1brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi), which has great visual explanations for these concepts, and Michael Nielsen's book [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/). My focus here will be on the math, so this is will not be a good first introduction to neural networks. I highly recommend checking out those resources to gain a better conceptual understanding of the topic.

# The Basic Structure of a Neural Network

We will be training our simple model on the MNIST dataset, which classifies handwritten digits from 0-9. This is a classic task for machine learning, and any programmer would know that this is very hard to solve with a conventional program.

The neural network we will create will have an input layer of 784 nodes, each representing the grayscale value in a 28x28 image of a handwritten digit. The output layer will consist of 10 nodes, each representing a digit between 0-9. In between, we will add some hidden layers to allow the network to learn complex patterns.

The numerical value assigned to each node its **activation**. As we discussed earlier, the activation of a node in the input layer is simply determined by the input, such as the brightness of a pixel. For every other layer, each node is given a vector of **weights** and a **bias**. Every node has one weight for each node in the previous layer. 

Here is a class to represent a layer. All we need to know is the size of the current and previous layers, unless it is the input layer which has no weights or biases. Note that `weights` is a matrix where each entry represents of how each neuron in the current layer is affected by an activation in the previous layer.

```python
class Layer:
	def __init__(self, size, last_size):
	    self.size = size

        # This is the input layer
        if last_size is None:
            return

        # He initialization
        self.weights = np.random.randn(size, last_size) * np.sqrt(2 / last_size)
        self.biases = np.zeros(size)
```
To calculate the activation of the a given node, we sum the weighted activations of every node in the previous layer and add the bias as an offset. Finally, we need to pass this through an **activation function** to introduce some non-linearity to the network, allowing it to learn more complex patterns. We will be using ReLU (rectified linear unit), which is defined as $\max(0,x)$ and is a very standard activation function to use. This why I normalized each value in the `weights` matrix, called [He initialization](https://en.wikipedia.org/wiki/Weight_initialization#He_initialization), which pairs well with the unbounded ReLU function. Without proper initialization, we could run into the issue of exploding weights.

To summarize, the formula the network will use to calculate the activation of a single neuron is:

$$
a_i^l=\phi\left(\sum_j{w_{ij}^la^{l-1}_j+b_i^l}\right)
$$

It's easy to get lost in all this notation, but the formula is actually relatively simple. Keep in mind that the superscripts index layers, while the subscripts index nodes within the layer. The current layer is indexed by $i$, while the previous layer uses $j$. Here's a breakdown of what all of these variables mean:

- $a_i^l$ is the activation of the $i$th neuron in the $l$th layer, where $l>0$ (input layer activations are given)
- $b^l_i$ is the bias for the neuron
- $w_{ij}^l$ is the weight that the neuron places on the $j$th node in the previous layer
- $a_j^{l-1}$ is the activation of the $j$th node in the previous layer
- $\phi$ is the activation function (in our case, ReLU)

We can also write a formula for the entire vector of activations in the $l$th layer with matrix multiplication. This is why GPUs, which are great at matrix multiplication, are so valuable for machine learning. Note that $\mathbf{W}^l$ is a matrix of weights that was indexed in the above equation.

$$
\mathbf{a}^l=\phi(\mathbf{W}^l\mathbf{a}^{l-1}+\mathbf{b}^l)
$$

This calculation can be done in a single line of code (assuming we have defined ReLU):

```python
layer.activation = relu(layer.weights @ prev_layer.activations + layer.biases)
```

# Evaluation

To actually train the model, we need to evaluate the accuracy of the network's outputs so that we can adjust our weights and biases accordingly. This is where the cost function (or loss function) comes in. A common cost function to use for classification problems is cross entropy loss, also known as log loss. For our case, where there is only one correct output, this function is simply defined as

 $$
 C(\mathbf{a}^L)=-\ln a^L_c
 $$ 
 
 where $a_c^L$ is the activation of the expected result in the output layer and $0<a_c^L\leq1$.

Cross entropy loss pairs well with the softmax activation function, which we will be using instead of ReLU on the last layer. This is because softmax normalizes values between 0 and 1 (they will also work together to make the math work out nicely later). Softmax takes a vector of values and converts them to a probability distribution. We will pick the largest value to be the model's "guess" as to which digit it thinks the input is.

If this were the output layer of a neural network, the second element (or node) would be its "guess" as to which category to put it in, and the loss would be $-\ln 0.8\approx 0.22$. As a sanity check, if the expected result has an activation approaching $1$, this means that our network has high confidence that this is the correct answer, and we expect the cost function to be very small:

$$
\lim_{x\rightarrow 1}(-\ln x)=0
$$

Conversely, if the activation is close to $0$, then the network was very wrong and the loss should be high:

$$
\lim_{x\rightarrow 0}(-\ln x)=\infty
$$

The cost function that evaluates the model will be critical to improve it.

# Training and Backpropagation Calculus 

To actually train the network, we need shift our weights and biases based on the result of our cost function. To do this, let's think about what the cost function actually is.

We can think of the neural network as a function that takes all its input activations (in our case, 784 of them) and outputs 10 probabilities of possible results. The cost function takes this neural network as an input, and returns its cost, which is a measure of how inaccurate the network is. We would like to minimize this function to make the network better. Multivariable calculus tells us that we can find the gradient of any differentiable function, including our cost function. We can then move in the negative direction of the gradient to go downwards to find a local minimum in the cost function. In this blog post, we will move down the gradient of our cost function for every training example we pass through the network. This is called **stochastic gradient descent**. This method allows us to calculate the direction in which we want to tweak our weights and biases to minimize the cost function and improve our model. Of course, this doesn't necessarily lead to a global minimum, and our model could get trapped in a suboptimal solution, but that's a problem for another time.

To calculate the gradient of the cost function, we need to find the partial derivative of every input of the function. The cost function $C(\mathbf{a}^L)$ obviously depends explicitly on the activations in the output layer, $\mathbf{a}^L$. However, implicitly, the activations of the output layer depend on its weights and biases, as well as the activations of the second to last layer $L-1$. Furthermore, the activations of the second to last layer, $\mathbf{a}^{L-1}$, depend on the weights and biases in layer $L-1$ as well as the activations of layer $L-2$. So the cost function is an extremely high dimensional function whose inputs are every single weight and bias in the network. We can see this visually by recursively expanding the equation for a single neuron's activation:

 
 $$
 C=
 -\ln a^L_i=
  -\ln\left(\phi\left(\sum_j{w_{ij}^La^{L-1}_j+b_i^L}\right)\right)=
 -\ln\left(\phi\left(\sum_j{w_{ij}^L\cdot\phi\left(\sum_k{w_{jk}^{L-1}a^{L-2}_k+b_j^{L-1}}\right)+b_i^L}\right)\right) =...
$$

This expansion illustrates why finding the partial derivative with respect to a weight or bias in one of the first layers of the network is difficult. All these nested function applications would lead to a nasty chain rule calculation. However, finding the partial derivative of a bias in the output layer, for example, is much easier. Let's start there. Applying the chain rule, we have

$$
\frac{\partial C}{\partial b_i^L}=
\frac{\partial z^L_i}{\partial b^L_i}\cdot
\frac{\partial a^L_i}{\partial z^L_i}\cdot
\frac{\partial C}{\partial a^L_i}
$$

where $z^L_i$ is the value obtained before applying the activation function $\phi$, sometimes known as the preactivation. Again, this is simply the chain rule. Following the chain, the cost is a function of the activation $a^L_i$, which is a function of the preactivation $z^L_i$, which is a function of the bias $b^L_i$. All of these partials are computable!

As I said before, the softmax activation function and cross entropy cost function work out nicely together. Take my word for it for now, but if you're interested, check out the derivation at the end of this post. We have

$$
\frac{\partial C}{\partial z_i^L}=
\frac{\partial a_i^L}{\partial z_i^L}\cdot
\frac{\partial C}{\partial a_i^L}=
a_i^L-y_i
$$

where $y_i$ is the expected value of the $i$th output node, so $y_i=1$ if $i=c$ (the index of the correct digit) and $y_i=0$ otherwise. In code, the partial with respect the the entire vector of preactivations is:
```python
target = np.zeros(output_layer.size)
target[label] = 1
grad_z = output_layer.activation - target
```

Since the bias is added as a linear term to calculate the preactivation,

$$
\frac{\partial z^L_i}{\partial b^L_i}=1.
$$

Finally, the partial derivative with respect to the bias is

$$
\frac{\partial C}{\partial b_i^L}=
\frac{\partial z^L_i}{\partial b^L_i}\cdot
\frac{\partial C}{\partial z^L_i}=
a_i^L-y_i
$$

which happens to be the same as `grad_z`. This means that subtracting our bias by something proportional to this value on every training example will cause a decrease in the output of the cost function. In other words, we are improving our model! But this is only one of many hundreds or thousands of weights and biases that we can tweak to minimize the cost function further. Since we already did the calculations for one bias, let's keep thinking about biases. If you understand the calculation above, it shouldn't be too hard to see that for any layer, the partial derivative of its vector of biases is

$$
\frac{\partial C}{\partial \mathbf{b}^l}=
\frac{\partial C}{\partial \mathbf{z}^l}\cdot
\frac{\partial \mathbf{z}^l}{\partial \mathbf{b}^l}=
\frac{\partial C}{\partial \mathbf{z}^l}.
$$

The math is correct, but we have a problem. We need to find a way to compute this partial for any layer that isn't the output layer, or $l<L$. We can solve this by writing a recursive formula for this partial in terms of $\frac{\partial C}{\partial \mathbf{z}^{l+1}}$, with the base case being the partial we know at layer $L$. Again, using the chain rule, we have

$$
\frac{\partial C}{\partial \mathbf{z}^l}=
\frac{\partial C}{\partial \mathbf{z}^{l+1}}\cdot
\frac{\partial \mathbf{z}^{l+1}}{\partial \mathbf{a}^{l}}\cdot
\frac{\partial \mathbf{a}^l}{\partial \mathbf{z}^l}=
\frac{\partial C}{\partial \mathbf{z}^{l+1}}\cdot
\mathbf{W}^{l+1}\cdot
\phi'(\mathbf{z}^l)
$$

```python
grad_z = (layer.weights.T @ grad_z) * (prev_layer.preactivation > 0)
```

Note that the derivative of ReLU is simply $0$ for negative inputs and $1$ for positive inputs. To see where this comes from, pause and think about the chain rule and partial derivatives, referring back to this formula:

$$
\mathbf{a}^l=\phi(\mathbf{W}^l\mathbf{a}^{l-1}+\mathbf{b}^l)
$$

This is how **backpropagation**, the algorithm used to implement gradient descent, gets its name. In practice, we will start from the base case ($l=L$, the outer layer), and work backwards to calculate the direction we need to tweak our weights and biases in the earlier layers.

Now that we have a formula for $\frac{\partial C}{\partial \mathbf{z}^l}$, we have everything we need to calculate the partial derivatives with respect to our weights. Note that we use the outer product, as the weights must be a matrix:

$$
\frac{\partial C}{\partial \mathbf{W}^l}=
\frac{\partial C}{\partial \mathbf{z}^l}\cdot
\frac{\partial \mathbf{z}^l}{\partial \mathbf{W}^l}=
\frac{\partial C}{\partial \mathbf{z}^l}
\otimes\mathbf{a}^{l-1}
$$

```python
layer.grad_w = np.outer(grad_z, prev_layer.activation)
```

We have already established that the partial with respect to our biases is just `grad_z`:

```python
layer.grad_b = grad_z
```

On every training example, we will work backwards to calculate every component of the gradient with these formulae and update our weights and biases accordingly. We will multiply each step by a small learning rate, so the steps we take aren't too large.

```python
layer.weights -= self.learning_rate * layer.grad_w
layer.biases -= self.learning_rate * layer.grad_b
```

# Result

After running my model with two hidden layers with 200 neurons each over 3 epochs, I was able to achieve 97% accuracy on MNIST. Not bad for under 100 lines of code! Try it yourself over the [MNIST](http://yann.lecun.com/exdb/mnist/) dataset of digits or whatever else you'd like. Remember to normalize inputs between 0 and 1.

```python
import numpy as np

class NeuralNetwork:

    class Layer:
        def __init__(self, size, last_size):
            self.size = size

            # This is the input layer
            if last_size is None:
                return

            # He initialization
            self.weights = np.random.randn(size, last_size) * np.sqrt(2 / last_size)
            self.biases = np.zeros(size)

    def __init__(self, layer_sizes, learning_rate=0.01):
        if len(layer_sizes) < 2 or any(n <= 0 for n in layer_sizes):
            raise ValueError(f"At least 2 positive layer sizes required. {len(layer_sizes)} provided.")

        self.learning_rate = learning_rate
        self.num_incorrect = 0
        self.total = 0
        self.layers = []

        last = None
        for size in layer_sizes:
            self.layers.append(self.Layer(size, last))
            last = size

    @staticmethod
    def softmax(z):
        exp_z = np.exp(z - np.max(z))
        return exp_z / np.sum(exp_z)

    @staticmethod
    def relu(z):
        return np.maximum(0, z)

    def _forward_pass(self, input):
        self.layers[0].activation = input

        for i in range(1, len(self.layers)):
            layer = self.layers[i]
            prev_layer = self.layers[i - 1]
            layer.preactivation = layer.weights @ prev_layer.activation + layer.biases
            if i == len(self.layers) - 1:
                layer.activation = self.softmax(layer.preactivation)
            else:
                layer.activation = self.relu(layer.preactivation)

    def infer(self, input, label):
        self._forward_pass(input)
        guess = np.argmax(self.layers[-1].preactivation)

        self.total += 1
        emoji = '✅'
        if not label == guess:
            self.num_incorrect += 1
            emoji = '❌'
        accuracy = (1 - self.num_incorrect / self.total) * 100
        print(f"Expected: {label} | Actual: {guess} | Accuracy: {accuracy}% {emoji}")

    def train(self, input, label):
        self._forward_pass(input)

        output_layer = self.layers[-1]
        target = np.zeros(output_layer.size)
        target[label] = 1
        print('Loss:', -np.log(output_layer.activation[label] + 1e-9))  # cross-entropy

        grad_z = output_layer.activation - target
        for i in range(len(self.layers) - 1, 0, -1):
            layer = self.layers[i]
            prev_layer = self.layers[i - 1]

            layer.grad_w = np.outer(grad_z, prev_layer.activation)
            layer.grad_b = grad_z

            if i > 1:
                grad_z = (grad_z @ layer.weights) * (prev_layer.preactivation > 0)

        for i in range(1, len(self.layers)):
            layer = self.layers[i]
            layer.weights -= self.learning_rate * layer.grad_w
            layer.biases -= self.learning_rate * layer.grad_b
```

# Appendix: Why Softmax Pairs with Cross Entropy Loss

Our cost function, cross entropy loss is defined:

$$
C(\mathbf{a})=-\sum_i y_i\ln a_i=-\ln a_c.
$$

In our case, the vector of expected output activations $\mathbf{y}$ is one-hot encoded. This just means that component representing the correct answer (index $c$) is $1$, while all the others are $0$. So all cases where $i\neq c$ will be $0$. This is why we can conveniently remove the sum.

Now consider the softmax function, which is our activation function for the last layer. Each component of the resulting vector is given by

$$
\sigma(\mathbf{z})_i=\frac{e^{z_i}}{\sum_j e^{z_j}}=a_i.
$$

Considering both of these functions together, we can calculate $\frac{\partial C}{\partial z_i}$ for the output layer (I will omit the superscript). Since $\frac{\partial C}{\partial a_i}$ has a nonzero derivative only when $i=c$, we have

$$
\frac{\partial C}{\partial z_i}=
\sum\frac{\partial C}{\partial a_i}\cdot
\frac{\partial a_i}{\partial z_i}=
\frac{\partial C}{\partial a_c}\cdot
\frac{\partial a_c}{\partial z_i}=
-\frac{1}{a_c}\cdot
\frac{\partial a_c}{\partial z_i}.
$$

Now we have two cases. If $i=c$
$$
\frac{\partial a_c}{\partial z_c}=
\frac{\partial}{\partial z_c}
\left(\frac{e^{z_c}}{\sum_j e^{z_j}}\right)=
\frac{e^{z_c}\sum_j e^{z_j}-e^{z_c}e^{z_c}}{\left(\sum_j e^{z_j}\right)^2}=
\frac{e^{z_c}}{\sum_j e^{z_j}}-\frac{(e^{z_c})^2}{\left(\sum_j e^{z_j}\right)^2}=
a_c-a_c^2
$$
and
$$
\frac{\partial C}{\partial z_i}=
\frac{\partial C}{\partial a_c}\cdot
\frac{\partial a_c}{\partial a_c}=
-\frac{1}{a_c}(a_c-a_c^2)=
a_c-1.
$$

Otherwise, if $i\neq c$

$$
\frac{\partial a_c}{\partial z_i}=
\frac{\partial}{\partial z_i}
\left(\frac{e^{z_c}}{\sum_j e^{z_j}}\right)=
\frac{-e^{z_i}e^{z_c}}{\left(\sum_j e^{z_j}\right)^2}=
\frac{e^{z_i}}{\sum_j e^{z_j}}\cdot\frac{e^{z_c}}{\sum_j e^{z_j}}=
-a_ia_c
$$
and
$$
\frac{\partial C}{\partial z_i}=
\frac{\partial C}{\partial a_c}\cdot
\frac{\partial a_c}{\partial a_i}=
-\frac{1}{a_c}(a_ia_c)=
a_i.
$$

For both cases, we have
$$
\frac{\partial C}{\partial z_i}=a_i-y_i.
$$
