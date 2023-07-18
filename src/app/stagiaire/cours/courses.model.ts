import { UserDetails } from "src/app/core/models/userDetails";
export class Course {
    id: string;
    course_name: string;
    date: Date = new Date();
    duration: string ;
    description: string;
    doctor: UserDetails ;
    stagiaires: UserDetails[];

    constructor(course: any) {
        this.id = course.id || "" ;
        this.course_name = course.course_name || "";
        this.date = course.date || "";
        this.description = course.description || "";
        this.duration = course.duration|| "";
        this.doctor = course.doctor || null;
    }
}
