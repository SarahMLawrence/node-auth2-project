const jwt = require("jsonwebtoken");

function restrict(department) {
  const dept = ["finance", "sales", "it"];

  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials",
    };

    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        if (
          department &&
          dept.indexOf(decoded.department) < dept.indexOf(department)
        ) {
          return res.status(403).json({
            message: "You are not allowed in here",
          });
        }

        req.token = decoded;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
