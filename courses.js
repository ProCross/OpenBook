/**
 * Centralized courses dataset for all schools
 * Filter by school abbreviation using: courses.html?school=MIT (or PU, HU, etc.)
 */

export const coursesData = [
    // MIT Courses
    {
        id: 'mit-cs101',
        schoolId: 'mit',
        schoolAbbr: 'MIT',
        code: 'CS101',
        name: 'Introduction to Computer Science and Programming',
        department: 'Computer Science',
        credits: 3,
        description: 'Introduction to computer science and programming for students with little or no programming experience.'
    },
    {
        id: 'mit-cs201',
        schoolId: 'mit',
        schoolAbbr: 'MIT',
        code: 'CS201',
        name: 'Data Structures and Algorithms',
        department: 'Computer Science',
        credits: 3,
        description: 'Introduction to mathematical modeling of computational problems.'
    },
    {
        id: 'mit-math101',
        schoolId: 'mit',
        schoolAbbr: 'MIT',
        code: 'MATH101',
        name: 'Calculus I',
        department: 'Mathematics',
        credits: 3,
        description: 'Introduction to differential and integral calculus.'
    },
    {
        id: 'mit-phys101',
        schoolId: 'mit',
        schoolAbbr: 'MIT',
        code: 'PHYS101',
        name: 'Classical Mechanics',
        department: 'Physics',
        credits: 3,
        description: 'Newtonian mechanics, work, energy, and power.'
    },
    {
        id: 'mit-eecs101',
        schoolId: 'mit',
        schoolAbbr: 'MIT',
        code: 'EECS101',
        name: 'Introduction to Electrical Engineering',
        department: 'EECS',
        credits: 3,
        description: 'Fundamentals of electrical engineering and computer science.'
    },

    // Princeton Courses
    {
        id: 'pu-cos101',
        schoolId: 'princeton',
        schoolAbbr: 'PU',
        code: 'COS101',
        name: 'Introduction to Computer Science',
        department: 'Computer Science',
        credits: 3,
        description: 'Introduction to programming and computer science fundamentals.'
    },
    {
        id: 'pu-mat201',
        schoolId: 'princeton',
        schoolAbbr: 'PU',
        code: 'MAT201',
        name: 'Multivariable Calculus',
        department: 'Mathematics',
        credits: 3,
        description: 'Vectors in the plane and in three-space, partial derivatives.'
    },
    {
        id: 'pu-eco101',
        schoolId: 'princeton',
        schoolAbbr: 'PU',
        code: 'ECO101',
        name: 'Microeconomics',
        department: 'Economics',
        credits: 3,
        description: 'Introduction to microeconomic theory and analysis.'
    },
    {
        id: 'pu-phy101',
        schoolId: 'princeton',
        schoolAbbr: 'PU',
        code: 'PHY101',
        name: 'General Physics I',
        department: 'Physics',
        credits: 3,
        description: 'Mechanics, conservation laws, and thermodynamics.'
    },

    // Harvard Courses
    {
        id: 'hu-cs50',
        schoolId: 'harvard',
        schoolAbbr: 'HU',
        code: 'CS50',
        name: 'Introduction to Computer Science',
        department: 'Computer Science',
        credits: 4,
        description: 'Introduction to the intellectual enterprises of computer science.'
    },
    {
        id: 'hu-math1a',
        schoolId: 'harvard',
        schoolAbbr: 'HU',
        code: 'MATH1A',
        name: 'Introduction to Calculus',
        department: 'Mathematics',
        credits: 3,
        description: 'Introduction to calculus, including limits and derivatives.'
    },
    {
        id: 'hu-ec10',
        schoolId: 'harvard',
        schoolAbbr: 'HU',
        code: 'EC10',
        name: 'Principles of Economics',
        department: 'Economics',
        credits: 3,
        description: 'Introduction to economic analysis and policy.'
    },
    {
        id: 'hu-phys1',
        schoolId: 'harvard',
        schoolAbbr: 'HU',
        code: 'PHYS1',
        name: 'Physics I: Mechanics',
        department: 'Physics',
        credits: 3,
        description: 'Introductory mechanics and thermodynamics.'
    },

    // Stanford Courses
    {
        id: 'su-cs106a',
        schoolId: 'stanford',
        schoolAbbr: 'SU',
        code: 'CS106A',
        name: 'Programming Methodologies',
        department: 'Computer Science',
        credits: 3,
        description: 'Introduction to the engineering of computer applications.'
    },
    {
        id: 'su-math51',
        schoolId: 'stanford',
        schoolAbbr: 'SU',
        code: 'MATH51',
        name: 'Linear Algebra and Differential Calculus',
        department: 'Mathematics',
        credits: 3,
        description: 'Linear algebra and differential calculus of several variables.'
    },
    {
        id: 'su-econ1',
        schoolId: 'stanford',
        schoolAbbr: 'SU',
        code: 'ECON1',
        name: 'Principles of Economics',
        department: 'Economics',
        credits: 3,
        description: 'Introduction to economics and economic analysis.'
    },

    // Michigan State Courses
    {
        id: 'msu-cse101',
        schoolId: 'msu',
        schoolAbbr: 'MSU',
        code: 'CSE101',
        name: 'Introduction to Computer Science',
        department: 'Computer Science',
        credits: 3,
        description: 'Fundamentals of computing and programming.'
    },
    {
        id: 'msu-mth103',
        schoolId: 'msu',
        schoolAbbr: 'MSU',
        code: 'MTH103',
        name: 'College Algebra',
        department: 'Mathematics',
        credits: 3,
        description: 'Algebraic concepts and problem-solving techniques.'
    },
    {
        id: 'msu-ec201',
        schoolId: 'msu',
        schoolAbbr: 'MSU',
        code: 'EC201',
        name: 'Introduction to Microeconomics',
        department: 'Economics',
        credits: 3,
        description: 'Economic theory and policy analysis.'
    },
    {
        id: 'msu-phy183',
        schoolId: 'msu',
        schoolAbbr: 'MSU',
        code: 'PHY183',
        name: 'Physics for Scientists and Engineers I',
        department: 'Physics',
        credits: 3,
        description: 'Mechanics, thermodynamics, and waves.'
    },

    // Yale Courses
    {
        id: 'yu-cs100',
        schoolId: 'yale',
        schoolAbbr: 'YU',
        code: 'CS100',
        name: 'Introduction to Programming',
        department: 'Computer Science',
        credits: 3,
        description: 'Introduction to programming concepts and methods.'
    },
    {
        id: 'yu-math120',
        schoolId: 'yale',
        schoolAbbr: 'YU',
        code: 'MATH120',
        name: 'Calculus of Functions of Several Variables',
        department: 'Mathematics',
        credits: 3,
        description: 'Vectors, functions of several variables, and partial derivatives.'
    }
];

// Helper function to get courses by school abbreviation
export function getCoursesByAbbr(abbr) {
    return coursesData.filter(course => course.schoolAbbr === abbr);
}

// Helper function to get courses by school ID
export function getCoursesBySchoolId(schoolId) {
    return coursesData.filter(course => course.schoolId === schoolId);
}

// Helper function to get all unique departments
export function getAllDepartments() {
    const departments = new Set(coursesData.map(course => course.department));
    return Array.from(departments).sort();
}

// Helper function to search courses
export function searchCourses(query, schoolAbbr = null) {
    const lowerQuery = query.toLowerCase();
    let courses = schoolAbbr ? getCoursesByAbbr(schoolAbbr) : coursesData;
    
    return courses.filter(course => 
        course.name.toLowerCase().includes(lowerQuery) ||
        course.code.toLowerCase().includes(lowerQuery) ||
        course.department.toLowerCase().includes(lowerQuery)
    );
}

export default coursesData;