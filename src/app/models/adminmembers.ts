/* * * ./app/models/adminmembers.ts * * */
export class AdminMembersModel {
    constructor(
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public favteam: string,
        public roles: string,
        public paid: boolean,
    ){}
}