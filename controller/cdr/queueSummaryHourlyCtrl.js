/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var queueSummaryHourlyCtrl = function ($scope, $filter, $timeout, loginService, cdrApiHandler, resourceService, baseUrls) {

        $scope.dtOptions = {paging: false, searching: false, info: false, order: [0, 'asc']};

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.moment = moment;

        $scope.summaryArr = [];

        $scope.cancelDownload = true;
        $scope.buttonClass = 'fa fa-file-text';
        $scope.fileDownloadState = 'RESET';
        $scope.currentCSVFilename = '';
        $scope.DownloadButtonName = 'CSV';

        var convertToMMSS = function (sec) {
            var minutes = Math.floor(sec / 60);

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            var seconds = sec - minutes * 60;

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return minutes + ':' + seconds;
        };


        $scope.obj = {
            day: moment().format("YYYY-MM-DD")
        };

        var checkFileReady = function (fileName) {

            if ($scope.cancelDownload) {
                $scope.fileDownloadState = 'RESET';
                $scope.DownloadButtonName = 'CSV';
            }
            else {
                cdrApiHandler.getFileMetaData(fileName).then(function (fileStatus) {
                    if (fileStatus && fileStatus.Result) {
                        if (fileStatus.Result.Status === 'PROCESSING') {
                            $timeout(checkFileReady(fileName), 10000);
                        }
                        else {


                            var decodedToken = loginService.getTokenDecode();

                            if (decodedToken && decodedToken.company && decodedToken.tenant) {
                                $scope.currentCSVFilename = fileName;
                                $scope.DownloadCSVFileUrl = baseUrls.fileServiceInternalUrl + 'File/DownloadLatest/' + decodedToken.tenant + '/' + decodedToken.company + '/' + fileName;
                                $scope.fileDownloadState = 'READY';
                                $scope.DownloadButtonName = 'CSV';
                                $scope.cancelDownload = true;
                                $scope.buttonClass = 'fa fa-spinner fa-spin';
                            }
                            else {
                                $scope.fileDownloadState = 'RESET';
                                $scope.DownloadButtonName = 'CSV';
                            }


                        }
                    }
                    else {
                        $scope.fileDownloadState = 'RESET';
                        $scope.DownloadButtonName = 'CSV';
                    }

                }).catch(function (err) {
                    loginService.isCheckResponse(err);
                    $scope.fileDownloadState = 'RESET';
                    $scope.DownloadButtonName = 'CSV';
                });
            }

        };

        $scope.downloadPress = function () {
            $scope.fileDownloadState = 'RESET';
            $scope.DownloadButtonName = 'CSV';
            $scope.cancelDownload = true;
            $scope.buttonClass = 'fa fa-file-text';
        };


        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        };

        var emptyArr = [];

        $scope.querySearch = function (query) {
            if (query === "*" || query === "") {
                if ($scope.attrList) {
                    return $scope.attrList;
                }
                else {
                    return emptyArr;
                }

            }
            else {
                if ($scope.attrList) {
                    var filteredArr = $scope.attrList.filter(function (item) {
                        var regEx = "^(" + query + ")";

                        if (item.Attribute) {
                            return item.Attribute.match(regEx);
                        }
                        else {
                            return false;
                        }

                    });

                    return filteredArr;
                }
                else {
                    return emptyArr;
                }
            }

        };

        $scope.checkTagCount = function () {
            if (!$scope.skillFilter || $scope.skillFilter.length < 5) {
                return true;
            }
            else {
                return false;
            }
        };


        $scope.loadAttrList = function () {
            cdrApiHandler.getAttributeList().then(function (attrList) {
                if (attrList && attrList.Result) {
                    $scope.attrList = attrList.Result;
                }
                else {
                    $scope.attrList = [];
                }


            }).catch(function (err) {
                loginService.isCheckResponse(err);
                $scope.showAlert('Agent List', 'error', 'Failed to bind agent auto complete list');

            })
        };

        $scope.loadAttrList();

        var buildSummaryList = function (day, attribute, momentTz, summaryArrItem, callback) {
            cdrApiHandler.getCallSummaryForQueueHr(day, attribute, momentTz).then(function (sumResp) {
                if (!sumResp.Exception && sumResp.IsSuccess && sumResp.Result) {
                    if (!isEmpty(sumResp.Result)) {
                        var newSummary = sumResp.Result.map(function (sumr) {

                            if (typeof sumr.IvrAverage === "number") {
                                sumr.IvrAverage = convertToMMSS(sumr.IvrAverage);
                            }

                            if (typeof sumr.HoldAverage === "number") {
                                sumr.HoldAverage = convertToMMSS(sumr.HoldAverage);
                            }

                            if (typeof sumr.RingAverage === "number") {
                                sumr.RingAverage = convertToMMSS(sumr.RingAverage);
                            }

                            if (typeof sumr.TalkAverage === "number") {
                                sumr.TalkAverage = convertToMMSS(sumr.TalkAverage);
                            }

                            return sumr;
                        });

                        summaryArrItem.Data = newSummary;
                    }

                    callback(null, true);


                }
                else {
                    callback(null, true);
                }


            }, function (err) {
                loginService.isCheckResponse(err);
                callback(err, false);
            })
        };

        $scope.getCallSummary = function () {

            try {
                $scope.summaryArr = [];

                var momentTz = moment.parseZone(new Date()).format('Z');
                momentTz = momentTz.replace("+", "%2B");

                $scope.obj.isTableLoadingHr = 0;

                $scope.skillFilter.forEach(function (skill) {
                    var arrayItem = {Skill: skill.Attribute, Data: []};
                    $scope.summaryArr.push(arrayItem);

                    buildSummaryList($scope.obj.day, skill.Attribute, momentTz, arrayItem, function (err, processDoneResp) {
                        $scope.obj.isTableLoadingHr = 1;

                    });
                });


            }
            catch (ex) {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
                $scope.obj.isTableLoadingHr = 1;
            }

        };

        $scope.getCallSummaryDownload = function () {
            if ($scope.DownloadButtonName === 'CSV') {
                $scope.cancelDownload = false;
                $scope.buttonClass = 'fa fa-spinner fa-spin';
            }
            else {
                $scope.cancelDownload = true;
                $scope.buttonClass = 'fa fa-file-text';
            }

            $scope.DownloadButtonName = 'PROCESSING...';


            try {
                $scope.summaryArr = [];

                var attribArray = $scope.skillFilter.map(function (item) {
                    return item.Attribute;
                });

                var momentTz = moment.parseZone(new Date()).format('Z');
                momentTz = momentTz.replace("+", "%2B");

                cdrApiHandler.getCallSummaryForQueueHrDownload($scope.obj.day, attribArray, momentTz, 'csv').then(function (sumResp) {
                    if (!sumResp.Exception && sumResp.IsSuccess && sumResp.Result) {
                        var downloadFilename = sumResp.Result;

                        checkFileReady(downloadFilename);

                    }
                    else {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading cdr list');
                        $scope.fileDownloadState = 'RESET';
                        $scope.DownloadButtonName = 'CSV';
                    }


                }, function (err) {
                    loginService.isCheckResponse(err);
                    $scope.showAlert('Error', 'error', 'Error occurred while loading cdr list');
                    $scope.fileDownloadState = 'RESET';
                    $scope.DownloadButtonName = 'CSV';
                });


            }
            catch (ex) {
                $scope.showAlert('Error', 'error', 'Error occurred while loading cdr list');
                $scope.fileDownloadState = 'RESET';
                $scope.DownloadButtonName = 'CSV';
            }

        };


    };
    app.controller("queueSummaryHourlyCtrl", queueSummaryHourlyCtrl);

}());


