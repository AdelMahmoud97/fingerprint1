// src/services/doctorService.js
// Mock API responses for doctor dashboard

// src/services/doctorService.js
// src/services/doctorService.js


import axios from 'axios';
const API_BASE_URL = "http://localhost:5266";
const DrEmail = "adel1%40example.com";
//---------------------------------------------------------------------------------------



export const fetchDoctorProfile = async (DrEmail) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Doctors/GetDoctorByEmail?Email=${DrEmail}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid data structure received from API");
    }

    const profile = [{
      id: response.data.dr_Code,
      name: response.data.dr_NameAr,
      email: response.data.dr_Email,
      phone: response.data.phone,
      department: response.data.faculty,
      title: response.data.title,
    }];

    return profile;

  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    return [];
  }
};


//---------------------------------------------------------------------------------------

  
 export const fetchCourses = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Subjects/{id}${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid course data structure received from API");
    }

    if (response.data.length === 0) {
      return []; 
    }

    const courses = response.data.map(item => ({
      courseCode: item.subCode || "CS201",
      name: item.dr_NameEn || "Unknown",
      creditHours: item.subName || 3,
      studentsCount: item.studentsCount || 50,
      averageAttendance: item.averageAttendance || 92,
      status: item.status || "Completed"
    }));

    return courses;

  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};



  //---------------------------------------------------------------------------------------

  

 export const fetchSchedule = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Doctors/DashBordDoctors?Dr_Email=${DrEmail}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid data structure received from API");
    }

    if (response.data.length === 0) {
      return []; // لا توجد بيانات، نرجع مصفوفة فارغة
    }

    // تحويل كل عنصر في المصفوفة إلى كائن الجدول المطلوب
    const schedule = response.data.map(item => ({
      day: item.day ,
      courseCode: item.sub_Name ,
      courseName: item.sub_Name ,
      instructor: item.dr_NameAr , 
      location: item.room_Num ,
      studentsCount: item.totalStudents || 0, 
    }));

    return schedule;
    
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return [];
  }
};
  //---------------------------------------------------------------------------------------


  export const fetchStudentsList = async (StEmail) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Studets/GetStudetByEmail?Email=${StEmail}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid data structure received from API");
    }

    if (response.data.length === 0) {
      return []; // لا توجد بيانات، نرجع مصفوفة فارغة
    }

    // تحويل كل عنصر في المصفوفة إلى كائن الطالب المطلوب
    const students = response.data.map(item => ({
     id: item.st_Code,
      name: item.st_NameEn,
      email: item.st_Email,
      department: item.room_Num,
      year: item.facYearSem_ID,
      attendance: item.attendance || 86, // replace if available in your API
      courses: [
        {
          courseCode: item.subCode,
          grades: {
            midterm: 60,
            assignments: 65,
            final: 62,
            total: 62,
            letter: "D"
          }
        }
      ]
    }));

    return students;
    
  } catch (error) {
    console.error("Error fetching students list:", error);
    return [];
  }
};



  //---------------------------------------------------------------------------------------


 export const fetchAttendanceStats = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Doctors/DashBordDoctors?Dr_Email=${DrEmail}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid data structure received from API");
    }

    if (response.data.length === 0) {
      return []; // لا توجد بيانات، نرجع مصفوفة فارغة
    }

    // تحويل كل عنصر في المصفوفة إلى كائن إحصائيات الحضور المطلوب
    const attendanceStats = response.data.map(item => ({
      averageAttendance: item.averageAttendance,
      courseStats: {
        courseCode: item.courseCode,
        courseName: item.sub_Name,
        averageAttendance: item.averageAttendance,
        lastSessionAttendance: item.lastSessionAttendance,
        atRiskStudents: item.atRiskStudents,
        sessions: [{
          date: item.date,
          time: item.time,
          location: item.room_Num,
          presentCount: item.presentCount,
          absentCount: item.absentCount,
          attendancePercentage: item.attendancePercentage
        }]
      }
    }));

    return attendanceStats;
    
  } catch (error) {
    console.error("Error fetching attendance stats:", error);
    return [];
  }
};
 // replace if available in your API   (problem)


  //---------------------------------------------------------------------------------------


  export const fetchNotifications = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Notifications/GetAllNotifications`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid data structure received from API");
    }

    if (response.data.length === 0) {
      return []; // لا توجد بيانات، نرجع مصفوفة فارغة
    }

    // تحويل كل عنصر في المصفوفة إلى كائن الإشعار المطلوب
    const notifications = response.data.map(item => ({
      id: item.id,
      message: item.message,
      date: item.date,
      isRead: item.isRead
    }));

    return notifications;
    
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

  // replace if available in your API
  
  //---------------------------------------------------------------------------------------


 export const fetchGradeDistribution = async () => {
  try {
    // Step 1: جلب بيانات الكورسات
    const coursesResponse = await axios.get(`${API_BASE_URL}/api/Courses/GetAllCourses`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!coursesResponse.data) throw new Error("Failed to fetch courses data");

    const coursesData = coursesResponse.data;

    // Step 2: جلب بيانات توزيع الدرجات
    const gradesResponse = await axios.get(`${API_BASE_URL}/api/Grades/GetGradeDistribution`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!gradesResponse.data) throw new Error("Failed to fetch grade distribution data");

    const gradesData = gradesResponse.data;

    // Step 3: دمج البيانات وتنسيقها
    const result = {};
    coursesData.forEach((course, index) => {
      const courseCode = course.courseCode || "CS201";
      result[courseCode] = gradesData[index]?.distribution || [
        { grade: "A", count: 10 },
        { grade: "A-", count: 8 },
        { grade: "B+", count: 7 },
        { grade: "B", count: 6 },
        { grade: "B-", count: 5 },
        { grade: "C+", count: 4 },
        { grade: "C", count: 3 },
        { grade: "D", count: 1 },
        { grade: "F", count: 1 }
      ];
    });

    return result;
  } catch (error) {
    console.error("Error fetching grade distribution:", error);
    return {}; // return empty object if error
  }
};
  
  // replace if available in your API
  

  //---------------------------------------------------------------------------------------


  export const fetchRecentActivity = async () => {
  try {
    // Step 1: جلب بيانات الأنشطة الأخيرة
    const activitiesResponse = await axios.get(`${API_BASE_URL}/api/Activities/GetAllRecentActivities`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!activitiesResponse.data) throw new Error("Failed to fetch recent activities");

    const activitiesData = activitiesResponse.data;

    // Step 2: جلب تفاصيل الأنشطة
    const detailsResponse = await axios.get(`${API_BASE_URL}/api/ActivityDetails/GetAllDetails`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!detailsResponse.data) throw new Error("Failed to fetch activity details");

    const detailsData = detailsResponse.data;

    // Step 3: دمج البيانات وتنسيقها
    return activitiesData.map((activity, index) => ({
      id: activity.id || index + 1,
      type: activity.type || "attendance",
      description: activity.description || "Recorded attendance for CS303 - AI Fundamentals",
      time: detailsData[index]?.time || "Today, 1:30 PM"
    }));
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return []; // return empty array if error
  }
};

  // replace if available in your API

  //---------------------------------------------------------------------------------------


 export const addOrUpdateDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`https://localhost:7069/api/Doctors/Add_OR_UpdateDoctor`, doctorData, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.data) throw new Error("Failed to add or update doctor");

    return response.data;
  } catch (error) {
    console.error("Error in addOrUpdateDoctor:", error);
    throw error;
  }
};

//---------------------------------------------------------------------------------------


export const deleteDoctor = async (doctorId) => {
  try {
    const response = await axios.delete(`https://localhost:7069/api/Doctors/DeleteDoctor?id=${doctorId}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.status === 200) throw new Error("Failed to delete doctor");

    return { success: true };
  } catch (error) {
    console.error("Error in deleteDoctor:", error);
    throw error;
  }
};

  
  