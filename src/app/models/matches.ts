/* * * ./app/models/matches.ts * * */
export class MatchesModelUI {
    constructor(
        public team1: string,
        public team2: string,
        public category: string,
        public matchlocation: string,
        public matchstart: string,
        public matchstarttime: string,
        public matchend: string,
        public matchendtime: string,
        public deadline: string,
        public deadlinetime: string,
        public multiplier: string,
    ){}
}

export class MatchesModel {
    constructor(
        public team1: string,
        public team2: string,
        public category: string,
        public matchlocation: string,
        public matchstart: string,
        public matchend: string,
        public deadline: string,
        public multiplier: number,
    ){}
}