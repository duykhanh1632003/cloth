const { reject } = require("lodash");
const db = require("../models/index");
var bcrypt = require("bcrypt");
const { Op } = require("sequelize");
import emailService from "./emailService";

let getAllcode = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = {};
      let allCode = await db.Allcode.findAll({
        raw: true,
        nest: true,
      });
      res.allcode = allCode;
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createANewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already used, please try another email!",
        });
      } else {
        // Hash password before storing
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await db.User.create({
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          phonenumber: data.phoneNumber,
          address: data.address,
          gender: data.keyGender,
          positionId: data.keyPosition,
          roleId: data.keyRole,
        });

        resolve({
          errCode: 0,
          message: "User created successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = {};
      let data = await db.User.findAll();
      res.data = data;
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: "The user doesn't exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: "The user has been deleted",
    });
  });
};

let getDetailDoctorById = async (id) => {
  try {
    if (!id) {
      return {
        errCode: 1,
        errMessage: "Missing required parameter",
      };
    } else {
      let data = await db.User.findOne({
        where: { id: id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          { model: db.Allcode, as: "genderData", attributes: ["value"] },
          { model: db.Allcode, as: "positionData", attributes: ["value"] },
          { model: db.Allcode, as: "roleData", attributes: ["value"] },
        ],
        raw: false,
        nest: true,
      });

      if (!data) {
        return {
          errCode: 404,
          errMessage: "Doctor not found",
        };
      } else {
        return {
          errCode: 0,
          data: data,
        };
      }
    }
  } catch (e) {
    console.log(e);
    return {
      errCode: -1,
      errMessage: "Error from the server",
    };
  }
};

let handleEditAUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.keyGender || !data.keyPosition || !data.keyRole) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phoneNumber;
        user.roleId = data.keyRole;
        user.gender = data.keyGender;
        user.positionId = data.keyPosition;
        await user.save();

        resolve({
          errCode: 0,
          message: "Update the user success!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User does not exist";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email does not exist";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let handleSubmitDetailItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          errMessage: "Mất data",
        });
      } else {
        await db.AdminItem.create({
          name: data.name,
          priceItem: data.price,
          sale: data.sale,
          image: data.avatar,
          contentMarkdown: data.contentMarkdown,
          contentHTML: data.contentHTML,
          idAdmin: data.id,
          count: data.count,
          currentNumer: data.currentNumer,
        });
        resolve({
          errCode: 0,
          errMessage: "Done",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getItemHomePage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      let response = await db.AdminItem.findAll();
      for (let i = 0; i < response.length; i++) {
        let item = response[i].dataValues;

        if (item.image) {
          item.image = new Buffer(item.image, "base64").toString("binary");
        }

        data.push(item);

        resolve(data);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleOnChangeDetailItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 0,
          errMessage: "Don't get data",
        });
      } else {
        let item = await db.AdminItem.findOne({
          where: { id: data.idItem },
        });
        if (item && data.avatar) {
          (item.name = data.name),
            (item.priceItem = data.price),
            (item.sale = data.sale);
          item.image = data.avatar;
          item.contentMarkdown = data.contentMarkdown;
          item.contentHTML = data.contentHTML;
          (item.idAdmin = data.id),
            (item.count = data.count),
            (item.currentNumer = data.currentNumer);

          await item.save();
        }
        if (item && data.avatar === "") {
          (item.name = data.name),
            (item.priceItem = data.price),
            (item.sale = data.sale);
          item.contentMarkdown = data.contentMarkdown;
          item.contentHTML = data.contentHTML;
          (item.idAdmin = data.id),
            (item.count = data.count),
            (item.currentNumer = data.currentNumer);

          await item.save();
        }
        resolve({
          errCode: 0,
          errMessage: "done",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteAItem = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.AdminItem.findOne({
        where: { id: id },
      });
      item.destroy();
      resolve({
        errCode: 0,
        errMessage: "done",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailItemCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.Cart.findOne({
        where: { idItem: data.idItem, idUser: data.idUser },
      });
      if (find) {
        (find.idUser = data.idUser),
          (find.name = data.name),
          (find.idItem = data.idItem),
          (find.numerWantBuy = find.numerWantBuy + 1),
          (find.currentNumber = data.currentNumber),
          (find.price = data.price);
        find.save();
      } else {
        await db.Cart.create({
          idUser: data.idUser,
          name: data.name,
          idItem: data.idItem,
          numerWantBuy: data.numerWantBuy,
          currentNumber: data.currentNumber,
          price: data.price,
          totalMoneyCart: data.totalMoneyCart,
        });
      }
      resolve({
        errCode: 0,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getProductCartbyId = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Import your Sequelize models
      const cartItems = await db.Cart.findAll({
        where: { idUser },
        include: [
          {
            model: db.AdminItem,
            where: { id: db.Sequelize.col("Cart.idItem") },
            attributes: ["image"],
          },
        ],
      });

      if (!cartItems || cartItems.length === 0) {
        reject(new Error("Cart items not found"));
        return;
      }

      const data = cartItems.map((cartItem) => {
        const item = cartItem.get({ plain: true }); // Convert to plain object

        if (item.AdminItem && item.AdminItem.image) {
          item.AdminItem.image = new Buffer(
            item.AdminItem.image,
            "base64"
          ).toString("binary");
        }

        return item;
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let handleOnChangeNumber = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.Cart.findOne({
        where: { idItem: data.idItem, idUser: data.idUser },
      });

      find.numerWantBuy = data.numerWantBuy;
      find.save();
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteProductCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.Cart.findOne({
        where: { id: id },
      });
      item.destroy();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let handleSubmitTotalMoney = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // await emailService.sendSimpleEmail()
      let findItem = await db.Cart.findOne({
        where: { id: data.id, idItem: data.idItem },
      });
      findItem.numerWantBuy = data.numerWantBuy;
      findItem.totalMoneyCart = data.totalMoneyCart;
      findItem.save();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let handleSubMitDone = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const item = await db.Cart.destroy({
        where: { idUser: id },
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

let handleSubMitEmail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // await emailService.sendSimpleEmail(data);
      {
        data &&
          data.map(async (item, index) => {
            let id = item.idItem;
            let idAdmin = item.idUser;
            let findItem = await db.AdminItem.findOne({
              where: { idAdmin: idAdmin, id: id },
            });
            findItem.currentNumber = findItem.currentNumber + item.currentNumer;
            findItem.save();
          });
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
  getAllcode,
  createANewUser,
  getAllUser,
  deleteUser,
  getDetailDoctorById,
  handleEditAUser,
  handleUserLogin,
  handleSubmitDetailItem,
  getItemHomePage,
  handleOnChangeDetailItem,
  handleDeleteAItem,
  getDetailItemCart,
  getProductCartbyId,
  handleOnChangeNumber,
  handleDeleteProductCart,
  handleSubmitTotalMoney,
  handleSubMitDone,
  handleSubMitEmail,
};
