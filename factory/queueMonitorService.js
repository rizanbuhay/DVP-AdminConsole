/**
 * Created by a on 5/29/2016.
 */



'use strict';

mainApp.factory("queueMonitorService", function ($http, baseUrls) {


    var getAllConcurrentQueue = function () {
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/ConcurrentQueued/" + queue + "/5"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {
                return {};
            }
        });
    };


    var getAllQueueStats = function () {
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/QueueDetails"
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {

                return [];
            }
        });

    };

    var getSingleQueueStats = function (queue) {
        //dashboard.app.veery.cloud
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/QueueSingleDetail/" + queue
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return {};
            }
        });

    };

    var getSingleQueueGraph = function (queue) {
        //dashboard.app.veery.cloud
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/ConcurrentQueued/"+ queue+"/5"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });

    };







    return {
        GetAllQueueStats: getAllQueueStats,
        GetAllConcurrentQueue: getAllConcurrentQueue,
        GetSingleQueueStats: getSingleQueueStats,
        GetSingleQueueGraph: getSingleQueueGraph

    }
});


