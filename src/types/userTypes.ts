import { CourseData } from './';

export interface User {
  id: number;
  dni: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  admin?: boolean;
  coursePurchaseRecords?: Array<{
    id: number;
    purchaseAt: Date;
    courses: Array<{ title: string }>;
  }>;
}

export interface UserData {
  id?: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface usersResponse {
  users: User[];
}

export interface userCourses {
  courses: CourseData[];
}

export interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: string;
  onDelete: (userId: number) => void;
}
