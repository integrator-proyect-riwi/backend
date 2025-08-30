import { fn, col } from 'sequelize';
import { generateRequestCode, getUserFromToken, findLeader, createSupport } from '../utils/index.js';
import Request from '../models/request.js';
import Status from '../models/status.js';
import Employee from '../models/employee.js';
import RequestType from '../models/requestsType.js';
import Priority from '../models/priority.js';

export async function totalRequests(req, res) {
    try {
        const totalRequests = await Request.count();

        if (totalRequests === 0) {
            return res.status(200).json({ message: 'Not requests to show' })
        }

        res.status(200).json({
            total_requests: totalRequests
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function requestsByStatus(req, res) {
    try {
        const requests = await Request.findAll({
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
            order: [['created_at', 'DESC']],
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

        const employee = await Employee.findOne({ where: { user_id: user.id } });
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