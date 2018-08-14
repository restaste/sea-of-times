var timedEvents = 
[
    {
        "title": "The Fools Stride",
        "location": "The Shores of Plenty, North West of Smuggler's Bay",
        "timeUntilActive": (realWorldTime, inGameTime) => IsBetweenDays(realWorldTime, 7, 8, 14) ? RealWorldTimeUntilActive(inGameTime, 1, 10) : -1,
        "description": "Breaks crews legs",
    },
    {
        "title": "The Treacherous Bounty",
        "location": "The Ancient Isles, West of Shark Bait Cove",
        "timeUntilActive": (realWorldTime, inGameTime) => IsBetweenDays(realWorldTime, 7, 8, 14) ? RealWorldTimeUntilActive(inGameTime, 11, 20) : -1,
        "description": "Players can't interact with resource barrels"
    },
    {
        "title": "The Enslaving Chain",
        "location": "The Wilds, East of Marauder's Arch",
        "timeUntilActive": (realWorldTime, inGameTime) => IsBetweenDays(realWorldTime, 7, 8, 14) ? RealWorldTimeUntilActive(inGameTime, 21, 30) : -1,
        "description": "Raises or lowers anchor"
    },
    {
        "title": "The Sandman's Revenge",
        "location": "The Shores of Plenty, North West of Smuggler's Bay",
        "timeUntilActive": (realWorldTime, inGameTime) => IsBetweenDays(realWorldTime, 7, 15, 21) ? RealWorldTimeUntilActive(inGameTime, 1, 10) : -1,
        "description": "Forces crew to sleep?"
    },
    {
        "title": "The Black Viper",
        "location": "The Ancient Isles, West of Shark Bait Cove",
        "timeUntilActive": (realWorldTime, inGameTime) => IsBetweenDays(realWorldTime, 7, 15, 21) ? RealWorldTimeUntilActive(inGameTime, 11, 20) : -1,
        "description": " Poisons crew?"
    },
    {
        "title": "The Siren's Gale",
        "location": "The Wilds, East of Marauder's Arch",
        "timeUntilActive": (realWorldTime, inGameTime) => IsBetweenDays(realWorldTime, 7, 15, 21) ? RealWorldTimeUntilActive(inGameTime, 21, 30) : -1,
        "description": " Raises/lowers ship's sails?"
    }
]

function* TimedEventsToShow()
{
    var nowUtc = NowUtc()
    var gameTime = SeaOfThievesTime()
    for(var i = 0 ; i < timedEvents.length ; ++i)
    {
        var evt = timedEvents[i]
        var timeUntilActive = evt.timeUntilActive(nowUtc, gameTime)
        if(timeUntilActive == 0)
        {
            yield evt
        }
    }
}

function* UpcomingEvents()
{
    var nowUtc = NowUtc()
    var gameTime = SeaOfThievesTime()
    var sortedTimedEvents = timedEvents.sort((e1, e2) => e1.timeUntilActive(nowUtc, gameTime) - e2.timeUntilActive(nowUtc, gameTime))
    for(var i = 0 ; i < sortedTimedEvents.length ; ++i)
    {
        var evt = sortedTimedEvents[i]
        var timeUntilActive = evt.timeUntilActive(nowUtc, gameTime)
        if(timeUntilActive > 0)
        {
            yield {
                "timeUntilActive": timeUntilActive,
                "event": evt
            }
        }
    }
}