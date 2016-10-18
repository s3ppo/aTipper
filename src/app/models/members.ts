/* * * ./app/models/members.ts * * */
export class MembersModel {
    constructor(
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public favteam: string
    ){}
}