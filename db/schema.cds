namespace my.worldcup;

using {
    cuid,
    managed
} from '@sap/cds/common';

@cds.autoexpose
entity teamsdata : managed {
    key Name          : String(20);
        MatchesPlayed : Integer;
        MatchesWon    : Integer;
        MatchesLost   : Integer;
        MatchesTied   : Integer;
        Points        : Integer;
        Results       : Composition of many teamresults
                            on Results.Team = $self;
}

entity team {
    key Name        : String(20);
        Players     : Composition of many players
                          on Players.Country = $self;
        TestRanking : Integer;
        ODIRanking  : Integer;
        T20Ranking  : Integer;
}

entity players {
    key Name              : String(20);
        Role              : String(20);
        Country           : Association to team;
        BattingRankInTest : Integer;
        BattingRankInODI  : Integer;
        BattingRankInT20  : Integer;
        BowlingRankInTest : Integer;
        BowlingRankInODI  : Integer;
        BowlingRankInT20  : Integer;
}

entity teamresults : cuid {
    key Team      : Association to one teamsdata;
        Opponent  : String(20);
        MatchDate : Date;
        Result    : String;
}

entity battingstats {
    key Player       : String;
        Runs         : Integer;
        HighestScore : Integer;
        Hundreds     : Integer;
        Fifties      : Integer;
        Average      : Decimal(10, 3);
        Country      : String(20);
        Fours        : Integer;
        Sixes        : Integer;
}

entity bowlingstats {
    key Player      : String;
        Wickets     : Integer;
        Economy     : Decimal(10, 2);
        Country     : String(20);
        BestBowling : String(4);
}
