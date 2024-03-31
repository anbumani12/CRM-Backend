import SRModel from "../models/ServiceRequest.js";

const dashboardCount = async (_req, res) => {
  try {
    let data = await SRModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    let count = data.map((item) => ({ _id: item._id, Count: item.count }));
    // console.log(data,count,"anbu");
    res.status(200).send({
      message: "Data Fetch Successful",
      data: count,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const list = async (req, res) => {
  try {
    let status = req.params.status;
    let data = await SRModel.find({ status: status });

    res.status(200).send({
      message: "Data Fetch Successful",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    let id = req.params.id;
    let user = req.headers.user;
    let sr = await SRModel.findById(id);
    if (sr) {
      if (sr.status === "Open") {
        sr.assignedAt = new Date();
        sr.assignedById = user._id;
        sr.assignedTo = user.name;
        sr.status = "Assigned";

        await sr.save();
      } else if (sr.status === "Assigned") {
        sr.resolution = req.body.resolution;
        sr.resolvedAt = new Date();
        sr.status = "Closed";

        await sr.save();
      }

      res.status(200).send({
        message: "Status Updated Successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid Service Request",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default {
  dashboardCount,
  list,
  changeStatus,
};
