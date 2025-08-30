import jwt from 'jsonwebtoken';
import { Support, Department, Request, Employee } from '../models/index.js'

export function getUserFromToken(authHeader) {
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function generateRequestCode(transaction) {
    const lastRequest = await Request.findOne({
        attributes: [
            [
                Request.sequelize.fn(
                    'MAX',
                    Request.sequelize.cast(
                        Request.sequelize.fn('split_part', Request.sequelize.col('code'), '-', 2),
                        'int'
                    )
                ),
                'max_code'
            ]
        ],
        transaction
    });

    const lastNumber = lastRequest?.getDataValue('max_code') || 0;
    const newNumber = (lastNumber + 1).toString().padStart(3, '0');

    return `SOL-${newNumber}`;
}

export async function findLeader(leaderString) {
    const [leaderName, departmentName] = leaderString.split(' - ').map(s => s.trim());

    if (!leaderName || !departmentName) {
        throw new Error('Leader format invalid. Expected "Nombre Apellido - Área"');
    }

    const department = await Department.findOne({ where: { name: departmentName } });
    if (!department) {
        throw new Error(`Department "${departmentName}" not found`);
    }

    const leaderEmployee = await Employee.findOne({ where: { id: department.leader_id } });
    if (!leaderEmployee) {
        throw new Error('Leader employee not found in department');
    }

    const fullName = `${leaderEmployee.name} ${leaderEmployee.lastname}`.trim();
    if (fullName.toLowerCase() !== leaderName.toLowerCase()) {
        throw new Error(`Leader name mismatch. Expected "${fullName}", got "${leaderName}"`);
    }

    return leaderEmployee;
}

export async function createSupport({ file, reason, observations, transaction }) {
    if (!reason) {
        throw new Error('Reason is required');
    }

    const support = await Support.create({
        documents: file ? file?.buffer : null,
        description: reason,
        observations: observations || null
    }, { transaction });

    return support;
}