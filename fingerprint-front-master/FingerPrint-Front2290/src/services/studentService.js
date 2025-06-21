import axios from 'axios';

const API_BASE_URL = "http://localhost:5266";
const StEmail = "adel%40example.com";


//---------------------------------------------------------------------------------------


export const fetchStudentProfile = async (StEmail) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Studets/GetStudetByEmail?Email=${StEmail}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || typeof response.data !== 'object' || Array.isArray(response.data)) {
      throw new Error("Invalid data structure received from API");
    }

    // تحويل الكائن إلى كائن ملف الطالب المطلوب داخل مصفوفة
    const studentProfiles = [{
      id: response.data.st_Code,
      displayName: response.data.st_NameEn,
      email: response.data.st_Email,
      department: response.data.faculty,
      year: response.data.year || response.data.facYearSem_ID,
      gpa: response.data.gpa,
      fingerprintRegistered: response.data.fingerprintRegistered
    }];

    return studentProfiles;
    
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return [];
  }
};


  //---------------------------------------------------------------------------------------


export const fetchTimeTable = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Studets/DashBordStudets${StEmail}`,
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
      day: item.day,
      courseCode: item.sub_Name,
      courseName: item.sub_Name,
      instructor: item.dr_NameAr,
      location: item.room_Num,
      studentsCount: item.totalStudents || 0
    }));

    return schedule;
    
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return [];
  }
};

  //---------------------------------------------------------------------------------------



export const fetchCourseAttendance = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/Subjects/${id}`,
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

    // تحويل كل عنصر في المصفوفة إلى كائن حضور المادة المطلوب
    const courseAttendance = response.data.map(item => ({
      courseCode: item.subCode,
      name: item.subName,
      instructor: item.doctor,
      credit: item.credit,
      status: item.status
    }));

    return courseAttendance;
    
  } catch (error) {
    console.error("Error fetching course attendance:", error);
    return [];
  }
};

//---------------------------------------------------------------------------------------



export const fetchAttendanceSummary = async () => {
  return {
    total: 30,
    attended: 26,
    missed: 4,
    percentage: 86.6
  };
};

export const fetchFingerprintLogs = async () => {
  try {
    // جلب سجلات البصمة
    const logsResponse = await axios.get(`${API_BASE_URL}/api/FingerprintLogs/GetAllFingerprintLogs`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!logsResponse.data) throw new Error("Failed to fetch fingerprint logs");

    const logsData = logsResponse.data;

    // جلب تفاصيل الكورسات
    const courseResponse = await axios.get(`${API_BASE_URL}/api/Attendance/GetAllSubjects`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!courseResponse.data) throw new Error("Failed to fetch course details");

    const courseData = courseResponse.data;

    // دمج البيانات وتنسيقها
    return logsData.map((log, index) => ({
      date: log.date || "2025-05-05",
      time: log.time || "09:00 AM",
      location: log.location || "Main Gate",
      result: log.result || "Success",
      courseCode: courseData[index]?.subCode || "CS201"
    }));
  } catch (error) {
    console.error("Error fetching fingerprint logs:", error);
    return [];
  }
};

export const matchFingerprint = async () => {
  const success = Math.random() > 0.2;
  return {
    success,
    message: success ? "Fingerprint matched ✅" : "Fingerprint not matched ❌"
  };
};

