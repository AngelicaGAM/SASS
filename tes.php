<script language="javascript" type="text/javascript">
/* Visit http://www.yaldex.com/ for full source code
and get more free JavaScript, CSS and DHTML scripts! */
<!-- Begin
function getTime() {
now = new Date();
y2k = new Date("Jan 1 2055 14:00:00");
days = (y2k - now) / 1000 / 60 / 60 / 24;
daysRound = Math.floor(days);
hours = (y2k - now) / 1000 / 60 / 60 - (24 * daysRound);
hoursRound = Math.floor(hours);
minutes = (y2k - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
minutesRound = Math.floor(minutes);
seconds = (y2k - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
secondsRound = Math.round(seconds);
sec = (secondsRound == 1) ? " second." : " seconds.";
min = (minutesRound == 1) ? " minute" : " minutes, ";
hr = (hoursRound == 1) ? " hour" : " hours, ";
dy = (daysRound == 1)  ? " day" : " days, "
document.timeForm.input1.value = "Time remaining: " + daysRound  + dy + hoursRound + hr + minutesRound + min + secondsRound + sec;
newtime = window.setTimeout("getTime();", 1000);
}
window.onload=getTime;
//  End -->
</script>
Date:  Jan 1, 2055 2:00:00 p.m.
<form name=timeForm>
<input type=text name=input1 size=70 border-style="none" style="border-bottom: 0px solid; border-left: 0px solid;border-right: 0px solid;border-top: 0px solid;font:14px arial, helvetica,sans-serif">
</form>