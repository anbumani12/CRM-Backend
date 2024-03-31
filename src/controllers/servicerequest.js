import EmailService from "../common/EmailService.js";
import SRModel from "../models/ServiceRequest.js";

const create = async (req, res) => {
  try {
    req.body.no = `SR${+new Date()}`;
    let data = await SRModel.create(req.body);
    // data = {...data,no:`SR${+new Date()}`}
    // console.log(data,"data")
    await EmailService.sendMailWithData(data);
    console.log(data,"data")

    res.status(200).send({
      message: "Service Request Created",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const getBySrNo = async (req, res) => {
  try {
    let data = await SRModel.findOne({ no: req.params.srno });
    if (data) {
      res.status(200).send({
        message: "Data Fetch Successfull",
        data,
      });
    } else {
      res.status(400).send({
        message: "Invalid SR No",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

export default {
  create,
  getBySrNo,
};
