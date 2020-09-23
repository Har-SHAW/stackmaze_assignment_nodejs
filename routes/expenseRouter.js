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
      res.status(500);
      res.json({ status: false });
    });
});

router.post("/", (req, res) => {
  if (req.body) {
    const secret = process.env.SECURITY_KEY;

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if (
      req.headers["react-signature"] &&
      digest === req.headers["react-signature"]
    ) {
      const data = new Expense(req.body);
      firebase
        .collection("database")
        .add({
          title: data.title,
          date: data.date,
          note: data.note,
          amount: data.amount,
        })
        .then(() => {
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
              res.status(500);
              res.json({ status: false });
            });
        })
        .catch(() => {
          res.status(500);
          res.json({ status: false });
        });
    } else {
      res.status(500);
      res.json({ status: false, msg: "intigrity checksum not satisfied" });
    }
  }
});

router.put("/:id", (req, res) => {
  if (req.body) {
    const secret = process.env.SECURITY_KEY;

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if (
      req.headers["react-signature"] &&
      digest === req.headers["react-signature"]
    ) {
      const data = new Expense(req.body);
      firebase
        .collection("database")
        .doc(req.params.id)
        .update({
          title: data.title,
          date: data.date,
          note: data.note,
          amount: data.amount,
        })
        .then(() => {
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
              res.status(500);
              res.json({ status: false });
            });
        })
        .catch(() => {
          res.status(500);
          res.json({ status: false });
        });
    } else {
      res.status(500);
      res.json({ status: false, msg: "intigrity checksum not satisfied" });
    }
  }
});

router.delete("/:id", (req, res) => {
  firebase
    .collection("database")
    .doc(req.params.id)
    .delete()
    .then(() => {
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
          res.status(500);
          res.json({ status: false });
        });
    })
    .catch(() => {
      res.status(500);
      res.json({ status: false });
    });
});

module.exports = router;
