using WorldCupService as service from '../../srv/teams-srv';

annotate WorldCupService.TeamsData with @UI : { 
    SelectionFields  : [
        Name
    ],
    LineItem  : [
        {
            Label : 'Team',
            Value : Name
        },
        {
            Label : 'Played',
            Value : MatchesPlayed
        },
        {
            Label : 'Won',
            Value : MatchesWon
        },
        {
            Label : 'Lost',
            Value : MatchesLost
        },
        {
            Label : 'No Result',
            Value : MatchesTied
        },
        {
            Label : 'Points',
            Value : Points
        }
    ],
 };
