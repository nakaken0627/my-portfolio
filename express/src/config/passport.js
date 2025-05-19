"use strict";
/// <reference path="../@types/express/globals.d.ts" />
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
//認証方法の定義、セッションへの保存
var bcrypt = require("bcrypt");
var passport_1 = require("passport");
var passport_local_1 = require("passport-local");
var database_js_1 = require("./database.js");
//companyの認証のためローカル戦略を使って定義
passport_1.default.use(
  "company-local",
  new passport_local_1.Strategy(function (username, password, done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var result, company, isPasswordValid, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, , 4]);
            return [4 /*yield*/, database_js_1.default.query("SELECT * FROM companies WHERE name = $1", [username])];
          case 1:
            result = _a.sent();
            company = result.rows[0];
            if (!company) {
              return [2 /*return*/, done(null, false, { message: "ユーザー名が間違っています" })];
            }
            return [4 /*yield*/, bcrypt.compare(password, company.password)];
          case 2:
            isPasswordValid = _a.sent();
            if (!isPasswordValid) {
              return [2 /*return*/, done(null, false, { message: "パスワードが間違っています" })];
            }
            //問題がなければDBで取得したユーザー情報を返す
            return [2 /*return*/, done(null, __assign(__assign({}, company), { type: "company" }))];
          case 3:
            error_1 = _a.sent();
            return [2 /*return*/, done(error_1)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  }),
);
//userの認証のためローカル戦略を使って定義
passport_1.default.use(
  "user-local",
  new passport_local_1.Strategy(function (username, password, done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var result, user, isPasswordValid, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, , 4]);
            return [4 /*yield*/, database_js_1.default.query("SELECT * FROM users WHERE name = $1", [username])];
          case 1:
            result = _a.sent();
            user = result.rows[0];
            if (!user) {
              return [2 /*return*/, done(null, false, { message: "ユーザー名が間違っています" })];
            }
            return [4 /*yield*/, bcrypt.compare(password, user.password)];
          case 2:
            isPasswordValid = _a.sent();
            if (!isPasswordValid) {
              return [2 /*return*/, done(null, false, { message: "パスワードが間違っています" })];
            }
            //問題がなければDBで取得したユーザー情報を返す
            return [2 /*return*/, done(null, __assign(__assign({}, user), { type: "user" }))];
          case 3:
            error_2 = _a.sent();
            return [2 /*return*/, done(error_2)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  }),
);
//セッションへ保存する情報を定義
passport_1.default.serializeUser(function (user, done) {
  var expressUser = user;
  done(null, { id: expressUser.id, type: expressUser.type });
});
//センションからユーザー情報を復元
passport_1.default.deserializeUser(function (data, done) {
  return __awaiter(void 0, void 0, void 0, function () {
    var expressData, result, result, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          expressData = data;
          _a.label = 1;
        case 1:
          _a.trys.push([1, 7, , 8]);
          if (!(expressData.type === "company")) return [3 /*break*/, 3];
          return [4 /*yield*/, database_js_1.default.query("SELECT * FROM companies WHERE id = $1", [expressData.id])];
        case 2:
          result = _a.sent();
          return [2 /*return*/, done(null, __assign(__assign({}, result.rows[0]), { type: "company" }))];
        case 3:
          if (!(expressData.type === "user")) return [3 /*break*/, 5];
          return [4 /*yield*/, database_js_1.default.query("SELECT * FROM users WHERE id = $1", [expressData.id])];
        case 4:
          result = _a.sent();
          return [2 /*return*/, done(null, __assign(__assign({}, result.rows[0]), { type: "user" }))];
        case 5:
          return [2 /*return*/, done(null, false)];
        case 6:
          return [3 /*break*/, 8];
        case 7:
          error_3 = _a.sent();
          return [2 /*return*/, done(error_3)];
        case 8:
          return [2 /*return*/];
      }
    });
  });
});
exports.default = passport_1.default;
