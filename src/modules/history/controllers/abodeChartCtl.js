var abodechart = angular.module('abode.chart');

abodechart.controller('abodeChartCtl', ['$scope', '$interval', function ($scope, $interval) {

  // Value formatters
  var formatters = {
    'temperature-axis': function (value) {
      return value + '°';
    },
    'level-axis': function (value) {
      if (value === 0) {
        return 'Off';
      }
      if (value === 100) {
        return 'On';
      }
      return value;
    },
    'onoff-axis': function (value) {
      if (value === 0 || value === false) {
        return 'Off';
      }
      if (value === 1 || value === true) {
        return 'On';
      }
      return '';
    },
    'openclose-axis': function (value) {
      if (value === 0 || value === false) {
        return 'Closed';
      }
      if (value === 1 || value === true) {
        return 'Open';
      }
      return '';
    }
  };

  // Chart types and options
  var chartTypes = {
    'temperature': {
      type: 'line',
      fill: false,
      steppedLine: false,
      cubicInterpolationMode: 'monotone',
      yAxisID: 'temperature-axis',
      borderColor: 'black',
      borderWidth: '1px',
      pointRadius: 0,
      pointBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBackgroundColor: 'rgba(200,200,200, 1)'
    },
    'level': {
      yAxisID: 'level-axis',
      type: 'line',
      fill: true,
      steppedLine: true,
      borderColor: 'rgba(0,0,0,1)',
      backgroundColor: 'rgb(239, 242, 94, 2)',
      pointRadius: 0,
      pointBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBackgroundColor: 'rgba(200,200,200, 1)'
    },
    'onoff': {
      yAxisID: 'onoff-axis',
      type: 'line',
      fill: true,
      steppedLine: true,
      borderWidth: 0,
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(255, 20, 20, .2)',
      pointRadius: 0,
      pointBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBackgroundColor: 'rgba(200,200,200, 1)'
    },
    'openclose': {
      yAxisID: 'openclose-axis',
      type: 'line',
      fill: true,
      steppedLine: true,
      borderWidth: 0,
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgb(231, 76, 60, .2)',
      pointRadius: 0,
      pointBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBorderColor: 'rgba(0,0,0, 1)',
      pointHoverBackgroundColor: 'rgba(200,200,200, 1)'
    }
  };

  // Empty dataset list
  var datasets = [];

  // Regex for matching a proper start/end value
  var dateRE = /(-?)(\d+)([HDWMY])/;

  // Valid delta units
  var date_units = {
    'H': 'hours',
    'D': 'days',
    'W': 'weeks',
    'M': 'months',
    'Y': 'years'
  };

  // Function to build a date object based on a delta string
  var parseChartDate = function (date_str, base) {
    var parsed, delta_func, delta_units;

    // If no date_str specified, return current date
    if (!date_str) {
      return new Date();
    }

    // Parse the date_str
    parsed = date_str.match(dateRE);

    // If date_str is invalid, return current date
    if (!parsed) {
      return new Date();
    }

    // Determine our date delta function
    delta_func = (parsed[1]) ? 'subtract': 'add';

    // Determine our date delta units
    delta_units =date_units[parsed[3]];

    // Build our new date object
    return moment(base)[delta_func](parsed[2], delta_units).toDate();

  };

  // Set our initial range
  var initial_range = {
    start: parseChartDate($scope.start),
    end: parseChartDate($scope.end)
  };

  // Setup some empty settings
  $scope.data = [];
  $scope.labels = [];
  $scope.series = [];
  $scope.datasetOverride = [];

  // Default chart options
  $scope.options = {
    tooltips: {
      mode: 'index',
      intersect: false,
      displayColors: false,
      callbacks: {
        'title': function (titles) {
          return moment(titles[0].xLabel).format('ddd, MMM Do @ H:mm A');
        },
        'label': function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];

          if (formatters[dataset.yAxisID]) {
            return dataset.label + ': ' + formatters[dataset.yAxisID](tooltipItem.yLabel);
          }

          return dataset.label + ': ' + tooltipItem.yLabel;
        }
      }
    },
    legend: {
      display: ($scope.legend !== 'hide'),
      position: $scope.legend || 'right',
      labels: {
        fontColor: 'rgb(200, 200, 200)'
      }
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          position: 'bottom',
          time: {
          },
          ticks: {
            source: 'auto'
          }
        }
      ],
      yAxes: [
        {
          id: 'temperature-axis',
          beginAtZero: 0,
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            source: 'auto',
            suggestedMin: 60,
            suggestedMax: 70
          }
        },
        {
          id: 'level-axis',
          type: 'linear',
          beginAtZero: 0,
          display: false,
          position: 'left',
          ticks: {
            source: 'auto',
            min: 0,
            suggestedMin: 0,
            max: 100,
            stepSize: 10,
            suggestedMax: 100,
            callback: formatters['level-axis']
          }
        },
        {
          id: 'onoff-axis',
          type: 'linear',
          beginAtZero: 0,
          display: true,
          ticks: {
            min: 0,
            suggestedMin: 0,
            max: 1,
            stepSize: 1,
            suggestedMax: 1,
            callback: formatters['onoff-axis']
          }
        },
        {
          id: 'openclose-axis',
          type: 'linear',
          beginAtZero: 0,
          display: true,
          ticks: {
            min: 0,
            suggestedMin: 0,
            max: 1,
            stepSize: 1,
            suggestedMax: 1,
            callback: formatters['openclose-axis']
          }
        }
      ]
    }
  };


  $scope.$on('abode-chart-register-dataset', function (event, data) {

    // No need to continue propagation
    event.stopPropagation();

    // Get a copy of the default chart styles so we can override our colors
    var chartStyle = angular.copy(chartTypes[data.chart] || chartTypes.level);

    // Determine our dataset index
    var dataset_index = $scope.series.length;

    //Set our colors
    chartStyle.borderColor = data.borderColor || data.color || chartStyle.borderColor;
    chartStyle.backgroundColor = data.backgroundColor || data.color || chartStyle.backgroundColor;
    chartStyle.pointHoverBackgroundColor = data.pointHoverBackgroundColor || data.color || chartStyle.pointHoverBackgroundColor;

    //Push our configs
    $scope.datasetOverride.push(chartStyle);
    $scope.series.push(data.label || data.name);

    // Add an empty dataset
    $scope.data.push([]);


    // Register the dataset
    datasets.push({
      index: dataset_index,
      type: data.type,
      name: data.name,
      value: data.value,
      range: initial_range
    });

    // Request dataset return data
    $scope.$broadcast('abode-chart-request-dataset', datasets[dataset_index]);
  });

  // Process
  $scope.$on('abode-chart-dataset-updated', function (event, data) {
    // No need to continue propagation
    event.stopPropagation();

    // Record our new start/end for this dataset
    datasets[data.index].start = data.range.start;
    datasets[data.index].end = data.range.end;

    // Extend the dataset with the new data
    $scope.data[data.index].push.apply($scope.data[data.index], data.data);

    // Ensure we stay with our range
    $scope.data[data.index] = $scope.data[data.index].filter(function (record) {
      return (new Date(record.x) >= parseChartDate($scope.start) && new Date(record.x) <= parseChartDate($scope.end));
    });

  });

  $scope.reload = function () {
    // Disable animation so we get a smooth update
    $scope.options = $scope.options || {};
    $scope.options.animation = $scope.options.animation || {};
    $scope.options.animation.duration = 0;

    // Iterate through each dataset
    datasets.forEach(function (dataset) {

      // Set our new range
      dataset.range = {
        start: dataset.end,
        end: parseChartDate($scope.end, dataset.end)
      };

      // Broadcast our request event
      $scope.$broadcast('abode-chart-request-dataset', datasets[dataset.index]);
    });
  };

  // If an interval is specified, start an interval for reloading
  if ($scope.interval) {
    var reload_interval = $interval($scope.reload, 1000 * $scope.interval);

    // Cleanup with scope is destroyed
    $scope.$on('$destroy', function () {
      $interval.cancel(reload_interval);
    });
  }

}]);