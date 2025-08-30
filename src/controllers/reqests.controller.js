import { fn, col, literal } from 'sequelize';
import Request from '../models/request.js';
import Status from '../models/status.js';
import Employee from '../models/employee.js';
import RequestType from '../models/requestsType.js';
import Priority from '../models/priority.js'

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
            include: [{
                model: Status,
                as: 'status',
                attributes: ['codename']
            }],
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
