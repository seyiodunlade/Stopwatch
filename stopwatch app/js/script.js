

	$(document).ready(function() {
		
		//DECLARE VARIABLES
		var mode = 0; //set the mode to false i.e 0 when the start button hasn't been clicked
		var lapCounter = 0; //this sets the counter that is incresed by 1 after every centisecond [THE VALUE WOULD BE CONVERT4ED TO MINS,SECS AND CENISECONDS AFTER USING S.I units]
		var timeCounter = 0; //this sets the counter that is incresed by 1 after every centisecond [THE VALUE WOULD BE CONVERT4ED TO MINS,SECS AND CENISECONDS AFTER USING S.I units]
		var lapNumber = 0; //this sets the number of laps when the lap button is clicked
		var action; //variable that would be used for the setInterval();
		
		var lapMinutes,lapSeconds,lapCentiSeconds; //these hold the converted time and would be shown in the lap div
		
		var timeMinutes, timeSeconds, timeCentiSeconds; //these hold the converted time and would be shown in the time div
	
	
	
		//WHEN THE STOPWATCH APP IS LOADED 
			
			//hide other buttons except the start and lap buttons
			hideShowButtons("#startbutton","#lapbutton");
		
		//WHEN THE START BUTTON IS CLICKED
			$("#startbutton").click(function() {
				
				//change the mode value to 1 OR TRUE 
				mode = 1;
				
				//hide other buttons except the stop and lap buttons
				hideShowButtons("#stopbutton","#lapbutton");
				
				//Start lapCounter and timeCounter using the startAction() function
				
				startAction();
			
			
				
			
			
			
			});
			
			
	
		//WHEN THE STOP BUTTON IS CLICKED
				
			$("#stopbutton").click(function() {
				
				//hide other buttons except the resume and lap buttons
				hideShowButtons("#resumebutton","#resetbutton");
				
				//stop the counters using clearInterv on the variable action
				clearInterval(action);
				
			});
		
		
		
		//WHEN THE RESET BUTTON IS CLICKED
		
			$("#resetbutton").click(function() {
				
				//hide other buttons except the start and lap buttons
				hideShowButtons("#startbutton","#lapbutton");
				
				//reload the page
				location.reload();
			});
	
	
	
		//WHEN THE RESUME BUTTON IS CLICKED
			
			$("#resumebutton").click(function() {
				
				//hide other buttons except the stop and lap buttons
				hideShowButtons("#stopbutton","#lapbutton");
				
				//Start lapCounter and timeCounter using the startAction() function
				
				startAction();
				
				
			});
		
		
		//WHEN THE LAPBUTTON IS CLICKED
		
			$("#lapbutton").click(function() {
				
				//check if mode is  set to true
				if (mode){
					//STOP timeCounter and lapCounter
					clearInterval(action);
					
					//Reset the lapCounter
					lapCounter = 0;
					
					//Add the details of the lap to the  div lapBox
					addDetails();
					
					//Start lapCounter and timeCounter using the startAction() function
					startAction();
				
				}
				
				
			});
		
		//FUNCTIONS
		function startAction() {
			
			action = setInterval(function(){
					
					lapCounter++;
					//Control the max value (100 min) of lapCounter 
					if (lapCounter == 100*60*100){
						lapCounter = 0;
					}
					
					timeCounter++;
					//Control the max value (100 min) of timeCounter 
					if (timeCounter == 100*60*100){
						timeCounter = 0;
					}
					
					//conversion of the lapCounter to lapMinutes, lapSeconds and lapCentiseconds
					
					//conversion of lapCounter to lapMinutes [1min = 60 x 100centiseconds]
					lapMinutes = Math.floor(lapCounter/6000);
					
					//conversion of lapCounter to lapSeconds [1sec = 100centiseconds]
					lapSeconds = Math.floor((lapCounter%6000)/100);
					
					//conversion to lapCentiseconds 
					lapCentiSeconds = (lapCounter%6000)%100;
					
					
					//conversion of the timeCounter to timeMinutes, timeSeconds and timeCentiseconds
					
					//conversion of lapCounter to lapMinutes [1min = 60 x 100centiseconds]
					timeMinutes = changeNumber(Math.floor(timeCounter/6000));
					
					//conversion of lapCounter to lapSeconds [1sec = 100centiseconds]
					timeSeconds = changeNumber(Math.floor((timeCounter%6000)/100));
					
					//conversion to lapCentiseconds 
					timeCentiSeconds = changeNumber((timeCounter%6000)%100);
					
					//GET ALL THE VALUES FOR THE variables lapminutes, lapseconds, lapcentiseconds and update them into the <spans> with ids lapMinutesbox,  and lapCentiSecondsbox
					$("#lapMinutesbox").text(changeNumber(lapMinutes));
					$("#lapSecondsbox").text(changeNumber(lapSeconds));
					$("#lapCentiSecondsbox").text(changeNumber(lapCentiSeconds));

					//GET ALL THE VALUES FOR THE variables timeminutes, timeseconds, timecentiseconds and update them into the <spans> with ids timeMinutesbox,  and timeCentiSecondsbox
					$("#timeMinutesbox").text(timeMinutes);
					$("#timeSecondsbox").text(timeSeconds);
					$("#timeCentiSecondsbox").text(timeCentiSeconds);
				
				},10);
		}
		//hide some buttons and show other buttons
		function hideShowButtons(x,y){
			$(".button").hide();
			$(x).show();
			$(y).show();
		}
	
		
	
		//add zero to the front of each number less than 0
		function changeNumber(Num){
			if(Num < 10){
				return '0' + Num;
			}else{
				return Num;
			}
		}
	
	
		function addDetails() {
			
			//Increase the lapNumber(initially at zero) everytime the function is run
			lapNumber++;
			
			//Assign the lap details to a variable
			var showLapDetails = '<div class="showLapsContent">' + 
									
									'<div class="lapDetails">' + 'Lap' + lapNumber + '</div>' +
									
									'<div class="lapTimeDetails">' +
									
										'<span>' + changeNumber(lapMinutes) +'</span>:' +
										
										'<span>' + changeNumber(lapSeconds) +'</span>:' +
										
										'<span>' + changeNumber(lapCentiSeconds) +'</span>' +

									'</div>' +
			
								'</div>';
								
			
			//Prepend the variable to the div lapBox
			$("#lapBox").prepend(showLapDetails);
			
			
		}
	});