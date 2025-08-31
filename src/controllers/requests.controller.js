import { fn, col, literal } from 'sequelize';
import { generateRequestCode, getUserFromToken, findLeader, createSupport } from '../utils/index.js';
import { Request, Status, Employee, RequestType, Priority, Department, Contract, StatusType } from '../models/index.js';

export async function getTypeRequest(req, res) {

    try {
        const totalTypeRequests = await RequestType.findAll({ where: { is_active: true } });

        if (totalTypeRequests === 0) {
            return res.status(200).json({ message: 'Not requests to show' })
        }

        res.status(200).json(totalTypeRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function totalRequests(req, res) {
    try {
        const totalRequests = await Request.count({ where: { is_active: true } });

        if (totalRequests === 0) {
            return res.status(200).json({ message: 'Not requests to show' })
        }

        res.status(200).json(...totalRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function requestsByStatus(req, res) {
    try {
        const requests = await Request.findAll({
            where: { is_active: true },
            attributes: [
                [fn('COUNT', col('request.id')), 'total']
            ],
            include: [
                { model: Status, as: 'status', attributes: ['codename'] }
            ],
            group: ['status.id', 'status.codename']
        });

        if (requests.length === 0) {
            return res.status(200).json({ message: 'Not requests to show' });
        }

        const formatted = requests.reduce((acc, r) => {
            acc[r.status.codename] = parseInt(r.getDataValue('total'), 10);
            return acc;
        }, {});

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function lastRequests(req, res) {
    try {
        const requests = await Request.findAll({
            where: { is_active: true },
            attributes: [
                [fn('CONCAT', col('employee.name'), ' ', col('employee.lastname')), 'employee'],
                [col('request_type.name'), 'request_type'],
                [col('status.name'), 'status'],
                [col('priority.name'), 'priority'],
                [fn('TO_CHAR', col('request.created_at'), 'yyyy-MM-dd'), 'created_at']
            ],
            include: [
                { model: Employee, as: 'employee', attributes: [] },
                { model: Status, as: 'status', attributes: [] },
                { model: RequestType, as: 'request_type', attributes: [] },
                { model: Priority, as: 'priority', attributes: [] }
            ],
            order: [['code', 'DESC']],
            limit: 4,
            raw: true
        });

        if (requests.length === 0) {
            return res.status(200).json({ message: 'Not requests to show' });
        }

        res.status(200).json(requests);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function requestsByType(req, res) {
    try {
        const requests = await Request.findAll({
            where: { is_active: ture },
            attributes: [
                [fn('COUNT', col('request.id')), 'total']
            ],
            include: [{
                model: RequestType,
                as: 'request_type',
                attributes: ['name']
            }],
            group: ['request_type.id', 'request_type.name']
        });

        if (requests.length === 0) {
            return res.status(200).json({ message: 'Not requests to show' });
        }

        const formatted = requests.reduce((acc, r) => {
            acc[r.request_type.name] = parseInt(r.getDataValue('total'), 10);
            return acc;
        }, {});

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createRequest(req, res) {
    const t = await Request.sequelize.transaction();

    try {
        const user = getUserFromToken(req.headers.authorization);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const employee = await Employee.findOne({ where: { user_id: user.id, is_active: true } });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found for this user' });
        }

        const {
            request_type,
            leader,
            priority_id,
            start_date,
            end_date,
            reason,
            observations,
        } = req.body;

        if (!request_type || !leader || !reason || !start_date || !end_date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (new Date(start_date) > new Date(end_date)) {
            return res.status(400).json({ error: 'Start date cannot be after end date' });
        }

        const reqType = await RequestType.findOne({ where: { codename: request_type } });
        if (!reqType) {
            return res.status(400).json({ error: 'Invalid request type' });
        }

        const pendingStatus = await Status.findOne({ where: { codename: 'pending' } });
        if (!pendingStatus) {
            return res.status(404).json({ error: 'Status not found' });
        }

        const leaderRow = await findLeader(leader);
        if (!leaderRow) {
            return res.status(404).json({ error: 'Leader not found' });
        }

        const priority = await Priority.findOne({ where: { codename: priority_id || 'normal' } });
        if (!priority) {
            return res.status(404).json({ error: 'Priority not found' });
        }

        const code = await generateRequestCode(t);

        const support = await createSupport({
            file: req.file || null,
            reason: reason,
            observations,
            transaction: t
        });

        const newRequest = await Request.create({
            code,
            employee_id: employee.id,
            request_type_id: reqType.id,
            status_id: pendingStatus.id,
            priority_id: priority.id,
            leader_id: leaderRow.id,
            support_id: support.id,
            start_date,
            end_date
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            message: 'Request created successfully',
            newRequest
        });

    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getRequests(req, res) {
    try {
        const requests = await Request.findAll({
            attributes: [
                'code',
                [col('request_type.name'), 'request_type'],
                [fn('CONCAT', col('employee.name'), ' ', col('employee.lastname')), 'employee'],
                [col('employee.contract.department.name'), 'department'],
                [fn('TO_CHAR', col('request.created_at'), 'yyyy-MM-dd'), 'request_date'],
                [
                    literal(`
                        CASE
                        WHEN "request"."start_date" IS NOT NULL AND "request"."end_date" IS NOT NULL
                            THEN TO_CHAR("request"."start_date", 'yyyy-MM-dd') || ' - ' || TO_CHAR("request"."end_date", 'yyyy-MM-dd')
                        WHEN "request"."start_date" IS NOT NULL
                            THEN TO_CHAR("request"."start_date", 'yyyy-MM-dd') || ' - (sin fecha fin)'
                        WHEN "request"."end_date" IS NOT NULL
                            THEN '(sin fecha inicio) - ' || TO_CHAR("request"."end_date", 'yyyy-MM-dd')
                        ELSE 'Sin período'
                        END
                    `),
                    'period'
                ],
                [col('status.name'), 'status'],
                [col('priority.name'), 'priority'],
                [fn('CONCAT', col('employee.contract.department.leader.name'), ' ', col('employee.contract.department.leader.lastname')), 'leader']
            ],
            include: [
                { model: RequestType, as: 'request_type', attributes: [] },
                {
                    model: Employee,
                    as: 'employee',
                    attributes: [],
                    include: [
                        {
                            model: Contract,
                            as: 'contract',
                            attributes: [],
                            include: [
                                {
                                    model: Department,
                                    as: 'department',
                                    attributes: [],
                                    include: [
                                        { model: Employee, as: 'leader', attributes: [] }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { model: Status, as: 'status', attributes: [] },
                { model: Priority, as: 'priority', attributes: [] }
            ],
            where: { is_active: true },
            order: [['code', 'DESC']],
            raw: true
        });

        res.status(201).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function updateStatusRequest(req, res) {
    try {
        const { code } = req.params;
        const { codename } = req.body;

        const status = await Status.findOne({
            where: { codename },
            include: [{
                model: StatusType,
                as: 'status_type',
                where: { codename: 'request_status' }
            }]
        });
        if (!status) return res.status(400).json({ error: `Status "${codename}" not valid for requests` });

        const request = await Request.findOne({ where: { code, is_active: true } });
        if (!request) return res.status(404).json({ error: 'Request not found' });

        const updatedRequest = await Request.update({ status_id: status.id }, { where: { code } });

        res.status(201).json({ message: 'Status updated successfully.' });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// get single request by id with employee name, department, request date, period, status, priority, and leader
export const getRequestById = async (req, res) => {
    try {
        const { id } = req.params; // 👈 id de la URL
        const request = await Request.findByPk(id, {
            where: { is_active: true },
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: ['name', 'lastname'],
                    include: [
                        {
                            model: Contract,
                            as: 'contract',
                            include: [
                                {
                                    model: Department,
                                    as: 'department',
                                    attributes: ['name'],
                                    include: [
                                        {
                                            model: Employee,
                                            as: 'leader',
                                            attributes: ['name', 'lastname']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                { model: Status, as: 'status', attributes: ['name'] },
                { model: Priority, as: 'priority', attributes: ['name'] },
            ],
            attributes: ['created_at', 'code', 'start_date', 'end_date']
        });

        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }

        const result = {
            code: request.code,
            type: "Vacaciones", // temporal fijo
            employee: `${request.employee.name} ${request.employee.lastname}`,
            department: request.employee.contract?.department?.name || null,
            requestDate: request.created_at.toISOString().split('T')[0],
            period: `${request.start_date} - ${request.end_date}`,
            status: request.status?.name,
            priority: request.priority?.name,
            leader: request.employee.contract?.department?.leader ? `${request.employee.contract.department.leader.name} ${request.employee.contract.department.leader.lastname}` : null
        };

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching request" });
    }
};

export async function deleteRequest(req, res) {
    try {
        const { code } = req.params;
        if (!code) return res.status(400).json({ error: "Request code is required" });

        const request = await Request.findOne({ where: { code, is_active: true } });
        if (!request) return res.status(404).json({ message: `Request ${code} not found or already deleted` });

        await Request.update({ is_active: false }, { where: { code } });

        res.status(200).json({ message: "Request deleted successfully" });

    } catch (error) {
        console.error("Error deleting request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}