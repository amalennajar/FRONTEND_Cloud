import { UserDetails } from "src/app/core/models/userDetails";

export class DayOff {
    public id: string;
    public startDate: Date = new Date();
    public endDate: Date = new Date();
    public reason: string;
    public status: string;
    public user: UserDetails

    constructor(dayOff) {
        this.id = dayOff.id || "";
        this.startDate = dayOff.startDate|| "";
        this.endDate = dayOff.endDate|| "";
        this.reason = dayOff.reason || "";
        this.status = dayOff.status || null ;
        this.user = dayOff.user|| "";
    }
}
