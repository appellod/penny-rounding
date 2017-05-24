const chai = require("chai");
const expect = chai.expect;

const moneySplitter = require("../../lib/money-splitter")();

describe("lib/money-splitter.js", function() {
	describe("splitTotal()", function() {
		it("splits 3 into 2 equal values of 1.5", function() {
			const results = moneySplitter.splitTotal(3, 2);

			results.forEach(result => {
				expect(result).to.eq(1.5);
			});
		});

		it("splits 4 into 4 equal values of 1", function() {
			const results = moneySplitter.splitTotal(4, 4);

			results.forEach(result => {
				expect(result).to.eq(1);
			});
		});

		it("splits 5 into 3 equal values of 1.67", function() {
			const results = moneySplitter.splitTotal(5, 3);

			results.forEach(result => {
				expect(result).to.eq(1.67);
			});
		});

		it("splits 6 into 10 equal values of 1.67", function() {
			const results = moneySplitter.splitTotal(6, 10);

			results.forEach(result => {
				expect(result).to.eq(0.6);
			});
		});
	});

	describe("validateTotal()", function() {
		context("when sum equals total", function() {
			it("returns the original values", function() {
				const items = [];
				const item = 2;
				for (let i = 0; i < 4; i++) {
					items.push(item);
				}

				const results = moneySplitter.validateTotal(8, items);

				results.forEach(result => {
					expect(result).to.eq(2);
				});
			});
		});

		context("when sum is less than the total", function() {
			it("returns the correct values", function() {
				const items = [];
				const item = 2;
				for (let i = 0; i < 4; i++) {
					items.push(item);
				}

				const results = moneySplitter.validateTotal(10, items);

				results.forEach(result => {
					expect(result).to.eq(2.5);
				});
			});
		});

		context("when sum is greater than the total", function() {
			it("returns the correct values", function() {
				const items = [];
				const item = 12;
				for (let i = 0; i < 4; i++) {
					items.push(item);
				}

				const results = moneySplitter.validateTotal(5, items);

				results.forEach(result => {
					expect(result).to.eq(1.25);
				});
			});
		});
	});

	describe("split()", function() {
		it("splits a total of 800 into 3 roughly equivalent partitions", function() {
			const results = moneySplitter.split(800, 3);

			expect(results[0]).to.eq(266.66);
			expect(results[1]).to.eq(266.67);
			expect(results[2]).to.eq(266.67);
		});

        it("splits a total of 0.85 into 3 roughly equivalent partitions", function() {
			const results = moneySplitter.split(0.85, 3);

			expect(results[0]).to.eq(0.28);
			expect(results[1]).to.eq(0.28);
			expect(results[2]).to.eq(0.29);
		});

        it("splits a total of 0.58 into 4 roughly equivalent partitions", function() {
			const results = moneySplitter.split(0.58, 4);

			expect(results[0]).to.eq(0.14);
			expect(results[1]).to.eq(0.14);
			expect(results[2]).to.eq(0.15);
            expect(results[3]).to.eq(0.15);
		});
	});
});
