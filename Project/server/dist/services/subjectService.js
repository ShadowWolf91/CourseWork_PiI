"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const prismaClient_1 = tslib_1.__importDefault(require("../prismaClient"));
class SubjectService {
}
_a = SubjectService;
SubjectService.getSubjectBySubId = async ({ id_subject, }) => {
    const subject = await prismaClient_1.default.subjects.findUnique({
        where: { id_subject },
    });
    if (!subject)
        throw userRequestError_1.default.NotFound(`SUBJECT WITH ID ${id_subject} NOT FOUND`);
    return {
        ...subject,
    };
};
SubjectService.getAllSubjects = async ({ cursor, subjectName, skip, take, }) => prismaClient_1.default.subjects.findMany({
    skip,
    take,
    cursor: cursor ? { id_subject: cursor } : undefined,
    where: { subjectName: { contains: subjectName, mode: "insensitive" } },
});
SubjectService.createSubject = async ({ subjectName }) => {
    const subject = await prismaClient_1.default.subjects.findUnique({
        where: { subjectName },
        select: { id_subject: true },
    });
    if (!subject)
        throw userRequestError_1.default.NotFound(`SUBJECT WITH NAME ${subjectName} CREATED`);
    return prismaClient_1.default.subjects.create({
        data: {
            subjectName,
        },
    });
};
SubjectService.updateSubject = async ({ id_subject, subjectName, }) => {
    const subject = await prismaClient_1.default.subjects.findUnique({
        where: { id_subject },
        select: { id_subject: true },
    });
    if (!subject)
        throw userRequestError_1.default.NotFound(`SUBJECT WITH ID ${id_subject} NOT FOUND`);
    return prismaClient_1.default.subjects.update({
        where: { id_subject },
        data: {
            subjectName,
        },
    });
};
SubjectService.deleteSubject = async ({ id_subject }) => {
    const subject = await prismaClient_1.default.subjects.findUnique({
        where: { id_subject: id_subject },
        select: { id_subject: true },
    });
    if (!subject)
        throw userRequestError_1.default.NotFound(`SUBJECT WITH ID ${id_subject} NOT FOUND`);
    return prismaClient_1.default.subjects.delete({
        where: { id_subject: id_subject },
    });
};
exports.default = SubjectService;
//# sourceMappingURL=subjectService.js.map