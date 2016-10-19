(function() {

    var ticketReportsService = function($http, authService, baseUrls)
    {

        var getTicketSummary = function(sdate, edate, tag, channel, priority, type)
        {
            var postData = {};
            var url = baseUrls.ticketUrl + 'TicketReport?from=' + sdate + '&to=' + edate;

            if(tag)
            {
                postData.tag = tag;
            }

            if(channel)
            {
                postData.channel = channel;
            }

            if(priority)
            {
                postData.priority = priority;
            }

            if(type)
            {
                postData.type = type;
            }

            var httpHeaders = {
                method: 'POST',
                url: url
            };

            if(tag || channel || priority || type)
            {

                httpHeaders.data = JSON.stringify(postData);
            }

            return $http(httpHeaders).then(function(resp)
            {
                return resp.data;
            })
        };

        var getTicketDetailsNoPaging = function(filterData)
        {

            var postData = {};
            var url = baseUrls.ticketUrl + 'TicketDetailReport/data' + '?from=' + filterData.sdate + '&to=' + filterData.edate;

            if(filterData.tag)
            {
                postData.tag = filterData.tag;
            }

            if(filterData.channel)
            {
                postData.channel = filterData.channel;
            }

            if(filterData.priority)
            {
                postData.priority = filterData.priority;
            }

            if(filterData.type)
            {
                postData.type = filterData.type;
            }

            if(filterData.status)
            {
                postData.status = filterData.status;
            }

            if(filterData.assignee)
            {
                postData.assignee = filterData.assignee;
            }

            if(filterData.requester)
            {
                postData.requester = filterData.requester;
            }

            if(filterData.submitter)
            {
                postData.submitter = filterData.submitter;
            }

            if(filterData.slaViolated === true || filterData.slaViolated === false)
            {
                postData.sla_violated = filterData.slaViolated;
            }

            var httpHeaders = {
                method: 'POST',
                url: url
            };

            if(filterData.tag || filterData.channel || filterData.assignee || filterData.submitter || filterData.requester || filterData.priority || filterData.type || filterData.status || filterData.slaViolated === true || filterData.slaViolated === false)
            {
                httpHeaders.data = JSON.stringify(postData);
            }

            return $http(httpHeaders).then(function(resp)
            {
                return resp.data;
            })
        };

        var getTicketDetails = function(filterData)
        {
            var postData = {};
            var url = baseUrls.ticketUrl + 'TicketDetailReport/data/' + filterData.skipCount + '/' + filterData.limitCount + '?from=' + filterData.sdate + '&to=' + filterData.edate;

            if(filterData.tag)
            {
                postData.tag = filterData.tag;
            }

            if(filterData.channel)
            {
                postData.channel = filterData.channel;
            }

            if(filterData.priority)
            {
                postData.priority = filterData.priority;
            }

            if(filterData.type)
            {
                postData.type = filterData.type;
            }

            if(filterData.status)
            {
                postData.status = filterData.status;
            }

            if(filterData.assignee)
            {
                postData.assignee = filterData.assignee;
            }

            if(filterData.requester)
            {
                postData.requester = filterData.requester;
            }

            if(filterData.submitter)
            {
                postData.submitter = filterData.submitter;
            }

            if(filterData.slaViolated === true || filterData.slaViolated === false)
            {
                postData.sla_violated = filterData.slaViolated;
            }

            var httpHeaders = {
                method: 'POST',
                url: url
            };

            if(filterData.tag || filterData.channel || filterData.assignee || filterData.submitter || filterData.requester || filterData.priority || filterData.type || filterData.status || filterData.slaViolated === true || filterData.slaViolated === false)
            {
                httpHeaders.data = JSON.stringify(postData);
            }

            return $http(httpHeaders).then(function(resp)
            {
                return resp.data;
            })
        };

        var getTicketDetailsCount = function(filterData)
        {
            var postData = {};
            var url = baseUrls.ticketUrl + 'TicketDetailReport/count' + '?from=' + filterData.sdate + '&to=' + filterData.edate;

            if(filterData.tag)
            {
                postData.tag = filterData.tag;
            }

            if(filterData.channel)
            {
                postData.channel = filterData.channel;
            }

            if(filterData.priority)
            {
                postData.priority = filterData.priority;
            }

            if(filterData.type)
            {
                postData.type = filterData.type;
            }

            if(filterData.status)
            {
                postData.status = filterData.status;
            }

            if(filterData.assignee)
            {
                postData.assignee = filterData.assignee;
            }

            if(filterData.requester)
            {
                postData.requester = filterData.requester;
            }

            if(filterData.submitter)
            {
                postData.submitter = filterData.submitter;
            }

            if(filterData.slaViolated === true || filterData.slaViolated === false)
            {
                postData.sla_violated = filterData.slaViolated;
            }

            var httpHeaders = {
                method: 'POST',
                url: url
            };

            if(filterData.tag || filterData.channel || filterData.assignee || filterData.submitter || filterData.requester || filterData.priority || filterData.type || filterData.status || filterData.slaViolated === true || filterData.slaViolated === false)
            {

                httpHeaders.data = JSON.stringify(postData);
            }

            return $http(httpHeaders).then(function(resp)
            {
                return resp.data;
            })
        };

        var getExternalUsers = function()
        {

            var url = baseUrls.UserServiceBaseUrl + 'ExternalUsers';

            return $http({
                method: 'GET',
                url: url
            }).then(function(resp)
            {
                return resp.data;
            });

        };

        var getUsers = function()
        {

            var url = baseUrls.UserServiceBaseUrl + 'Users';

            return $http({
                method: 'GET',
                url: url
            }).then(function(resp)
            {
                return resp.data;
            });

        };

        var getTagList = function()
        {
            var url = 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Tags';

            return $http({
                method: 'GET',
                url: url
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getCategoryList = function()
        {
            var url = baseUrls.ticketUrl + 'TagCategories';

            return $http({
                method: 'GET',
                url: url
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        return {
            getTicketSummary: getTicketSummary,
            getTicketDetails: getTicketDetails,
            getTicketDetailsCount: getTicketDetailsCount,
            getCategoryList: getCategoryList,
            getTagList: getTagList,
            getExternalUsers: getExternalUsers,
            getUsers: getUsers,
            getTicketDetailsNoPaging: getTicketDetailsNoPaging
        };
    };

    var module = angular.module("veeryConsoleApp");
    module.factory("ticketReportsService", ticketReportsService);

}());
