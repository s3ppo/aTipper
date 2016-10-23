/* * * ./app/models/matches.ts * * */
export class MatchesModel {
    constructor(
        public team1: string,
        public team2: string,
        public category: string,
        public matchstart: string,
        public matchend: string,
        public deadline: string,
        public multiplier: string,
    ){}
}