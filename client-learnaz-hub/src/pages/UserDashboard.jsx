/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import student from "../assets/images/student5ani.gif";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { ViewCreatedCourses, ViewEnrolledCourses } from "../components";

const UserDashboard = (props) => {
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);

  const courses = [];
  // get user id from login
  const id = props.authUser?.id;
  const role = props.authUser?.role;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // get user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!props.authUser) return;
      try {
        const res = await axiosInstance.get(`/users/${id}`);
        props.setUserData(res.data.data);
      } catch (error) {
        console.log("Error fetching user data: ", error);
      }
    };
    fetchUserData();
  }, []);

  // get all courses as suggested courses from database (for now)
  useEffect(() => {
    const fetchSuggestedCourses = async () => {
      try {
        // fetch courses from database
        const res = await axiosInstance.get("/courses");
        const courses = res.data.data;
        const myCourseSuggestion = [];
        courses.forEach((course) => {
          if (!course.studentsEnrolled?.includes(id)) {
            myCourseSuggestion.push(course);
          }
        });
        setSuggestedCourses(myCourseSuggestion);
      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    };
    fetchSuggestedCourses();
  }, []);

  // get created courses by instructor
  useEffect(() => {
    const fetchCreatedCourses = async () => {
      try {
        if (role === "instructor") {
          const createdResponse = await axiosInstance.get(
            `/courses/${role}/${id}/created`
          );
          createdResponse && setCreatedCourses(createdResponse.data.data);
        }
      } catch (error) {
        console.log("Error fetching created courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreatedCourses();
  }, [role, id]);

  // get enrolled courses by user (instructor or student)
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const enrolledResponse = await axiosInstance.get(
          `/courses/student/${id}/enrolled`
        );
        enrolledResponse && setEnrolledCourses(enrolledResponse.data.data);
      } catch (error) {
        console.log("Error fetching created courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [role, id]);

  const settings = {
    speed: 500,
    slidesToShow: 4,
    infinite: courses.length >= 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="m-0 p-0 pt-16 min-h-screen scroll">
      <div
        key={props.userData && props.userData.id}
        className="flex items-center justify-between p-16 pl-4"
      >
        <div className="text-4xl text-gray-700 font-bold pl-12">
          Welcome back, {props.userData?.firstName}
        </div>
        {props.userData && props.userData.role === "instructor" && (
          <Link
            to="/create-course"
            state={{ userId: props.userData.id }}
            className="text-white bg-gray-900 p-3 rounded-md shadow-md text-lg border hover:shadow-sm hover:text-gray-300"
            aria-label="Create a course"
          >
            Create a Course
          </Link>
        )}
      </div>
      <div className="text-gray-700 bg-gray-100 w-[100%] mx-auto py-5 px-10 flex items-center justify-center flex-col md:flex-row">
        <div>
          <img
            src={student}
            className="h-[20rem] object-cover"
            alt="Animated student studying online"
          />
        </div>
        {props.userData?.role === "instructor" ? (
          <div className="w-50 my-10 text-center">
            <h2 className="text-4xl font-bold">
              Impact the World Through Teaching
            </h2>
            <p className="text-xl pl-6">
              By becoming an instructor, you have the power to shape the future
              and make a real difference in people&rsquo;s lives.
            </p>
          </div>
        ) : (
          <div className="w-50 my-10 text-center">
            <h2 className="text-4xl font-bold">Unlock Your Potential</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Gain the skills to shape your future and achieve your dreams.
              Embrace the journey of lifelong learning and unlock new
              opportunities every step of the way. Whether {`you're`} starting a
              new career, enhancing your current path, or simply exploring your
              passions, {`we're`} here to support you. Keep pushing forward,
              keep learning, and let your knowledge shine.
            </p>
          </div>
        )}
      </div>
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
      ) : props.userData?.role === "instructor" ? (
        createdCourses.length > 0 ? (
          <ViewCreatedCourses
            createdCourses={createdCourses}
            settings={settings}
          />
        ) : (
          <div className="p-6 text-center text-4xl text-gray-500 pt-10 italic">
            You haven&apos;t created any courses yet.
          </div>
        )
      ) : enrolledCourses.length > 0 ? (
        <ViewEnrolledCourses
          enrolledCourses={enrolledCourses}
          settings={settings}
          id={props.authUser.id}
          userData={props.userData}
        />
      ) : (
        <div className="p-6 text-center text-4xl text-gray-500 pt-10 italic">
          You haven&apos;t enrolled in any courses yet. Start your learning
          journey today!
        </div>
      )}
      {props.userData?.role === "instructor" && enrolledCourses.length > 0 && (
        <ViewEnrolledCourses
          enrolledCourses={enrolledCourses}
          settings={settings}
          id={props.authUser.id}
        />
      )}
      <div className="mt-10 mx-20">
        <div className="mt-5 mb-3 md:px-32">
          <div className="mb-3 text-2xl text-gray-700 font-bold">
            <h2>Suggested Courses</h2>
          </div>
        </div>
        <div className="md:w-[70%] md:mx-auto">
          <Slider {...settings}>
            {suggestedCourses.map((course) => (
              <div key={course._id} className="max-w-52 max-h-52">
                <div className="flex flex-col bg-white border h-40 w-100 overflow-hidden">
                  <Link
                    to={
                      !props.userData.coursesEnrolled?.includes(course._id) &&
                      `/courses/preview/${course._id}`
                    }
                  >
                    <div>
                      <img
                        src={course.thumbnailURL}
                        alt={course.title}
                        className="object-fill w-full h-20"
                      />
                    </div>
                    <div className="text-sm px-2 pt-3">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-xs">{course.duration}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
