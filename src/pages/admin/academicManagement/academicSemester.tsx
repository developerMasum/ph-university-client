import { useGetAllSemesterQuery } from "../../../routes/features/academicSemester/academicSemester";


const AcademicSemester = () => {
    const {data} = useGetAllSemesterQuery(undefined)
    console.log(data);
    return (
        <div>
            acadmic semester
        </div>
    );
};

export default AcademicSemester;