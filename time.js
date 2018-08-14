function UtcTimeToSeaOfThievesTime(utcTime)
{
    var secondsOfDay = utcTime.getHours()*60*60 + utcTime.getMinutes()*60 + utcTime.getSeconds()

    // One game month maps over half a real world day.
    // So that's 12 hours * 60 minutes * 60 seconds mapped over
    // 30 game days * 24 game hours * 60 game minutes * 60 game seconds
    var realWorldHalfDayInSeconds = 12*60*60
    var oneGameMonth = 30*24*60*60
    var secondsOfHalfDay = secondsOfDay % realWorldHalfDayInSeconds
    // In game month starts at 8 am
    var secondsOfHalfDayOffsetted = (secondsOfHalfDay - 8*60*60) % realWorldHalfDayInSeconds
    var secondsInGameMonth = secondsOfHalfDayOffsetted / realWorldHalfDayInSeconds * oneGameMonth

    var gameDay = Math.floor(secondsInGameMonth / 60 / 60 / 24)
    var gameHours = Math.floor((secondsInGameMonth - gameDay*24*60*60) / 60 / 60)
    var gameMinutes = Math.floor((secondsInGameMonth - gameDay*24*60*60 - gameHours*60*60) / 60)

    return new Date(1, 0, gameDay+1, gameHours, gameMinutes)
}

function Timespan(seconds)
{
    var hours = Math.floor(seconds / 60 / 60)
    var minutes = Math.floor(seconds - hours*60*60) / 60
    var seconds = Math.floor(seconds - hours*60*60 - minutes*60)
    
    return {
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        "toString": () => ("" + hours).padStart(2, '0') + "h"
                        + ("" + minutes).padStart(2, '0') + "m"
                        + ("" + seconds).padStart(2, '0') + "s"
    }
}

function SeaOfThievesTime()
{
    return UtcTimeToSeaOfThievesTime(NowUtc())
}

function NowUtc()
{
    var now = new Date()
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000))
}

function IsBetweenDays(date, month, dayFrom, dayTo)
{
    return date.getMonth() == month && date.getDate() >= dayFrom && date.getDate() <= dayTo
}

function RealWorldTimeUntilActive(inGameTime, inGameDayFrom, inGameDayTo)
{
    var gameDay = inGameTime.getDate()
    
    // Event is currently active
    if(gameDay <= inGameDayTo && gameDay >= inGameDayFrom)
    {
        return 0
    }
    
    var gameDaysUntilActive = inGameDayFrom - gameDay 
    
    var passedActiveWindow = gameDay > inGameDayTo
    if(passedActiveWindow)
    {
        gameDaysUntilActive += 30
    }

    // One game day is 24 minutes
    return gameDaysUntilActive * 24 * 60;
}