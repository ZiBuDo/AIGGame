$(document).ready(function(){
	
	$('#login').on('keyup keypress', function(e) {
		  var keyCode = e.keyCode || e.which;
		  if (keyCode === 13) { 
			e.preventDefault();
			return false;
		  }
		});
	$("#loginButton").click(function(){
		$("#loadLogin").show();
		$("#login").hide();
		//validate log in screen name and password length
		var screen = $("#screenName").val();
		var pass = $("#password").val();
		var email = $("#email").val();
		var success = true;
		$("#passwordGroup").removeClass("has-error");
		$("#screenGroup").removeClass("has-error");
		$("#emailGroup").removeClass("has-error");
		var msg = "";
		if(countWords(screen) != 1 || screen.indexOf("|") != -1){
			success = false;
			$("#screenGroup").addClass("has-error");
			msg +=  "Screen Name must be one word and not contain | characters.";
		}
		if(pass.length < 5){
			success = false;
			$("#passwordGroup").addClass("has-error");
			msg +=  "Password must be at least 6 characters.";
		}
		if(email.search(".edu") != -1){
			//email cannot be an .edu
			success = false;
			$("#emailGroup").addClass("has-error");
			msg += "Cannot support .edu email addresses.";
		}
		if(success == true){
			var info = $('#login').serialize();
			loginFunction(info);
		}else{
			$("#loadLogin").hide();
			$("#infoLogin").show();
			$("#login").show();
			$("#infoLoginContent").html(msg);
		}
		
	});

});

function loginFunction(info){
	$.ajax({
	   url: 'assets/php/log.php',
	   data: info,
	   error: function() {
		  $("#loadLogin").fadeOut("slow");
		  $("#login").show();
		  
	   },
	   dataType: 'text',
	   success: function(data) {
		   $("#loadLogin").hide();
			//handle exit codes
			console.log(data);
			if(data == 0){
				window.location.href = "http://projects.miscthings.xyz/AIG/";
			}else if(data == 1){
				$("#infoLogin").show();
				$("#login").show();
				$("#infoLoginContent").html("You have signed up, please activate your email account to log in!");
			}else if(data == 2){
				$("#infoLogin").show();
				$("#login").show();
				$("#infoLoginContent").html("That Screen Name is already in use sorry!");
			}else if(data == 3){
				$("#infoLogin").show();
				$("#login").show();
				$("#infoLoginContent").html("Email is incorrect or Screen Name is already in use!");
			}else if(data == 4){
				$("#infoLogin").show();
				$("#login").show();
				$("#infoLoginContent").html("Email is already in use!");
			}else if(data == 5){
				$("#infoLogin").show();
				$("#login").show();
				$("#infoLoginContent").html("Email needs to be activated");
			}else if(data == 6){
				$("#passwordGroup").addClass("has-error");
				$("#infoLogin").show();
				$("#login").show();
				$("#infoLoginContent").html("Password is Incorrect!");
			}
	   },
	   type: 'GET'
	});
	
}

function countWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    return s.split(' ').length;
}


function closeInfo(){
	$("#infoPanel").hide();
}
function closeInfoLogin(){
	$("#infoLogin").hide();
}
function logOut(){
	$.ajax({
	   url: 'assets/php/logout.php',
	   error: function() {
		  
		  
	   },
	   dataType: 'text',
	   success: function(data) {
		   window.location.href = "http://projects.miscthings.xyz/AIG/";
	   },
	   type: 'GET'
	});
	
}
function addFriend(string){
	var arr = string.split("|");
	var name = arr[0];
	var risk = arr[1];
	$("#searchShow" + name).hide();
	var src = $("#search" + name).attr("src");
	if($("#friends").html() == "<h4>No Friends Yet</h4>"){
		$("#friends").html("<h4><img src='"+src+"'/> &nbsp; "+name+" <button type='button' data-toggle='modal' data-target='#friendChart' class='btn btn-default' onclick=\"showRisk('"+risk+"')\">Risk</button> &nbsp; <button type='button' class='btn btn-danger' onclick=\"removeFriend('"+name+"')\">X</button></h4>");
	}else{
		var html = $("#friends").html();
		$("#friends").html(html+"<h4 id='friend"+name+"'><img src='"+src+"'/> &nbsp; "+name+" <button type='button' data-toggle='modal' data-target='#friendChart' class='btn btn-default' onclick=\"showRisk('"+risk+"')\">Risk</button> &nbsp; <button type='button' class='btn btn-danger' onclick=\"removeFriend('"+name+"')\">X</button></h4>");

	}
	$.ajax({
	   url: 'assets/php/social.php?request=addFriend&name='+name+'&email='+emailSess,
	   error: function() {
	   },
	   dataType: 'text',
	   success: function(data) {
		   
	   },
	   type: 'GET'
	});
	
	
}
function sendScore(score){
	var riskNew = $.parseJSON(riskSess);
	var add;
	if(score > 150){
		add = (score-150)/10;
		riskNew[0] = riskNew[0] + add;
		riskNew[1] += (Math.random() * (100 - -100) + -100) / 20;
		riskNew[2] = riskNew[2] - add;
		riskNew[3] += (Math.random() * (100 - -100) + -100) / 20;
		riskNew[4] = riskNew[4] + add;
		riskNew[5] += (Math.random() * (100 - -100) + -100) / 20;
		riskNew[6] += (Math.random() * (100 - -100) + -100) / 20;
	}else{
		add = (150-score)/10;
		riskNew[0] = riskNew[0] - add;
		riskNew[1] += (Math.random() * (100 - -100) + -100) / 20;
		riskNew[2] = riskNew[2] + add;
		riskNew[3] += (Math.random() * (100 - -100) + -100) / 20;
		riskNew[4] = riskNew[4] - add;
		riskNew[5] += (Math.random() * (100 - -100) + -100) / 20;
		riskNew[6] += (Math.random() * (100 - -100) + -100) / 20;
	}
	riskSess = JSON.stringify(riskNew); //make changes on client side
	$.ajax({
	   url: 'assets/php/social.php?request=minigame&risk='+JSON.stringify(riskNew)+'&email='+emailSess,
	   error: function() {
	   },
	   dataType: 'text',
	   success: function(data) {
		   
	   },
	   type: 'GET'
	});
}
function removeFriend(name){
	$("#friend" + name).hide();
	$.ajax({
	   url: 'assets/php/social.php?request=removeFriend&name='+name+'&email='+emailSess,
	   error: function() {
	   },
	   dataType: 'text',
	   success: function(data) {
		   
	   },
	   type: 'GET'
	});
	
}
function showRisk(risk){
	risk = $.parseJSON(risk);
	var ctx = document.getElementById("friendRiskChart");
	var data = {
    labels: ["Avoidance", "Outsource", "Acceptance", "Insurance", "Indemnity", "Control", "Technology"],
    datasets: [
			{	
				label: "Risk",
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "rgba(255,99,132,1)",
				pointBackgroundColor: "rgba(255,99,132,1)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(255,99,132,1)",
				data: risk
			}
		]
	};

	var myRadarChart = new Chart(ctx, {
		type: 'radar',
		data: data,
		options: {
            scale: {
                ticks: {
                    beginAtZero: true,
					min: 0,
					max: 100,
					stepSize: 20,
					maxTicksLimit: 5
                }
            }
    }
	});
	myRadarChart.options.legend.display = false; 
	myRadarChart.options.tooltips.enabled = false;
}
function riskProfile(){
		var risk = $.parseJSON(riskSess);
		var ctx = document.getElementById("riskChart");
		var data = {
		labels: ["Avoidance", "Outsource", "Acceptance", "Insurance", "Indemnity", "Control", "Technology"],
		datasets: [
				{	
					label: "Risk",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					pointBackgroundColor: "rgba(255,99,132,1)",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(255,99,132,1)",
					data: risk
				}
			]
		};

		var myRadarChart = new Chart(ctx, {
			type: 'radar',
			data: data,
			options: {
				scale: {
					ticks: {
						beginAtZero: true,
						min: 0,
						max: 100,
						stepSize: 20,
						maxTicksLimit: 5
					}
				}
		}
		});
		myRadarChart.options.legend.display = false; 
		myRadarChart.options.tooltips.enabled = false;
}
function runSimulation(){
	$('#simulationModal').modal('show');
	var risk = $.parseJSON(riskSess);
	var riskO = $.parseJSON(extraRisks);
	var riskN = $.parseJSON(extraNames);
	var av = risk[0];
	var out = risk[1];
	var acc = risk[2];
	var ins = risk[3];
	var ind = risk[4];
	var con = risk[5];
	var tec = risk[6];
	var safe = av + out + con + tec;
	var risk = acc + ins + ind;
	var safest = [safe];
	var riskiest = [risk];
	for(var i = 0; i < riskO.length; i++){
		var tmp = $.parseJSON(riskO[i]);
		av = (av + tmp[0])/2;
		out = (out + tmp[1])/2;
		acc = (acc + tmp[2])/2;
		ins = (ins + tmp[3])/2;
		ind = (ind + tmp[4])/2;
		con = (con + tmp[5])/2;
		tec = (tec + tmp[6])/2;
		safe = tmp[0] + tmp[1] + tmp[5] + tmp[6];
		risk = tmp[2] + tmp[3] + tmp[4];
		safest.push(safe);
		riskiest.push(risk);
	}
	var s = safest.indexOf(Math.max.apply(window,safest));
	var r = riskiest.indexOf(Math.max.apply(window,riskiest));
	if(s == 0){
		$("#simSafest").html("Safest: <b>"+screenSess + "</b>");
	}else{
		s = s - 1;
		$("#simSafest").html("Safest: <b>"+riskN[s] + "</b>");
	}
	if(r == 0){
		$("#simRiskiest").html("Riskiest: <b>"+screenSess + "</b>");
	}else{
		r = r - 1;
		$("#simRiskiest").html("Riskiest: <b>"+riskN[r] + "</b>");
	}
	safe = av + out + con + tec;
	risk = acc + ins + ind;
	if(safe == 0){
		safe = 1;
	}
	if(acc == 0){
		acc = 1;
	}
	var econ = risk/safe;
	var lifespan = safe / acc;
	var environment = (tec + av) /acc;
	
	if(econ < .6){
		$("#simEconomy").html("Economy: <b style='color:red'>Bad...</b>");
	}else if(econ > .6 && econ < .9){
		$("#simEconomy").html("Economy: <b style='color:black'>Okay.</b>");
	}else{
		$("#simEconomy").html("Economy: <b style='color:green'>Good!</b>");
	}
	
	if(lifespan < 5){
		$("#simLifespan").html("Lifespan: <b style='color:red'>Bad...</b>");
	}else if(lifespan > 5 && lifespan < 6){
		$("#simLifespan").html("Lifespan: <b style='color:black'>Okay.</b>");
	}else{
		$("#simLifespan").html("Lifespan: <b style='color:green'>Good!</b>");
	}
	
	if(environment < 1.6){
		$("#simEnvironment").html("Environment: <b style='color:red'>Bad...</b>");
	}else if(environment > 1.6 && environment < 2.7){
		$("#simEnvironment").html("Environment: <b style='color:black'>Okay.</b>");
	}else{
		$("#simEnvironment").html("Environment: <b style='color:green'>Good!</b>");
	}
	
	var health = [];
	var pollution = [];
	var happiness = [];
	var safety = [];
	
	for(var t = 0; t < 1.05; t += .05){
		var tmp = (tec+con-ins-ind)*t + 35;
		if(tmp < 0){
			tmp = 0;
		}
		if(tmp > 100){
			tmp = 100;
		}
		health.push(tmp);
		tmp = (t*(acc-((tec+av)/2))) + 40;
		if(tmp < 0){
			tmp = 0;
		}
		if(tmp > 100){
			tmp = 100;
		}
		pollution.push(tmp);
		tmp = (acc-av)*t + 45;
		if(tmp < 0){
			tmp = 0;
		}
		if(tmp > 100){
			tmp = 100;
		}
		happiness.push(tmp);
		tmp = (safe-risk-50)*t + 45;
		if(tmp < 0){
			tmp = 0;
		}
		if(tmp > 100){
			tmp = 100;
		}
		safety.push(tmp);
	}
	
	var ctx = document.getElementById("simulationChart");
		var data = {
		labels: ["0","5","10","15","20","25","30","35","40","45","50","55","60","65","70","75","80","85","90","95","100"],
		datasets: [
        {
            label: "Happiness",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(0,153,51,0.4)",
            borderColor: "rgba(0,153,51,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(0,153,51,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(0,153,51,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: happiness,
            spanGaps: false,
        },
		{
            label: "Pollution",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(178,34,34,0.4)",
            borderColor: "rgba(178,34,34,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(178,34,34,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(178,34,34,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: pollution,
            spanGaps: false,
        },
		{
            label: "Health",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: health,
            spanGaps: false,
        },
		{
            label: "Safety",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(47,79,79,0.4)",
            borderColor: "rgba(47,79,79,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(47,79,79,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(47,79,79,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: safety,
            spanGaps: false,
        }
    ]
		};
		var ticks = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
		var mySimChart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				scale: {
					ticks: {
						beginAtZero: true,
					}
				},
				yAxes: [{
				ticks: {
				  autoSkip: false,
				  min: ticks[ticks.length - 1],
				  max: ticks[0]
				},
				afterBuildTicks: function(scale) {
				  scale.ticks = ticks;
				  return;
				},
				beforeUpdate: function(oScale) {
				  return;
				}
			  }]
			}
		
		});
		mySimChart.render();
	
}
function spritePick(name){
	var arr = name.split("|");
	var val = arr[0];
	var img = arr[1];
	$("#spriteName").val(val);
	$("#currentSprite").attr("src",img);
}

function saveChanges(){
	var sprite = $("#spriteName").val();
	$.ajax({
	   url: 'assets/php/savechanges.php?sprite=' + sprite + "&email=" + emailSess,
	   error: function() {
	   },
	   dataType: 'text',
	   success: function(data) {
		   alert("Changes have been saved");
		   window.location.href = "http://projects.miscthings.xyz/AIG/";
	   },
	   type: 'GET'
	});
}
