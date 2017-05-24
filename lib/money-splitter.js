module.exports = function() {
	/**
	 * Divides the total as equally as possible by count.
	 * @param {Number} total The total to split.
	 * @param {Number} count The number of partitions to make.
	 * @return {Number[]} The resulting partitions.
	 */
	function split(total, count) {
		const partitions = splitTotal(total, count);
		const validatedPartitions = validateTotal(total, partitions);

		console.log(partitions);
		console.log(validatedPartitions);

		return validatedPartitions;
	}

	/**
	 * Splits the total into x number of equivalent partitions.
	 * @param {Number} total The total to split.
	 * @param {Integer} count The number of partitions to make.
	 * @return {Number[]} The resulting equivalent partitions.
	 */
	function splitTotal(total, count) {
		// convert count to an integer
		count = Math.round(count);

		// find the value of total / count and round to nearest hundredth
		const result = total / count;
		const rounded = Math.ceil(result * 100) / 100;

		// populate array with rounded values
		const partitions = [];
		for (let i = 0, len = count; i < len; i++) {
			partitions.push(rounded);
		}

		return partitions;
	}

	/**
	 * Adds/subtracts pennies from each partition until sum equals the total.
	 * @param {Number} total The amount the partitions' sum must equal.
	 * @param {Number[]} items The partitions.
	 * @return {Number[]} The resulting partitions modified to equal the total.
	 */
	function validateTotal(total, partitions) {
		// multiply total and partitions by 100 to avoid floating precision issues
		total = Math.round(total * 100);

		let sum = 0;

		// copy array so we don't modify original
		const partitionsCopy = [];
		partitions.forEach(item => {
			const value = Math.round(item * 100);

			partitionsCopy.push(value);
			sum += value;
		});

		// add/subtract a penny to/from each item until the sum equals the total
		while(sum != total) {
			for (let i = 0, len = partitionsCopy.length; i < len; i++) {
				if (sum > total) {
					partitionsCopy[i] -= 1;
					sum -= 1;
				} else if (sum < total) {
					partitionsCopy[i] += 1;
					sum += 1;
				} else {
					break;
				}
			}
		}

		// convert items back into decimals rounded to the nearest hundredth
		for (let i = 0, len = partitionsCopy.length; i < len; i++) {
			partitionsCopy[i] /= 100;
		}

		return partitionsCopy;
	}

	return {
		split: split,
		splitTotal: splitTotal,
		validateTotal: validateTotal
	};
};
