function DisplayGameTime()
{
    var gameTime = SeaOfThievesTime()
    var strHours = ("" + gameTime.getHours()).padStart(2, '0')
    var strMinutes = ("" + gameTime.getMinutes()).padStart(2, '0')
    document.getElementById("GameTime").innerHTML = "Day " + gameTime.getDate() + ", " + strHours + ":" + strMinutes
}

function DisplayActiveElements()
{
    var template = document.getElementById("active-event-template").innerHTML
    var templatedHtml = ""
    var timedEventsToShow = [...TimedEventsToShow()]
    for(var i = 0 ; i < timedEventsToShow.length ; ++i)
    {
        templatedHtml += template.replace(/{{title}}/g, timedEventsToShow[i].title)
                                 .replace(/{{location}}/g, timedEventsToShow[i].location)
                                 .replace(/{{description}}/g, timedEventsToShow[i].description)
    }
    
    document.getElementById("active-event-list").innerHTML = templatedHtml    
}

function DisplayUpcomingElements()
{
    var template = document.getElementById("upcoming-event-template").innerHTML
    var templatedHtml = ""
    var upcomingEvents = [...UpcomingEvents()]
    for(var i = 0 ; i < upcomingEvents.length ; ++i)
    {
        var strTimeUntilActive = 
        templatedHtml += template.replace(/{{title}}/g, upcomingEvents[i].event.title)
                                 .replace(/{{location}}/g, upcomingEvents[i].event.location)
                                 .replace(/{{description}}/g, upcomingEvents[i].event.description)
                                 .replace(/{{timeUntilActive}}/g, Timespan(upcomingEvents[i].timeUntilActive).toString())
    }
    
    document.getElementById("upcoming-event-list").innerHTML = templatedHtml    
}

function Tick()
{
    DisplayGameTime()
    DisplayActiveElements()
    DisplayUpcomingElements()
}

window.setInterval(Tick, 500)