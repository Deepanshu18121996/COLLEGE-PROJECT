const express = require("express");
const router = express.Router();
const sell_account = require("../Db/sell_account");
const req_second_book = require("../Db/req_second_book");
const second_book = require("../Db/second_book");
const second_books_category = require("../Db/second_category");
const add_books_category = require("../Db/Addbookscategory");
const admin = require("../Db/admin");
const science = require("../Db/books_category/science");
const history = require("../Db/books_category/history");
const action_adventure = require("../Db/books_category/action and adventure");
const biographies = require("../Db/books_category/biographies");
const children = require("../Db/books_category/children");
const drama_comics = require("../Db/books_category/drama and comics");
const horror = require("../Db/books_category/horror");
const math = require("../Db/books_category/math");
const poetry = require("../Db/books_category/poetry");
const tech = require("../Db/books_category/tech");
const travel = require("../Db/books_category/travel");
const business = require("../Db/books_category/business");
const sports = require("../Db/books_category/sports");
const health_fitness = require("../Db/books_category/health and fitness");
const user_account = require("../Db/user_account");
const user_cart = require("../Db/cart");
const user_wishlist = require("../Db/wishlist");
const user_order = require("../Db/order");
const multer = require("multer");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let DIR = "./server_images";
const multerN = require("multer");
let NDIR = "./notes_data";
const notes_category = require("../Db/Notes_category");
const notes_Req = require("../Db/Notes_request");
const notes_Save = require("../Db/Notes_saved");
const books_Req = require("../Db/book_request");
const path = require("path");
/*================= Code block for data uploading of notes ==========================*/
let storageN = multerN.diskStorage({
  destination: function (req, file, cb) {
    cb(null, NDIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
let uploadN = multerN({storage: storageN}).single("File");

/*======================= Code block for muler for image uploading of a books ==============================*/
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
let upload = multer({storage: storage}).single("Image");

/*=====================================Code block for node mailer host================================== */
var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "host",
  port: 25,
  secure: false,
  auth: {
    user: "freebookstoreitg@gmail.com",
    pass: "fcoxlamdnoyialhv",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//middlewere function to check token is null or not
function verfytoken(req, res, next) {
  let temptoken = req.body.token;
  if (temptoken !== "null") {
    req.token = temptoken;
    next();
  } else {
    res.json({errr: 1, "u dont have token": 1});
  }
}

//========================this route is for admin login================================//
router.post("/api/admin_login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const pass = bcrypt.hashSync(password, 10);
  admin.findOne({email: email}, (err, data) => {
    if (err || data == null) {
      res.json({msg: "you are not admin", err: "account"});
    } else {
      bcrypt.compare(password, data.password, function (err, pdata) {
        const utoken = {
          email: data.email,
          name: data.name,
          password: data.password,
        };
        if (pdata == false) {
          res.json({msg: "password not Match", err: "pass"});
        } else {
          jwt.sign({utoken}, "secretkey", function (err, token) {
            if (err) {
              res.json({err: "jwt", msg: "jwt"});
            } else {
              res.json({token: token, email: email});
            }
          });
        }
      });
    }
  });
});

/*===================== This api route is for save a category in database =========================*/
router.post("/api/addbookscategory", function (req, res) {
  const category = req.body.category;
  let ins = new add_books_category({category: category});
  ins.save(function (err) {
    if (err) {
      res.json({err: 1, msg: "some error"});
    } else {
      res.json({err: 0, msg: "save"});
    }
  });
});

/*================= this route is for fatch a category ==================== */
router.get("/api/getcategory", function (req, res) {
  add_books_category.find({}, function (err, data) {
    if (err) {
      res.json({err: 1, data: "some error is occur to fatch category"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

/*============This route is for delete a category========================== */
router.post("/api/delete_category", function (req, res) {
  const delete_cat_name = req.body.category;
  add_books_category.deleteOne({category: delete_cat_name}, function (err) {
    if (err) {
      res.json({err: 1, msg: "already delete"});
    } else {
      res.json({err: 0, msg: "delete"});
    }
  });
});

/* this route is for save books according to their category */
router.post("/api/new_books_save", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({err: err});
    } else {
      let name = req.body.name;
      let Category = req.body.category;
      let Price = req.body.price;
      let Writer = req.body.writer;
      let Edition = req.body.edition;
      let Published_year = req.body.published_year;
      let current_Price = req.body.current_price;
      let Image = req.file.filename;
      switch (Category) {
        case "science":
          let ins = new science({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          ins.save(function (err) {
            if (err) {
              res.json({err: 2, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "science"});
            }
          });
          break;

        case "math":
          let math_books = new math({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          math_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "science"});
            }
          });
          break;

        case "drama and comics":
          let drama_comics_books = new drama_comics({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          drama_comics_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "drama and comics"});
            }
          });
          break;

        case "action and adventure":
          let action_adventure_books = new action_adventure({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          action_adventure_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "action and adventure"});
            }
          });
          break;

        case "horror":
          let horror_books = new horror({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          horror_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "horror"});
            }
          });
          break;

        case "travel":
          let travel_books = new travel({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          travel_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "travel"});
            }
          });
          break;

        case "children":
          let children_books = new children({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          children_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "children"});
            }
          });
          break;

        case "biographies":
          let biographies_books = new biographies({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          biographies_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "Biographies"});
            }
          });
          break;

        case "history":
          let history_books = new history({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          history_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "history"});
            }
          });
          break;

        case "business":
          let business_books = new business({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          business_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "business"});
            }
          });
          break;

        case "tech":
          let tech_books = new tech({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          tech_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "tech"});
            }
          });
          break;

        case "sports":
          let sports_books = new sports({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          sports_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "sports"});
            }
          });
          break;

        case "health and fitness":
          let health_fitness_books = new health_fitness({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          health_fitness_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "health and fitness"});
            }
          });
          break;

        case "poetry":
          let poetry_books = new poetry({
            name: name,
            category: Category,
            price: Price,
            writer: Writer,
            edition: Edition,
            published_year: Published_year,
            current_price: current_Price,
            image: Image,
          });
          poetry_books.save(function (err) {
            if (err) {
              res.json({err: 1, msg: "some error"});
            } else {
              res.json({err: 0, msg: "save", cat: "poetry"});
            }
          });
          break;

        default:
          res.json({err: 1, category: "cat not find"});
      }
    }
  });
});

/*This route is for to get books details */
router.get("/api/get_books_details/:data", function (req, res) {
  const cat_name = req.params.data;

  switch (cat_name) {
    case "science":
      science.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "math":
      math.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "action and adventure":
      action_adventure.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;
    case "biographies":
      biographies.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "business":
      business.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "children":
      children.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "drama and comics":
      drama_comics.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "health and fitness":
      health_fitness.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "history":
      history.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "horror":
      horror.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "poetry":
      poetry.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "sports":
      sports.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    case "tech":
      tech.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;
    case "travel":
      travel.find({}, function (err, data) {
        if (err) {
          res.json({err: 1, data: "seome erroe is occur to fatch category"});
        } else {
          res.json({err: 0, data: data});
        }
      });
      break;

    default:
      res.json({
        err: 1,
        msg: "category not found in database or in switch case",
      });
  }
});

/*This route is for delete a books */
router.get("/api/delete_books_details/:id/:cat", function (req, res) {
  const Id = req.params.id;
  const category = req.params.cat;
  switch (category) {
    case "science":
      science.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1, msg: "already delete Refresh"});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "action and adventure":
      action_adventure.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "biographies":
      biographies.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "business":
      business.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "children":
      children.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "drama and comics":
      drama_comics.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "health_fitness":
      health_fitness.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "history":
      history.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "horror":
      horror.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "math":
      math.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "poetry":
      poetry.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "sports":
      sports.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "tech":
      tech.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    case "travel":
      travel.deleteOne({_id: Id}, function (err) {
        if (err) {
          res.json({err: 1});
        } else {
          res.json({err: 0, msg: "delete"});
        }
      });
      break;

    default:
      res.json({err: 1, msg: "cat not find"});
  }
});

/*This route is for verify email sending mail */
router.post("/api/create_user", function (req, res) {
  const uemail = req.body.email;
  const temp = function () {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  const pin = temp();
  var mailOptions = {
    from: "mohmadsabban123@gmail.com",
    to: uemail,
    subject: "Books_Stor.com",
    html: ` <h1  style="color:#e59285" >Welcome to Bookstor !</h1>
    <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer.</p>
    <p style="font-size:18px; font-weight: 300;color:black;">To register your account in our website, Please enter this private otp<span style="font-size:20px; font-weight: 400;color:blue;"> ${pin}</span></p>
    <h1 style="color:black;font-size:25px; font-weight: 600"> Please don't share your otp with anyone else.</h1>`,
  };
  user_account.findOne({email: uemail}, (err, data) => {
    if (data != null) {
      res.json({err: 1, msg: "already found"});
    } else {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({err: 2, email: "not a valid email"});
        } else {
          res.json({err: 0, email: "mailsend", pin: pin});
        }
      });
      transporter.close();
    }
  });
});

/*THis is jwt route and save data */
router.post("/api/auth_user", function (req, res) {
  const uname = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const contact = req.body.contact;
  const address = req.body.address;
  const pincode = req.body.pincode;
  const state = req.body.state;
  const pass = bcrypt.hashSync(password, 10);
  const utoken = {email: email, name: uname, password: pass};
  let user = new user_account({
    name: uname,
    email: email,
    password: pass,
    contact: contact,
    address: address,
    pincode: pincode,
    state: state,
  });
  user.save(function (err) {
    if (err) {
      res.json({err: "db", msg: "some error", data: err});
    } else {
      jwt.sign({utoken}, "secretkey", function (err, token) {
        if (err) {
          res.json({err: "jwt", msg: "jwt"});
        } else {
          res.json({token: token, email: email});
        }
      });
    }
  });
});

/*=====THis route is for showing a best seller books in front end */
router.get("/api/best_seller", function (req, res) {
  science.find({}, function (err, data) {
    if (err) {
      res.json({err: 1, data: "seome erroe is occur to fatch category"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

/*This route is for login */
router.post("/api/login", function (req, res) {
  const email = req.body.email;
  const contact = req.body.contact;
  const password = req.body.password;
  user_account.findOne({email: email, contact: contact}, function (err, data) {
    if (err) {
      res.json({err: "404", data: "Account not found"});
    } else if (data == null) {
      res.json({err: "404", msg: "account not found"});
    } else {
      bcrypt.compare(password, data.password, function (err, pdata) {
        const utoken = {
          email: data.email,
          name: data.name,
          password: data.password,
        };
        if (pdata == false) {
          res.json({err: "notmatch", msg: "not match"});
        } else {
          jwt.sign({utoken}, "secretkey", function (err, token) {
            if (err) {
              res.json({err: "jwt", msg: "jwt"});
            } else {
              res.json({token: token, email: email});
            }
          });
        }
      });
    }
  });
});

/*This route is for to check mail and send otp */
router.post("/api/forget_pass", function (req, res) {
  let mail = req.body.email;
  user_account.findOne({email: mail}, function (err, data) {
    if (err) {
      res.json({err: "404", msg: "account not found"});
    } else if (data == null) {
      res.json({err: "404", msg: "account not found"});
    } else {
      const temp = function () {
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };
      const pin = temp();
      var mailOptions = {
        from: "mohmadsabban123@gmail.com",
        to: mail,
        subject: "Books_Stor.com",
        html: `<h1  style="color:#e59285">Welcome to Bookstor !</h1>
        <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer</p>
    <p style="font-size:18px; font-weight: 300;color:black;">To register your account in our website, 
    Please enter this private otp<span style="font-size:20px; font-weight: 400;color:blue;"> ${pin}</span></p>
    <h1 style="color:black;font-size:25px; font-weight: 600"> Please don't share your otp with anyone else.</h1>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({err: "404", email: "not a valid email"});
        } else {
          res.json({err: 0, email: mail, pin: pin});
        }
      });
      transporter.close();
    }
  });
});

/*This route is for set new password */
router.post("/api/update_password", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const pass = bcrypt.hashSync(password, 10);
  user_account.updateOne({email: email}, {$set: {password: pass}}, function (
    err,
    data
  ) {
    if (err) {
      res.json({err: "404"});
    } else if (data.ok == 0) {
      res.json({err: "404"});
    } else {
      res.json({err: 0});
    }
  });
});

/*This route is for save cart item */
router.post("/api/cart_data", verfytoken, function (req, res) {
  const name = req.body.name;
  const image = req.body.image;
  const writer = req.body.writer;
  const price = req.body.price;
  const email = req.body.email;
  const key = name + email;
  const quantity = req.body.quantity;
  jwt.verify(req.token, "secretkey", function (err) {
    if (err) {
      res.json({err: "token_error"});
    } else {
      let cart = new user_cart({
        email: email,
        name: name,
        current_price: price,
        image: image,
        writer: writer,
        key: key,
        quantity: quantity,
      });

      cart.save(function (err, data) {
        if (err) {
          res.json({err: 1, msg: "connection error"});
        } else {
          res.json({err: 0, msg: "add", data: data});
        }
      });
    }
  });
});

/*This route is for save wishlist item */
router.post("/api/wishlist_data", verfytoken, function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const price = req.body.price;
  const key = name + email; // Make a unique key
  const image = req.body.image;
  const writer = req.body.writer;
  jwt.verify(req.token, "secretkey", err => {
    if (err) {
      res.json({err: 1, msg: "token err"});
    } else {
      let user = new user_wishlist({
        email: email,
        key: key,
        name: name,
        price: price,
        writer: writer,
        image: image,
      });
      user.save((err, data) => {
        if (err) {
          res.json({err: 2, msg: "alredy found"});
        } else {
          res.json({err: 0, data: data, key: key});
        }
      });
    }
  });
});

/*THis route is for fetch wishlist item  for specific user*/
router.get("/api/fetch_wishlist/:email", function (req, res) {
  const email = req.params.email;
  user_wishlist.find({email: email}, (err, data) => {
    if (data == null) {
      res.json({err: 1, msg: "Empty cart"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// THis route is for remove item from wish list
router.get("/api/remove_wishlist_item/:id", (req, res) => {
  const id = req.params.id;
  user_wishlist.deleteOne({_id: id}, (err, data) => {
    if (err || data.deletedCount == 0) {
      res.json({err: 1, msg: "Item not is Wishlist please refresh"});
    } else {
      res.json({err: 0, msg: "item delete"});
    }
  });
});

// this route is for fetch cart for specific user
router.get("/api/fetch_cart/:email", function (req, res) {
  const email = req.params.email;
  user_cart.find({email: email}, function (err, data) {
    if (data == null) {
      res.json({err: 1, msg: "empty cart"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// this route is for remove item form cart
router.get("/api/remove_item__user/:id", function (req, res) {
  const id = req.params.id;
  user_cart.deleteOne({_id: id}, function (err, data) {
    if (err || data.deletedCount == 0) {
      res.json({err: 1, msg: "Item not is cart please refresh"});
    } else {
      res.json({err: 0, msg: "item delete"});
    }
  });
});

// this route is for get user info using email id
router.get("/api/user_info/:id", function (req, res) {
  const id = req.params.id;
  user_account.find({email: id}, function (err, data) {
    if (err) {
      res.json({err: 1, data: err});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// This route is for delete user by id(admin)
router.get("/api/delete_user/:id", (req, res) => {
  const id = req.params.id;
  user_account.deleteOne({_id: id}, (err, data) => {
    if (data.deletedCount == 0) {
      res.json({err: 1, msg: "alredy delete"});
    } else {
      res.json({err: 0, msg: "delete"});
    }
  });
});

//  This route is for Get all User
router.get("/api/get_all_user", (req, res) => {
  user_account.find({}, (err, data) => {
    if (err != null) {
      res.json({err: 1, msg: "Something Wrong"});
    } else if (data == null) {
      res.json({err: 2, msg: "Account Table Empty"});
    } else {
      res.json({err: 0, data: data, msg: "get Account"});
    }
  });
});

// This route is for save order
router.post("/api/get_order/:email", (req, res) => {
  const info = req.body.order;
  const grandtotal = req.body.grandtotal;
  const subtotal = req.body.sub_total;
  const gst = req.body.gst;
  const status = "order req";
  let name = [];
  let price = [];
  let image = [];
  let quantity1 = [];
  let localtotal = [];
  const email = req.params.email;
  info.forEach(c => {
    name.push(c.name);
    price.push(c.current_price);
    image.push(c.image);
    quantity1.push(c.quantity);
    localtotal.push(c.total);
  });

  let order = new user_order({
    email: email,
    name: name,
    price: price,
    image: image,
    quantity: quantity1,
    localtotal: localtotal,
    grandtotal: grandtotal,
    subtotal: subtotal,
    gst: gst,
    status: status,
  });

  order.save(function (err, data) {
    if (err) {
      res.json({err: 1, msg: err});
      res.json({err: "404", msg: err});
    } else {
      var mailOptions = {
        from: "freebookstoreitg@gmail.com",
        to: email,
        subject: "Books_Stor.com",
        html: `<h1  style="color:#e59285">Order Received<h1>
            <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer.</p> <p style="font-size:18px; font-weight: 300;color:black;">We have received your order successfully and will soon deliver it to you. </p>
            <p style="font-size:18px; font-weight: 300;">Your order id:-<span style="font-size:20px; font-weight: 400;color:blue;">${data._id}</span></p>
            <h1 style="color:black;font-size:25px; font-weight: 600">Thank you!</h1>`,
      };
      //sendmail function call
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({err: 1, email: "not a valid email", err: error});
        } else {
          res.json({err: 0, email: "mailsend"});
        }
      });
      transporter.close();
    }
  });
});
// This route is for fetch order using email(user account)
router.get("/api/fetch_order/:email", function (req, res) {
  const email = req.params.email;
  user_order.find({email: email}, function (err, data) {
    if (err) {
      res.json({err: "404", msg: "something wrong"});
    } else if (data == null) {
      res.json({err: "404", msg: "no item found"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// This route is for update order status
router.post("/api/update_order", (req, res) => {
  const id = req.body.id;
  const text = req.body.text;
  const email = req.body.email;
  const value = text.text;

  user_order.updateOne({_id: id}, {$set: {status: value}}, (err, data) => {
    if (err == null) {
      var mailOptions = {
        from: "mohmadsabban123@gmail.com",
        to: email,
        subject: "Books_Stor.com",
        text: `Your order ${value} .Thank You for Shoping.Order id:-${id}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({err: 2, email: "not a valid email", err: error});
        } else {
          res.json({
            err: 0,
            email: "mailsend",
          });
        }
      });
      transporter.close();
    } else {
      res.json({err: 1, msg: err, data: "something wrong"});
    }
  });
});

// This route is for clear cart wishlist
router.get("/api/clear_cart/:email", (req, res) => {
  const email = req.params.email;
  user_cart.deleteMany({email: email}, (err, data) => {
    if (err) {
      res.json({err: 1, msg: "some error"});
    } else {
      user_wishlist.deleteMany({email: email}, (err, data) => {
        if (err) {
          res.json({err: 1, msg: "some erro"});
        } else {
          res.json({err: 0, msg: "ok"});
        }
      });
    }
  });
});

// this route is for send a mail(Personal)
router.post("/api/mail_send", (req, res) => {
  const email = req.body.email;
  const text = req.body.text;

  var mailOptions = {
    from: "mohmadsabban123@gmail.com",
    to: email,
    subject: "Books_Stor.com",
    text: `${text}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({err: 1, email: "not a valid email", err: error});
    } else {
      res.json({err: 0, email: "mailsend"});
    }
  });
  transporter.close();
});

// This route is for fetch all order
router.get("/api/getorder", (req, res) => {
  user_order.find({}, (err, data) => {
    if (data == null) {
      res.json({err: 1, msg: "no order"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// ======================This route is for update order status=================//
router.get("/api/update_order/:id", (req, res) => {
  const id = req.params.id;
  res.json({err: 0, id: id});
});

// =======================This Appi is Sending Mail to All User===================//
// This Appi is Sending Mail to All User
router.post("/api/subscriber", (req, res) => {
  const mail = req.body.mail;
  user_account.find({}, (err, data) => {
    if (err) {
      res.json({err: 1, msg: "Some err"});
    } else if (data == null) {
      res.json({err: 2, msg: "Account Not Found"});
    } else {
      data.forEach(e => {
        var mailOptions = {
          from: "mohmadsabban123@gmail.com",
          to: e.email,
          subject: "Books_Stor.com",
          text: `${mail}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.json({err: 3, msg: "Connection Error"});
          } else {
            res.json({err: 0, data: info});
          }
        });
        transporter.close();
      });
    }
  });
});

// Sell Module

// Create Sell Account
router.get("/api/create_sell/:email", (req, res) => {
  const email = req.params.email;
  const user = new sell_account({email: email});
  user.save((err, data) => {
    if (err != null) {
      res.json({err: err, msg: "some error"});
    } else {
      res.json({err: 0, msg: "account create"});
    }
  });
});

// THis route is for get sell account details
router.get("/api/getselluser/:email", (req, res) => {
  const email = req.params.email;
  sell_account.findOne({email: email}, (err, data) => {
    if (err || data == null) {
      res.json({err: 1, msg: "some error", data: data});
    } else {
      user_account.findOne({email: email}, (err, data1) => {
        if (err) {
          res.json({err: 2, msg: "some error"});
        } else {
          res.json({err: 0, data: data1});
        }
      });
    }
  });
});

/*==================== this route is for notes request by user ================*/
router.post("/api/notes_req", function (req, res) {
  uploadN(req, res, function (err) {
    if (err) {
      res.json({err: 1, msg: "Uploading Error"});
    } else {
      let cat_name = req.body.cat_name;
      let custom_cat = req.body.custom_cat;
      let note_name = req.body.note_name;
      let description = req.body.description;
      const email = req.body.email;
      let fname = req.file.filename;
      let notesave = new notes_Req({
        cat_name: cat_name,
        email: email,
        custom_cat: custom_cat,
        note_name: note_name,
        description: description,
        file: fname,
      });
      notesave.save(function (err, data) {
        if (err) {
          res.json({data: "databse", err: err});
        } else {
          res.json(data);
          var mailOptions = {
            from: "freebookstoreitg@gmail.com",
            to: data.email,
            subject: "Books_Stor.com",
            html: `<h1  style="color:#e59285">Request Received<h1>
            <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer</p>
              <p style="font-size:18px; font-weight: 300;color:black;">Your request has been recevied for the notes named ${note_name}. Once the notes are verified, it will be available on our website</p>
              <p style="font-size:18px; font-weight: 300;color:black;">Your Request id:-<span style="font-size:20px; font-weight: 400;color:blue;">${data._id}</span></p>
              <h1 style="color:black;font-size:25px; font-weight: 600">Thank you for sharing your notes with us!</h1>`,
          };
          //sendmail function call
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.json({
                email: "not a valid email",
                err: error,
                data: data._id,
              });
            } else {
              res.json({err: 0, email: "mailsend"});
            }
          });
          transporter.close();
        }
      });
    }
  });
});

//=== This route is save sell request=== //
router.post("/api/save_second_book", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.json({err: err});
    } else {
      let name = req.body.name;
      const email = req.body.email;
      let Category = req.body.category;
      let Price = req.body.price;
      let Writer = req.body.writer;
      let Edition = req.body.edition;
      let Published_year = req.body.published_year;
      let current_Price = req.body.current_price;
      let Image = req.file.filename;
      const status = "create";
      let booksave = new req_second_book({
        name: name,
        email: email,
        category: Category,
        price: Price,
        writer: Writer,
        edition: Edition,
        published_year: Published_year,
        current_price: current_Price,
        status: status,
        image: Image,
      });
      booksave.save((err, data) => {
        if (err == null) {
          var mailOptions = {
            from: "mohmadsabban123@gmail.com",
            to: email,
            subject: "Books_Stor.com",
            html: `<h1 style="color:#e59285">Request Received<h1>
            <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer</p>
            <p style="font-size:18px; font-weight: 300;color:black;">Your request has been recevied. After verifying your book. Bootstor will proceed for payment process.</p>
            <p style="font-size:18px; font-weight: 300;color:black;">Your Request id:-<span style="font-size:20px; font-weight: 400;color:blue;">${data._id}</span></p>
            <h1 style="color:black;font-size:25px; font-weight: 600">Thank you!</h1>`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.json({err: 2, email: "not a valid email", err: error});
            } else {
              res.json({err: 0, email: "mailsend"});
            }
          });
          transporter.close();
        } else {
          res.json({err: 1, msg: "something wrong"});
        }
      });
    }
  });
});
/*===================== this route is for fetching notes sent by user =======================*/
router.get("/api/fetchnotes_req", function (req, res) {
  notes_Req.find({}, function (err, data) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// This route is for get all sell request
router.get("/api/getsellreq", (req, res) => {
  req_second_book.find((err, data) => {
    if (err) {
      res.json({err: 1, msg: "some error"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// This route is for delete sell Req
router.post("/api/deletesellreq", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  req_second_book.deleteOne({_id: id}, (err, data) => {
    if (err || data.deletedCount == 0) {
      res.json({err: 1, msg: "some thing wrong"});
    } else {
      var mailOptions = {
        from: "mohmadsabban123@gmail.com",
        to: email,
        subject: "Books_Stor.com",
        html: `<h1 style="color:#e59285">Request Cancelled<h1>
        <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer</p>
      <p style="font-size:18px; font-weight: 300;color:black;">Your request has failed our verfication process</p>
      <p style="font-size:18px; font-weight: 300;color:black;">Your Request id:-<span style="font-size:20px; font-weight: 400;color:blue;">${id}</span></p>
      <h1 style="color:black;font-size:25px; font-weight: 600">Thank you!</h1>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({err: 1, email: "not a valid email", err: error});
        } else {
          res.json({err: 0, email: "mailsend"});
        }
      });
      transporter.close();
    }
  });
});

/*====================== this router is deleting notes by id =========================*/
router.get("/api/delnotes/:cid/:email", function (req, res) {
  let cid = req.params.cid;
  const email = req.params.email;
  notes_Req.deleteOne({_id: cid}, function (err, data) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      var mailOptions = {
        from: "freebookstoreitg@gmail.com",
        to: email,
        subject: "Books_Stor.com",
        html: `<h1  style="color:#e59285">Request Cancelled<h1>
        <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer</p>
            <p style="font-size:18px; font-weight: 300;color:black;">Your request has been cancelled for the notes you sent, as your notes content was not valid.</p>
            <p  style="font-size:18px; font-weight: 300;color:black;">Your Request id:-<span style="font-size:20px; font-weight: 400;color:blue;">${cid}</span></p>
            <p style="font-size:18px; font-weight: 300;color:black;">We regret about this incident, Wish you will continue shopping with us again.</p1>
            <h1 style="color:black;font-size:25px; font-weight: 600"> Thank You! </h1>`,
      };
      //sendmail function call
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({err: 1, email: "not a valid email", err: error});
        } else {
          res.json({err: 0, email: "mailsend", id: cid});
        }
      });
      transporter.close();
    }
  });
});

/*======================= this api is for getting notes by id for editing notes ========================*/
router.get("/api/getnotebyid/:cid", function (req, res) {
  let cid = req.params.cid;
  notes_Req.find({_id: cid}, function (err, data) {
    if (err) {
    } else {
      res.json({err: 0, data: data});
    }
  });
});

/*======================= this api is for editing the notes ============================*/
router.post("/api/editnotes/:cid", function (req, res) {
  let cid = req.params.cid;
  let catname =
    req.body.cat_name == "others" ? req.body.custom_cat : req.body.cat_name;
  let notename = req.body.note_name;
  let desc = req.body.description;
  notes_Req.findOneAndUpdate(
    {_id: cid},
    {cat_name: catname, note_name: notename, description: desc},
    {new: true},
    function (err) {
      if (err) {
        res.json({err: 1, msg: err});
      } else {
        res.json({err: 0, msg: "Notes Updated"});
      }
    }
  );
});

/*=========== This api route is for saving a notes category in database =================== */
router.post("/api/addnotescategory", function (req, res) {
  const notecategory = req.body.category;
  const ins = new notes_category({notecat: notecategory});
  ins.save(function (err) {
    res.json({err: 0, msg: "save"});
  });
});

// This route is for update book
router.post("/api/updatesell/:id/:image", (req, res) => {
  let name = req.body.name;
  let id = req.params.id;
  let Category = req.body.category;
  let Price = req.body.price;
  let Writer = req.body.writer;
  let Edition = req.body.edition;
  let Published_year = req.body.published_year;
  let current_Price = Math.ceil(Price * 0.5);
  const paymentprice = Math.floor((30 / Price) * 100);
  const status = req.body.status;
  const image = req.params.image;
  if (status != "confirm") {
    req_second_book.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          name: name,
          category: Category,
          price: Price,
          writer: Writer,
          edition: Edition,
          published_year: Published_year,
          status: status,
        },
      },
      (err, data) => {
        if (err) {
          res.json({err: err, msg: "something wrong"});
        } else {
          res.json({err: "update"});
        }
      }
    );
  } else {
    //  DO payment
    const newbook = new second_book({
      name: name,
      category: Category,
      price: Price,
      writer: Writer,
      edition: Edition,
      published_year: Published_year,
      current_price: current_Price,
      image: image,
    });
    newbook.save((err, data) => {
      if (err) {
        res.json({err: err, msg: "some error"});
      } else {
        req_second_book.deleteOne({_id: id}, (err, data) => {
          if (data.deletedCount == 0) {
            res.json({err: 2, msg: "not found"});
          } else {
            const cat = new second_books_category({category: Category});
            cat.save((err, data) => {
              if (err) {
                res.json({err: 0, msg: "already found"});
              } else {
                res.json({err: 0});
              }
            });
          }
        });
      }
    });
  }
});

// This route is for payment mail
router.post("/api/paymentmail", (req, res) => {
  const email = req.body.mail;
  const id = req.body.id;
  const price = req.body.price;
  var mailOptions = {
    from: "mohmadsabban123@gmail.com",
    to: email,
    subject: "Books_Stor.com",
    html: `<h1  style="color:#e59285">Request Approved<h1>
    <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer</p>
  <p style="font-size:18px; font-weight: 300;color:black;">Your request has passed the verfication process.</p>
  <p  style="font-size:18px; font-weight: 300;color:black;">Bookstor will complete payment process of amount $${price} and Order id <span style="font-size:20px; font-weight: 400;color:blue;">${id}</span></p>
  <h1 style="color:black;font-size:25px; font-weight: 600">Thank you!</h1>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({err: 1, email: "not a valid email", err: error});
    } else {
      res.json({err: 0, email: "mailsend"});
    }
  });
  transporter.close();
});

/*================= this route is for fetching a note category ==================== */
router.get("/api/getnotescategory", function (req, res) {
  notes_category.find({}, function (err, data) {
    if (err) {
      res.json({err: 1, data: "some error occur in fetch category"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// This route is for Ftech second book //
router.get("/api/getsecondbook", (req, res) => {
  second_book.find((err, data) => {
    if (err || data == "") {
      res.json({err: 1, msg: "some error"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

/*===================== This route is for delete a note category from database ========================== */
router.post("/api/deletenotes_category", function (req, res) {
  const cat = req.body.category;

  notes_category.deleteOne({notecat: cat}, function (err, data) {
    if (err) {
      res.json({err: 1, msg: "already delete"});
    } else if (data.deletedCount == 0) {
      res.json({err: 2, msg: "category not ex", sa: data});
    } else {
      res.json({err: 0, msg: "category delete"});
    }
  });
});

// This route is for get second book category
router.get("/api/getsecondcategory", (req, res) => {
  second_books_category.find((err, data) => {
    if (err || data == "") {
      res.json({err: 1, msg: "some error"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

/* ====================== this route is for saving the notes ============================= */
router.post("/api/notes_saved", function (req, res) {
  let cat_name =
    req.body.cat_name == "others" ? req.body.custom_cat : req.body.cat_name;
  let note_name = req.body.note_name;
  let description = req.body.description;
  let fname = req.body.file;
  const email = req.body.email;
  const id = req.body._id;
  // res.json(id);
  let ins = new notes_Save({
    cat_name: cat_name,
    note_name: note_name,
    description: description,
    file: fname,
    email: email,
  });
  ins.save(function (err) {
    if (err) {
      res.json({data: "databse", err: err, msg: "msg"});
    } else {
      notes_Req.findByIdAndDelete({_id: id}, (err1, data) => {
        if (err) {
          res.json({err: 1, msg: "de;ete error"});
        } else {
          const ins = new notes_category({notecat: cat_name});
          ins.save(function (err) {
            var mailOptions = {
              from: "mohmadsabban123@gmail.com",
              to: email,
              subject: "Books_Stor.com",
              html: `<h1  style="color:#e59285">Request Approved<h1>
              <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer.</p>
            <p style="font-size:18px; font-weight: 300;color:black;">Your request has been approved for the notes named ${note_name} .</p>
            <p style="font-size:18px; font-weight: 300;color:black;">Your notes are now available on our website.</p>
            <p style="font-size:18px; font-weight: 300;color:black;">We are very obliged that you shared your precious notes with us.</p>
            <h1 style="color:black;font-size:25px; font-weight: 600">Thank You!</h1>`,
            };
            //sendmail function call
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.json({err: 2, email: "not a valid email"});
              } else {
                res.json({err: 0, email: "mailsend"});
              }
            });
            transporter.close();
          });
        }
      });
    }
  });
});

// THis route is for get second book according to category
router.get("/api/fetchsecondbook/:category", (req, res) => {
  const category = req.params.category;
  second_book.find({category: category}, (err, data) => {
    if (err || data == "") {
      res.json({err: 1, msg: "some error", type: "maybe category not found"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

/*======================= this route is for fetching the saved notes to front ===================*/
router.get("/api/fetchnotes_saved", function (req, res) {
  notes_Save.find({}, function (err, data) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// Profile Route

// this route is for get user info using email id
router.get("/api/user_info/:id", function (req, res) {
  const id = req.params.id;
  user_account.find({email: id}, function (err, data) {
    if (err) {
      res.json({err: 1, data: err});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

/*========================= this route is for fetching the notes category wise ===================*/
router.get("/api/fetchnotes_bycat/:category", function (req, res) {
  notes_Save.find({cat_name: req.params.category}, function (err, data) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// This route is for fetch order using email(user account)
router.get("/api/fetch_order/:email", function (req, res) {
  const email = req.params.email;
  user_order.find({email: email}, function (err, data) {
    if (err) {
      res.json({err: "404", msg: "something wrong"});
    } else if (data == null) {
      res.json({err: "404", msg: "no item found"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});
/*==================== this route is for fetching notes info =====================*/
router.get("/api/fetchinfo/:info", function (req, res) {
  notes_Save.find({description: req.params.info}, function (err, data) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// This route is for update User Profile
router.post("/api/user_update_data", (req, res) => {
  const data = req.body.data;
  const email = req.body.email;
  const name = data.name;
  const contact = data.contact;
  const pincode = data.pincode;
  const address = data.address;
  const state = data.state;
  user_account.findOneAndUpdate(
    {email: email},
    {
      $set: {
        name: name,
        contact: contact,
        pincode: pincode,
        address: address,
        state: state,
      },
    },
    (err, data) => {
      if (err) {
        res.json({err: 1, msg: err});
      } else {
        res.json({err: err, data: data});
      }
    }
  );
});

// This route is for get order by email
router.get("/api/fetch_sell_order/:email", (req, res) => {
  const email = req.params.email;
  req_second_book.find({email: email}, (err, data) => {
    if (err != null || data.length == 0) {
      res.json({err: 1, msg: "empty"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

//============ this route is for deleting the saved notes=============//
router.get("/api/delsavednotes/:cid", function (req, res) {
  let cid = req.params.cid;
  notes_Save.deleteOne({_id: cid}, function (err) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      res.json({err: 0, msg: "Category Deleted"});
    }
  });
});

//============= route for downloading the file ==========//
router.get("/api/download/:data", function (req, res) {
  filepath = path.join(__dirname, `../notes_data`) + "/" + req.params.data;
  res.sendFile(filepath);
});

//============= this route is for book request by user ============//
router.post("/api/books_req", function (req, res) {
  const email = req.body.email;
  const data = req.body.data;
  let book_title = data.book_title;
  let author_name = data.author_name;
  let publisher = data.publisher;
  let edition = data.edition;
  let description = data.description;
  let book = new books_Req({
    book_title: book_title,
    author_name: author_name,
    publisher: publisher,
    description: description,
    edition: edition,
    email: email,
  });
  book.save(function (err, savedata) {
    if (err) {
      res.json({err: 1, msg: "Request Not Sent"});
    } else {
      var mailOptions = {
        from: "freebookstoreitg@gmail.com",
        to: email,
        subject: "Books_Stor.com",
        html: `<h1  style="color:#e59285">Book Request Received<h1>
        <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer.</p>
              <p style="font-size:18px; font-weight: 300;color:black;">Your book request has been recevied for the ${book_title}. Once the book is available ,we wil inform you about that.</p>
              <p style="font-size:18px; font-weight: 300;color:black;">Your Request id:-<span style="font-size:20px; font-weight: 400;color:blue;">${savedata._id}</span></p>
            
              <h1 style="color:black;font-size:25px; font-weight: 600">Till then happy shopping!</h1>`,
      };
      //sendmail function call
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({email: "not a valid email", err: error, data: data});
        } else {
          res.json({err: 0, email: "mailsend"});
        }
      });
      transporter.close();
    }
  });
});

//============== this route is for fetching book request =============//
router.get("/api/fetchbooks_req", function (req, res) {
  books_Req.find({}, function (err, data) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

//============== this route is for deleting the book request =========//
router.get("/api/delbooksreq/:cid/:email", function (req, res) {
  const cid = req.params.cid;
  const email = req.params.email;
  books_Req.deleteOne({_id: cid}, function (err) {
    if (err) {
      res.json({data: "databse", err: err});
    } else {
      var mailOptions = {
        from: "freebookstoreitg@gmail.com",
        to: email,
        subject: "Books_Stor.com",
        html: `<h1  style="color:#e59285">Book Available<h1>
        <p style="font-size:18px; font-weight: 300;color:black;">Dear Customer</p>
            <p style="font-size:18px; font-weight: 300;color:black;">We are happy to tell you that the book you requested is now available on our website.</p>
            <p  style="font-size:18px; font-weight: 300;color:black;">Your Book request id:-<span style="font-size:20px; font-weight: 400;color:blue;">${cid}</span></p>
            <h1 style="color:black;font-size:25px; font-weight: 600">Hurry up, before it gets out of stock !</h1>`,
      };
      //sendmail function call
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({err: 1, email: "not a valid email", err: error});
        } else {
          res.json({err: 0, email: "mailsend"});
        }
      });
      transporter.close();
    }
  });
});

// =============This route is for Ftech second book==================//

router.get("/api/getsecondbook", (req, res) => {
  second_book.find((err, data) => {
    if (err || data == "") {
      res.json({err: 1, msg: "some error"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

// ==============This route is for get second book category============//
router.get("/api/getsecondcategory", (req, res) => {
  second_books_category.find((err, data) => {
    if (err || data == "") {
      res.json({err: 1, msg: "some error"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

//==============this route is for fetching second book by category=============//
router.get("/api/fetchsecondbook/:category", (req, res) => {
  const category = req.params.category;
  second_book.find({category: category}, (err, data) => {
    if (err || data == "") {
      res.json({err: 1, msg: "some error", type: "maybe category not found"});
    } else {
      res.json({err: 0, data: data});
    }
  });
});

module.exports = router;
