import Auth from "../common/Auth.js";
const superAdminGuard = async (req, res, next) => {
  try {
    let token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
      let data = await Auth.decodeToken(token);
      let user = req.headers.user;
      if (user.role === "superadmin" && data.role === "superadmin") {
        next();
      } else {
        res.status(401).send({
          message: "Unauthorised Access",
        });
      }
    } else {
      res.status(401).send({
        message: "Unauthorised Access",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default superAdminGuard;
