import Attendance from "../models/Attendance.js";

/**
 * GET /operations/staff/attendance/stats
 * Get attendance statistics for the current month.
 */
export const getAttendanceStats = async (req, res) => {
    try {
        const staffId = req.user.id;
        const societyId = req.user.societyId;
        
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        // Fetch all attendance records for this month
        const records = await Attendance.find({
            staffId,
            societyId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });

        // 1. Total Working Days (Unique days with at least one check-in)
        const uniqueDays = new Set(records.map(r => new Date(r.date).toDateString()));
        const totalAttends = uniqueDays.size;

        // 2. Calculate Total Days in Month (or working days so far)
        // For simple logic, let's say "Working Days" = days passed in month excluding Sundays/holidays if needed
        // But per screenshot "Total Days 28", "Total Attends 7"
        // Let's return days passed in current month as "Total Days"
        const daysInMonth = now.getDate(); 

        res.json({
            totalDays: daysInMonth, // Days passed in current month
            totalAttends: totalAttends,
            currentMonth: now.toLocaleString('default', { month: 'long' }),
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * GET /operations/staff/attendance/todays-activity
 * Get today's check-in/check-out logs.
 */
export const getTodaysActivity = async (req, res) => {
    try {
        const staffId = req.user.id;
        const societyId = req.user.societyId;
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const records = await Attendance.find({
            staffId,
            societyId,
            date: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ createdAt: 1 });

        // Check if currently checked in (last record has no check out)
        const lastRecord = records[records.length - 1];
        const isCheckedIn = lastRecord && !lastRecord.checkOutTime;

        res.json({
            activity: records,
            isCheckedIn: !!isCheckedIn,
            currentSessionId: isCheckedIn ? lastRecord._id : null
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * POST /operations/staff/attendance/check-in
 * Mark check-in for the staff.
 */
export const checkIn = async (req, res) => {
    try {
        const staffId = req.user.id;
        const societyId = req.user.societyId;

        // Check if already checked in
        const activeSession = await Attendance.findOne({
            staffId,
            societyId,
            checkOutTime: null
        });

        if (activeSession) {
            return res.status(400).json({ message: "You are already checked in." });
        }

        const now = new Date();
        const todayStart = new Date(now);
        todayStart.setHours(0,0,0,0);

        const attendance = new Attendance({
            staffId,
            societyId,
            date: todayStart,
            checkInTime: now,
            status: "present"
        });

        await attendance.save();

        res.status(201).json({
            message: "Checked in successfully",
            data: attendance
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * POST /operations/staff/attendance/check-out
 * Mark check-out for the staff.
 */
export const checkOut = async (req, res) => {
    try {
        const staffId = req.user.id;
        const societyId = req.user.societyId;

        // Find active session
        const activeSession = await Attendance.findOne({
            staffId,
            societyId,
            checkOutTime: null
        });

        if (!activeSession) {
            return res.status(400).json({ message: "You are not checked in." });
        }

        const now = new Date();
        activeSession.checkOutTime = now;
        activeSession.status = "completed";
        
        // Calculate duration in minutes
        const duration = Math.floor((now - new Date(activeSession.checkInTime)) / 60000);
        activeSession.workDurationMinutes = duration;

        await activeSession.save();

        res.json({
            message: "Checked out successfully",
            data: activeSession
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
