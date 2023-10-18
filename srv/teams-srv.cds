using my.worldcup as my from '../db/schema';

service WorldCupService {
    entity TeamsData   as projection on my.teamsdata;
    entity TeamResults as projection on my.teamresults;
};
