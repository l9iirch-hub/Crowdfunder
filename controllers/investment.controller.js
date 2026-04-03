import { Investment } from "../models/investment.model.js";
import { Project } from "../models/project.model.js";

export const invest = async (req, res) => {
  const { amount, projectId } = req.body;

  const investment = await Investment.create({
    amount,
    projectId,
    userId: req.user.id
  });

  await Project.findByIdAndUpdate(projectId, {
    $inc: { currentAmount: amount }
  });

  res.status(201).json(investment);
};