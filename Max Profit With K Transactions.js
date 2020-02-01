/*
Max Profit With K Transactions

You are given an array of integers representing the prices of a single stock on various
days (each index in the array represents a different day). You are also given an integer k,
which represents the number of transactions you are allowed to make. One transaction consists
of buying the stock on a given day and selling it on another, later day. Write a function
that returns the maximum profit that you can make buying and selling the stock, given k
transactions. Note that you can only hold 1 share of the stock at a time; in other words,
you cannot buy more than 1 share of the stock on any given day, and you cannot buy a share
of the stock if you are still holding another share. Note that you also don't need to use all
k transactions that you're allowed.

Sample input: [5, 11, 3, 50, 60, 90], 2
Sample output: 93 (Buy: 5, Sell: 11; Buy: 3, Sell: 90)
*/

function maxProfitWithKTransactions(prices, k) {
  // Write your code here.
	function leftDerivate(i) {
		if (i>0) {
			return (prices[i] - prices[i-1])/2;
		} else {
			return 0;
		}
	}
	function rightDerivate(i) {
		if (i<prices.length -1) {
			return (prices[i+1] - prices[i])/2; 
		} else {
			-1;
		}
	}
	function isOperation(operation, i) {
		if (rightDerivate(i) > 0) {
			if ('localMax' === operation) return false;
			if (leftDerivate(i) > 0) {
				if ('localMin' === operation) return false;;
			} else {
				if ('localMin' === operation) return true;
			}
		} else {
			if ('localMin' === operation) return false;
			if (leftDerivate(i) > 0) {
				if ('localMax' === operation) return true;
			} else {
				if ('localMax' === operation) return false;
			}
		}
	}
	function isBuy(i) {
		return isOperation('localMin', i);
	}
	function isSell(i) {
		return isOperation('localMax', i);
	}
// debugging alg saving all transactions
// 	function transact(start, pastTransactions, currentTransaction) {
// 		const transactionsList = [];
// 		if (currentTransaction <= k) {
// 			for (let i = start; i < prices.length; i++) {
// 				if (isBuy(i)) {
// 					for (let j = i+1; j < prices.length; j++) {
// 						if (isSell(j)) {
// 							const t = pastTransactions.slice();
// 							t.push([prices[i],prices[j]]);
// 							transact(j+1, t, currentTransaction+1).forEach(t => transactionsList.push(t));
// 						}
// 					}
// 				}
// 			}
// 		}
// 		if (transactionsList.length === 0) {
// 			transactionsList.push(pastTransactions);
// 		}
// 		return transactionsList;
// 	}
// 	const profits = transact(0, [], 1).map(t => {
// 			let profit = 0;
// 			t.forEach(v => {
// 				profit += v[1] - v[0];
// 			})
// 			return profit;
// 	});
// 	return profits.length && profits.reduce((max,val) => val>max?val:max);
// performing alg keeping only profit
	function transact(start, pastProfit, currentTransaction) {
		let maxProfit = pastProfit;
		if (currentTransaction <= k) {
			for (let i = start; i < prices.length; i++) {
				if (isBuy(i)) {
					for (let j = i+1; j < prices.length; j++) {
						if (isSell(j)) {
							let profit = transact(j+1, pastProfit + (prices[j] - prices[i]), currentTransaction+1);
							if (profit > maxProfit) {
								maxProfit = profit;
							}
						}
					}
				}
			}
		}
		return maxProfit;
	}

	return transact(0, 0, 1);
}

// Do not edit the line below.
exports.maxProfitWithKTransactions = maxProfitWithKTransactions;
