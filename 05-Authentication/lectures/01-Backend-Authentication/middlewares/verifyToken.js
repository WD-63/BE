import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   if (!req.headers.cookie) {
//     next(new Error("Unauthorized", { cause: 401 }));
//   }

//   const token = req.headers.cookie.split("=")[1];

//   if (!token) {
//     next(new Error("Unauthorized", { cause: 401 }));
//   }

//   const { userId } = jwt.verify(token, process.env.JWT_SECRET);

//   req.userId = userId;
//   next();
// };

// In case we have several cookies:
const verifyToken = (req, res, next) => {
  if (!req.headers.cookie) {
    next(new Error("Unauthorized", { cause: 401 }));
  }

  const cookies = req.headers.cookie?.split("; ");

  const cookiesArrays = cookies.map((cookie) => cookie.split("="));

  const cookiesObj = Object.fromEntries(cookiesArrays);

  const { token } = cookiesObj;

  if (!token) {
    next(new Error("Unauthorized", { cause: 401 }));
  }

  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = userId;
  next();
};

export default verifyToken;
