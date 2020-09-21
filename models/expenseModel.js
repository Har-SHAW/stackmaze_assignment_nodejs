const model = function(expense) {
    this.title = expense.title,
    this.date = expense.date,
    this.note = expense.note
}

module.exports = model;