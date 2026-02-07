import express from "express";
import * as operationsController from "../controllers/operations.controller.js";

const router = express.Router();

router.get("/dashboard", operationsController.getDashboardData);
router.post("/visitors/invite", operationsController.inviteGuest);
router.get("/visitors", operationsController.getAllVisitors);
router.get("/visitors/society", operationsController.getSocietyVisitors);
router.patch("/visitors/:id/entry", operationsController.markVisitorEntry);
router.patch("/visitors/:id/exit", operationsController.markVisitorExit);
router.get("/visitors/user", operationsController.getUserVisitors);
router.post("/visitors/walk-in", operationsController.createWalkInVisitor);
router.get("/visitors/check-guest", operationsController.checkPreApprovedGuest);
router.get("/visitors/check-resident", operationsController.checkResident);
router.post("/visitors/request-approval", operationsController.requestVisitorApproval);
router.patch("/visitors/:id/status", operationsController.approveVisitor);
router.post("/visitors/verify-code", operationsController.verifyPassCode);

router.get("/visitors/:id", operationsController.getVisitorById);
// Tickets
router.get("/tickets/society", operationsController.getAllSocietyTickets);
router.post("/tickets", operationsController.createTicket);
router.get("/tickets/user", operationsController.getUserTickets);
router.get("/tickets/:id", operationsController.getTicketById);
router.patch("/tickets/:id/status", operationsController.updateTicketStatus);
router.post("/alerts/sos", operationsController.sendSOS);

// Service Staff (Daily Help) Routes
router.get("/service-staff/status", operationsController.getStaffStatus);
router.post("/service-staff/entry", operationsController.staffEntry);
router.post("/service-staff/exit", operationsController.staffExit);

// Staff Attendance Routes (Guard App)
import * as attendanceController from "../controllers/attendance.controller.js";
router.get("/staff/attendance/stats", attendanceController.getAttendanceStats);
router.get("/staff/attendance/activity", attendanceController.getTodaysActivity);
router.post("/staff/attendance/check-in", attendanceController.checkIn);
router.post("/staff/attendance/check-out", attendanceController.checkOut);

export default router;
