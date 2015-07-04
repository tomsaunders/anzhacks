/*
stats I worked out based on:

http://www.anzacday.org.au/history/ww1/anecdotes/stats01.html#percentage of enlistments to population
https://www.awm.gov.au/encyclopedia/enlistment/ww1/

total number 416809 enlisted - represented 8.5% australians 38.7% population
total population of australia - 4.9 million 
total enlistments last year (1914) - 52561 - 12.6% total enlistment
total enlistments this year (1915) - 165912 - 40% total enlistment
total enlistments remainder of war (1916 - 18) 47.5% total enlistment
total embarkations of 336931 (81%) - served overseas
total deaths  61720 - 18.3% of enlistees who embarked
total deaths in next year 13870 representing 22% of total deaths
total injured 155000 - 46% people of enlistees who embarked
total taken prisoner of war - 4044 represents 1.2% of enlistees who embarked
total deaths while prisoners 397 represents 10% of prisoners of war

assume that all friends passed to the app are 'eligible' to enlist

*/


// works out percentage of friends affected by specific statistic (if that makes sense ie if pass
// in 100 and 0.387 then 38 of my friends are )

function getFriendsCount(inCount, inPercentage) {
	var percentageOfFriends = inCount * inPercentage;
	var myNumber = parseInt(percentageOfFriends);
	myNumber = Math.round(myNumber)
    return myNumber;
}

// object definition includes name, statistic and text description
function statisticalObject(inName,inPercentage,inText) {
    this.name = inName;
    this.percentage = inPercentage;
    this.text = inText;
}

//creates javascript objects for each statistic & a description of that statistic
function getData(){
	dataArray = [];
	
	//unused
var myStatisticalObject = new statisticalObject("percentEnlisted",0.387," of your friends Enlisted in the Army representing 38.7% of the population 18 - 44");
	dataArray.push(myStatisticalObject);
	
	
	//total enlistments last year (1914) - 52561 - 12.6% total enlistment
var myStatisticalObject = new statisticalObject("enlistLastYear",0.126," of your friends Enlisted last year (1914)");
	dataArray.push(myStatisticalObject);
	
	//total enlistments this year (1915) - 165912 - 40% total enlistment
var myStatisticalObject = new statisticalObject("enlistthisYear",0.4," of your friends will enlist this year (1915)");
	dataArray.push(myStatisticalObject);
	
	
	//total enlistments remainder of war (1916 - 18) 47.5% total enlistment
var myStatisticalObject = new statisticalObject("enlistRemaining",0.475," of your friends will enlist in the remaining years of WW1");
	dataArray.push(myStatisticalObject);
	
	
	//total embarkations of 336931 (81%) - served overseas
var myStatisticalObject = new statisticalObject("embarkations",0.81," of your friends will serve overseas during WW1");
	dataArray.push(myStatisticalObject);
	
	//total deaths  61720 - 18.3% of enlistees who embarked
var myStatisticalObject = new statisticalObject("deaths",0.183," of your friends serving overseas will die during WW1");
	dataArray.push(myStatisticalObject);


   //total injured 155000 - 46% people of enlistees who embarked
var myStatisticalObject = new statisticalObject("injuries",0.46," of your friends serving overseas will sustain Injuries during WW1");
	dataArray.push(myStatisticalObject);	
	
	//total taken prisoner of war - 4044 represents 1.2% of enlistees who embarked
var myStatisticalObject = new statisticalObject("pow",0.012," of your friends serving overseas will be taken prisoner during WW1");
	dataArray.push(myStatisticalObject);
	
	
	//total deaths while prisoners 397 represents 10% of prisoners of war
var myStatisticalObject = new statisticalObject("powDeaths",0.1," of your friends taken prisoner during WW1 will die ");
	dataArray.push(myStatisticalObject);
	
	return dataArray;
}