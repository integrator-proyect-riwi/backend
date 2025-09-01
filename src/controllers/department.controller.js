import { Employee, Department } from '../models/index.js';

// get all departments with their leader
export const getDepartmentsWithLeaders = async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ["name"],
      include: [
        {
          model: Employee,
          as: "leader",
          attributes: ["name", "lastname"]
        }
      ]
    });

    const result = departments.map(dep => ({
      department: dep.name,
      leader: dep.leader
        ? `${dep.leader.name} ${dep.leader.lastname}`
        : null
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching departments with leaders" });
  }
};
