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

entity teamresults: cuid {
    key Team      : Association to one teamsdata;
        Opponent  : String(20);
        MatchDate : Date;
        Result    : String;
}
