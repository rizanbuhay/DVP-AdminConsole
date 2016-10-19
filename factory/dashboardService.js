/**
 * Created by Rajinda on 5/28/2016.
 */

'use strict';

mainApp.factory("dashboardService", function ($http, baseUrls) {

    var getAllCalls = function () {
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/Calls/5"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {
                return {};
            }
        });
    };
    var getAllQueued = function () {
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/Queued/5"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });
    };
    var getAllBriged = function () {
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/Bridge/5"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {
                return {};
            }
        });
    };
    var getAllChannels = function () {
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/Channels/5"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });
    };



    var getTotalCalls = function (param1, param2) {

        var tempParam1 = '*';

        if(param1)
        {
            tempParam1 = param1;
        }

        var tempParam2 = '*';

        if(param2)
        {
            tempParam2 = param2;
        }

        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/CALLS/" + tempParam1 + "/" + tempParam2
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    var getNewTicketCountViaChenal = function (chenal) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/NEWTICKET/via_"+chenal+"/*"
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    var getTotalQueued = function () {
        //
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/QUEUE/*/*"
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });


    };
    var getTotalQueueHit = function () {
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/AllConcurrentQueued/5"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });
    };
    var getTotalQueueAnswered = function () {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/QUEUEANSWERED/*/*"
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });


    };

    var getTotalQueueDropped = function () {

        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/QUEUEDROPPED/*/*"

        }).then(function (response) {
            if (response.data) {


                return response.data;


            } else {

                return 0;
            }

        });


    };

    var getCurrentWaiting = function () {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/CurrentCount/QUEUE/*/*"
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });
    };

    var getTotalBriged = function () {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/BRIDGE/*/*"
        }).then(function (response) {
            if (response.data) {


                return response.data;


            } else {

                return 0;
            }

        });


    };

    var getTotalOnGoing = function (callDirection) {

        var url = baseUrls.monitorrestapi+"Calls/Count";

        if(callDirection)
        {
            url = url + '?direction=' + callDirection;
        }
        return $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            if (response.data && response.data.IsSuccess && response.data.Result
                && response.data.Result.length > 0) {
                return response.data.Result;
            } else {
                return [];
            }

        });


    };

    var getProfileDetails = function () {
        return $http({
            method: 'GET',
            url: baseUrls.ardsmonitoringBaseUrl+"MONITORING/resources"
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return 0;
            }

        });


    };


    var getCompanyTasks = function () {
        //
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl+"Tasks"
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });


    };


    /*ticket*/
    var getTicketCount = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/CurrentCount/"+status+"/total/total"
        }).then(function (response) {
            if (response.status===200) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    var getTotalTicketCount = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/"+status+"/total/total"
        }).then(function (response) {
            if (response.status===200) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    var getTotalTicketAvg = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/AverageTime/"+status+"/total/total"
        }).then(function (response) {
            if (response.status===200) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    /*var getTotalTicketCount = function (status) {
     return $http({
     method: 'GET',
     url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/SLAVIOLATED/total/total",
     headers: {
     'authorization': authService.GetToken()
     }
     }).then(function (response) {
     if (response.status===200) {
     return response.data;
     } else {
     return 0;
     }
     });

     };

     var getTotalTicketCount = function (status) {
     return $http({
     method: 'GET',
     url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/FIRSTCALLRESOLUTION/total/total",
     headers: {
     'authorization': authService.GetToken()
     }
     }).then(function (response) {
     if (response.status===200) {
     return response.data;
     } else {
     return 0;
     }
     });

     };*/

    var getCreatedTicketSeries = function () {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/NewTicket/30"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });

    };



    var getResolvedTicketSeries = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/ClosedTicket/30"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });

    };

    var getDeferenceResolvedTicketSeries = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/ClosedVsOpenTicket/30"
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });

    };

    /*ticket*/

    return {
        GetAll: getAllCalls,
        GetAllQueued: getAllQueued,
        GetAllBriged: getAllBriged,
        GetAllChannels: getAllChannels,
        GetTotalCalls: getTotalCalls,
        GetTotalQueued: getTotalQueued,
        GetTotalQueueHit:getTotalQueueHit,
        GetTotalQueueAnswered: getTotalQueueAnswered,
        GetTotalQueueDropped: getTotalQueueDropped,
        GetCurrentWaiting: getCurrentWaiting,
        GetTotalBriged: getTotalBriged,
        GetTotalOnGoing: getTotalOnGoing,
        GetProfileDetails: getProfileDetails,
        getCompanyTasks: getCompanyTasks,
        GetTicketCount:getTicketCount,
        GetCreatedTicketSeries:getCreatedTicketSeries,
        GetResolvedTicketSeries:getResolvedTicketSeries,
        GetDeferenceResolvedTicketSeries:getDeferenceResolvedTicketSeries,
        GetTotalTicketCount:getTotalTicketCount,
        GetTotalTicketAvg:getTotalTicketAvg,
        GetNewTicketCountViaChannel:getNewTicketCountViaChenal
    }
});
