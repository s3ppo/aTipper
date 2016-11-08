/* * * ./app/models/tipps.ts * * */
export class TippsModel {
    constructor(
        public user: string,
        public matchid: string,
        public tipp1: number,
        public tipp2: number,
    ){}
}