const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const firebase = require("../config/firebase");
const Expense = require("../models/expenseModel");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  firebase
    .collection("database")
    .get()
    .then((snapshot) => {
      var lst = [];
      snapshot.forEach((doc) => {
        var tmp = doc.data();
        tmp.id = doc.id;
        lst.push(tmp);
      });
      res.json(lst);
    })
    .catch(() => {
      res.statusCode(500);
      res.json({ status: false });
    });
});

router.post("/", (req, res) => {
  if (req.body) {
    const data = new Expense(req.body);
    firebase
      .collection("database")
      .add({
        title: data.title,
        date: data.date,
        note: data.note,
      })
      .then(() => {
        res.json({ status: true });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: false });
      });
  }
});

router.put("/:id", (req, res) => {
  if (req.body) {
    const data = new Expense(req.body);
    firebase
      .collection("database")
      .doc(req.params.id)
      .update({ title: data.title, date: data.date, note: data.note })
      .then(() => {
        res.json({ status: true });
      })
      .catch(() => {
        res.json({ status: false });
      });
  }
});

router.delete("/:id", (req, res) => {
  firebase
    .collection("database")
    .doc(req.params.id)
    .delete()
    .then(() => {
      res.json({ status: true });
    })
    .catch(() => {
      res.json({ status: false });
    });
});

module.exports = router;
