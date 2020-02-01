/*
Nth Fibonacci

The Fibonacci sequence is defined as follows: the first number of the sequence is 0,
the second number is 1, and the nth number is the sum of the (n - 1)th and (n - 2)th numbers.
Write a function that takes in an integer n and returns the nth Fibonacci number.

Important note: the Fibonacci sequence is often defined with its first 2 numbers as F0 = 0 and F1 = 1.
For the purpose of this question, the first Fibonacci number is F0; therefore,
getNthFib(1) is equal to F0, getNthFib(2) is equal to F1, etc..

Sample input #1: 2
Sample output #1: 1 (0, 1)
Sample input #2: 6
Sample output #2: 5 (0, 1, 1, 2, 3, 5)
*/

function getNthFib(n) {
  // Write your code here.
	if (n == 1) return 0;
	if (n == 2) return 1;
	let prev = 1;
	let prevprev = 0;
	for (let i = 3; i<n; i++) {
		let t = prev+prevprev;
		prevprev = prev;
		prev = t;
	}
	return prevprev + prev;
}

// Do not edit the line below.
exports.getNthFib = getNthFib;
