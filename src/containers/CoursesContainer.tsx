import { useEffect, useState } from 'react';
import { loadCourses } from '../utils';
import { CourseData } from '../types';
import { CourseList } from '../components';
import { deleteCourse } from '../services';
import { AddCourseContainer } from '.';

export function CoursesContainer() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  useEffect(() => {
    loadCourses(setCourses, setError, setIsLoading);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleEdit = (course: CourseData) => {
    setSelectedCourse(course);
  };

  const handleDelete = async (courseId: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this course?'
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteCourse(courseId);
      console.log('hey there!');
      updateList(courseId);
    } catch (err) {
      setError('Error deleting course: ' + (err as Error).message);
    }
  };

  const updateList = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
    console.log('im here!', courses);
  };

  const handleCancelEdit = () => {
    setSelectedCourse(null);
    loadCourses(setCourses, setError, setIsLoading);
  };

  const filteredCourses = courses.filter((course) =>
    `${course.title}`.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      {selectedCourse ? (
        <AddCourseContainer
          course={selectedCourse}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <CourseList
          courses={filteredCourses}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}
