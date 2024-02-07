import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  // console.log(params);
  return <div>details page of {studentId} here...!</div>;
};

export default StudentDetails;
