import DashboardLayout from "@/layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

import DashboardOverview from "@/pages/Dashboard/DashboardOverview";
import DashboardAnalytics from "@/pages/Dashboard/DashboardAnalytics";
import EmployeeList from "@/pages/Employees/EmployeeList";
import AddEmployee from "@/pages/Employees/AddEmployee";
import RFIDManagement from "@/pages/Employees/RFIDManagement";
import DailyAttendance from "@/pages/Attendance/DailyAttendance";
import MonthlyReport from "@/pages/Attendance/MonthlyReport";
import WorkTimings from "@/pages/Attendance/WorkTimings";
import HolidayList from "@/pages/Holidays/HolidayList";
import AddHoliday from "@/pages/Holidays/AddHoliday";
import UnderConstruction from "@/components/custom/utils/UnderConstruction";
import { routes } from "@/utils/app.constants";

export const applicationRouter = createBrowserRouter([
  {
    element: <DashboardLayout />,
    path: routes.CORE.path,
    children: [
      {
        path: routes.DASHBOARD.path,
        children: [
          {
            path: routes.DASHBOARD.routes.overview.path,
            element: <DashboardOverview />,
          },
          {
            path: routes.DASHBOARD.routes.analytics.path,
            element: <DashboardAnalytics />,
          },
        ],
      },
      {
        path: routes.EMPLOYEES.path,
        children: [
          {
            path: routes.EMPLOYEES.routes.list.path,
            element: <EmployeeList />,
          },
          {
            path: routes.EMPLOYEES.routes.create.path,
            element: <AddEmployee />,
          },
          {
            path: routes.EMPLOYEES.routes.rfid.path,
            element: <RFIDManagement />,
          },
        ],
      },
      {
        path: routes.ATTENDANCE.path,
        children: [
          {
            path: routes.ATTENDANCE.routes.daily.path,
            element: <DailyAttendance />,
          },
          {
            path: routes.ATTENDANCE.routes.monthly.path,
            element: <MonthlyReport />,
          },
          {
            path: routes.ATTENDANCE.routes.timings.path,
            element: <WorkTimings />,
          },
        ],
      },
      {
        path: routes.HOLIDAYS.path,
        children: [
          {
            path: routes.HOLIDAYS.routes.list.path,
            element: <HolidayList />,
          },
          {
            path: routes.HOLIDAYS.routes.create.path,
            element: <AddHoliday />,
          },
        ],
      },
      {
        path: routes.CORE.UNDER_CONSTRUCTION,
        element: <UnderConstruction />,
      },
    ],
  },
]);
