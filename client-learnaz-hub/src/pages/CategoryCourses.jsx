/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import axios from "axios";

function CategoryCourses(props) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { category } = useParams();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${baseUrl}/courses/category/${category}`;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // get all courses based on the selected category
        const res = await axios.get(apiUrl);
        setCourses(res.data.data);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [apiUrl]);

  return (
    <div className="mt-20">
      <div className="bg-gray-800 text-white flex justify-center items-center h-40">
        <h1 className="font-serif font-bold text-4xl capitalize">{category} Courses</h1>
      </div>
      <div className="w-[70%] flex flex-col items-start mx-auto my-5 p-7 border shadow-sm">
        <h3 className="font-bold mb-1.5 uppercase">
          {category} related courses
        </h3>
        <p className="text-xl font-thin">
          Find all the courses related to <b>{category}</b> here
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5 px-28">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <RotatingLines
              height="80"
              width="80"
              strokeWidth="5"
              animationDuration="0.75"
              strokeColor="#848884"
              ariaLabel="rotating-lines-loading"
              visible={true}
            />
          </div>
        ) : courses?.length > 0 ? (
          courses?.map((course, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-200 shadow-md"
            >
              <Link
                to={
                  course?.studentsEnrolled?.includes(props.userData._id)
                    ? `/course/course-content/${course._id}`
                    : `/courses/preview/${course._id}`
                }
              >
                <img
                  src={course.thumbnailURL}
                  alt={course.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 mb-2 font-serif">
                  Author: {course.author}
                </p>
                <p className="text-gray-700 mb-2 font-serif">
                  Number Enrolled: {course.numberEnrolled}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No courses available for this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default CategoryCourses;
