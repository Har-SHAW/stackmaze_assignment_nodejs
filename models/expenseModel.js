const model = function(expense) {
    this.title = expense.title,
    this.date = expense.date,
    this.note = expense.note,
    this.amount = expense.amount
}

module.exports = model;