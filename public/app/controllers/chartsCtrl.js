//inject the stuff service into main Angular module
angular.module('chartsCtrl',[])	
.controller('chartController', ['$scope', '$http', '$window', '$location', '$timeout', function ($scope, $http, $window, $location, $timeout) {

	$http.get('http://localhost:8080/api/pie-chart').success(function(result){
    	var dataSets = [];
    	var labels = [];
    	angular.forEach(result, function(obj){
    		if(obj.labels){
    			labels = obj.labels
    		}
    		if(obj.datasets){
    			angular.forEach(obj.datasets, function(res){
					if(res.fillColor){
						dataSets.push(res);
					}
				});
    		}
    	});	
		var areaChartCanvas = $('#areaChart').get(0).getContext('2d');

		var areaChart       = new Chart(areaChartCanvas)

	    var areaChartData = {
	      labels  : labels,
	      datasets: dataSets
	    }


	    var areaChartOptions = {
	      //Boolean - If we should show the scale at all
	      showScale               : true,
	      //Boolean - Whether grid lines are shown across the chart
	      scaleShowGridLines      : false,
	      //String - Colour of the grid lines
	      scaleGridLineColor      : 'rgba(0,0,0,.05)',
	      //Number - Width of the grid lines
	      scaleGridLineWidth      : 1,
	      //Boolean - Whether to show horizontal lines (except X axis)
	      scaleShowHorizontalLines: true,
	      //Boolean - Whether to show vertical lines (except Y axis)
	      scaleShowVerticalLines  : true,
	      //Boolean - Whether the line is curved between points
	      bezierCurve             : true,
	      //Number - Tension of the bezier curve between points
	      bezierCurveTension      : 0.3,
	      //Boolean - Whether to show a dot for each point
	      pointDot                : false,
	      //Number - Radius of each point dot in pixels
	      pointDotRadius          : 4,
	      //Number - Pixel width of point dot stroke
	      pointDotStrokeWidth     : 1,
	      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	      pointHitDetectionRadius : 20,
	      //Boolean - Whether to show a stroke for datasets
	      datasetStroke           : true,
	      //Number - Pixel width of dataset stroke
	      datasetStrokeWidth      : 2,
	      //Boolean - Whether to fill the dataset with a color
	      datasetFill             : true,
	      //String - A legend template
	      legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
	      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
	      maintainAspectRatio     : true,
	      //Boolean - whether to make the chart responsive to window resizing
	      responsive              : true
	    }

	    //Create the line chart
	    areaChart.Line(areaChartData, areaChartOptions);

	    //-------------
	    //- LINE CHART -
	    //--------------
	    var lineChartCanvas          = $('#lineChart').get(0).getContext('2d')
	    var lineChart                = new Chart(lineChartCanvas)
	    var lineChartOptions         = areaChartOptions
	    lineChartOptions.datasetFill = false
	    lineChart.Line(areaChartData, lineChartOptions);



	    //-------------
	    //- BAR CHART -
	    //-------------
	    var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
	    var barChart                         = new Chart(barChartCanvas)
	    var barChartData                     = areaChartData
	    barChartData.datasets[1].fillColor   = '#00a65a'
	    barChartData.datasets[1].strokeColor = '#00a65a'
	    barChartData.datasets[1].pointColor  = '#00a65a'
	    var barChartOptions                  = {
	      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	      scaleBeginAtZero        : true,
	      //Boolean - Whether grid lines are shown across the chart
	      scaleShowGridLines      : true,
	      //String - Colour of the grid lines
	      scaleGridLineColor      : 'rgba(0,0,0,.05)',
	      //Number - Width of the grid lines
	      scaleGridLineWidth      : 1,
	      //Boolean - Whether to show horizontal lines (except X axis)
	      scaleShowHorizontalLines: true,
	      //Boolean - Whether to show vertical lines (except Y axis)
	      scaleShowVerticalLines  : true,
	      //Boolean - If there is a stroke on each bar
	      barShowStroke           : true,
	      //Number - Pixel width of the bar stroke
	      barStrokeWidth          : 2,
	      //Number - Spacing between each of the X value sets
	      barValueSpacing         : 5,
	      //Number - Spacing between data sets within X values
	      barDatasetSpacing       : 1,
	      //String - A legend template
	      legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
	      //Boolean - whether to make the chart responsive
	      responsive              : true,
	      maintainAspectRatio     : true
	    }

	    barChartOptions.datasetFill = false
	    barChart.Bar(barChartData, barChartOptions)
	}).error(function(error){

	});


    $http.get('http://localhost:8080/api/pie-chart').success(function(result){
    	var piChartData = [];
    	angular.forEach(result, function(obj){
    		if(obj.charts){
    			angular.forEach(obj.charts, function(res){
					if(res.value){
						piChartData.push({
							value    : res.value,
					        color    : res.color,
					        highlight: res.highlight,
					        label    : res.label
						});
					}	
				});
    		}
    	});
		var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
	    var pieChart       = new Chart(pieChartCanvas)
	    var PieData        = piChartData
	    var pieOptions     = {
	      //Boolean - Whether we should show a stroke on each segment
	      segmentShowStroke    : true,
	      //String - The colour of each segment stroke
	      segmentStrokeColor   : '#fff',
	      //Number - The width of each segment stroke
	      segmentStrokeWidth   : 2,
	      //Number - The percentage of the chart that we cut out of the middle
	      percentageInnerCutout: 50, // This is 0 for Pie charts
	      //Number - Amount of animation steps
	      animationSteps       : 100,
	      //String - Animation easing effect
	      animationEasing      : 'easeOutBounce',
	      //Boolean - Whether we animate the rotation of the Doughnut
	      animateRotate        : true,
	      //Boolean - Whether we animate scaling the Doughnut from the centre
	      animateScale         : false,
	      //Boolean - whether to make the chart responsive to window resizing
	      responsive           : true,
	      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
	      maintainAspectRatio  : true,
	      //String - A legend template
	      legendTemplate       : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
	    }
	    //Create pie or douhnut chart
	    // You can switch between pie and douhnut using the method below.
	    pieChart.Doughnut(PieData, pieOptions);
	}).error(function(error){

	})

}])

.controller('morrisChartController', function(Charts){
	var vm = this;
	vm.message = 'HELLO';

	//DONUT CHART
    var donut = new Morris.Donut({
      element: 'sales-chart',
      resize: true,
      colors: ["#3c8dbc", "#f56954", "#00a65a"],
      data: [
        {label: "Download Sales", value: 12},
        {label: "In-Store Sales", value: 30},
        {label: "Mail-Order Sales", value: 20}
      ],
      hideHover: 'auto'
    });
    //BAR CHART
    var bar = new Morris.Bar({
		element: 'bar-chart',
		resize: true,
		data: [
			{y: '2006', a: 100, b: 90},
			{y: '2007', a: 75, b: 65},
			{y: '2008', a: 50, b: 40},
			{y: '2009', a: 75, b: 65},
			{y: '2010', a: 50, b: 40},
			{y: '2011', a: 75, b: 65},
			{y: '2012', a: 100, b: 90}
		],
		barColors: ['#00a65a', '#f56954'],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['CPU', 'DISK'],
		hideHover: 'auto'
    });

});
