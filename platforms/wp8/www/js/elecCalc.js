'use strict';

angular.module('hambayoApp')
  .controller('ElecCalcCtrl', function ($scope) {
    $scope.b1pu = '';
	$scope.b2pu = '';
	$scope.b3pu = '';
	$scope.b4pu = '';
	$scope.btpu = '';
	
	$scope.b1pa = '';
	$scope.b2pa = '';
	$scope.b3pa = '';
	$scope.b4pa = '';
	$scope.btpa = '';
	
	$scope.b1nu = '';
	$scope.b2nu = '';
	$scope.b3nu = '';
	$scope.b4nu = '';
	$scope.btnu = '';
	
	$scope.b1na = '';
	$scope.b2na = '';
	$scope.b3na = '';
	$scope.b4na = '';
	$scope.btna = '';
	
	$scope.val1=parseFloat("0.7758");
	$scope.val2=parseFloat("1.0321");
	$scope.val3=parseFloat("1.2184");
	$scope.val4=parseFloat("1.3714");
	$scope.vat=parseFloat("1.14");
	
	$scope.prevAmountPurchase=0;
	$scope.nextAmountPurchase=0;
	$scope.totalAmountPurchase=0;
	
	$scope.unitsLeftFromAmount=0;
	$scope.prevBlock=1;
	$scope.nextBlock=1;
	//Update
	$scope.update=function(){
		
	var block1To=50;
	var block2To=350;
	var block3To=600;
	
	var block1Max=0;
	var block2Max=0;
	var block3Max=0;
	
	var block1Total=0;
	var block2Total=0;
	var block3Total=0;
	
	//Calculations 
	var block1Incl=round(parseFloat($scope.val1*$scope.vat),6);
	var block2Incl=round(parseFloat($scope.val2*$scope.vat),6);
	var block3Incl=round(parseFloat($scope.val3*$scope.vat),6);
	var block4Incl=round(parseFloat($scope.val4*$scope.vat),6);
	
	var totalAmount=0;
	var totalUnits=0;
	var totalAmountNext=0;
	var totalUnitsNext=0;
	var totalPU=0;
	var totalPA=0;
	var totalTU=0;
	var totalTA=0;
	
	$scope.unitsLeftFromAmount=0;
	$scope.amountLeftInBlock=0;
	
	block1Max=parseFloat(block1Incl * block1To);
	block2Max=parseFloat(block2Incl * (block2To - block1To));
	block3Max=parseFloat(block3Incl * (block3To - block2To));
	
	block1Total=block1Max;
	block2Total=block1Max+block2Max;
	block3Total=block1Max+block2Max+block3Max;
	
	if($scope.prevAmountPurchase===""){ $scope.prevAmountPurchase=0; }
	if($scope.nextAmountPurchase===""){ $scope.nextAmountPurchase=0; }
	$scope.totalAmountPurchase = parseFloat($scope.prevAmountPurchase + $scope.nextAmountPurchase);
	//Calculate previous purchase end block
            if ($scope.prevAmountPurchase <= block1Total) {
                $scope.prevBlock = 1;
            } else {
                if ($scope.prevAmountPurchase <= block2Total) {
                    $scope.prevBlock = 2;
                } else {
                    if ($scope.prevAmountPurchase <= block3Total) {
                        $scope.prevBlock = 3;
                    } else {
                        if ($scope.prevAmountPurchase > block3Total) {
                            $scope.prevBlock = 4;
                        }
                    }
                }
            }
	
			//Calculate next purchase end block
            if ($scope.totalAmountPurchase <= block1Total) {
                $scope.nextBlock = 1;
            } else {
                if ($scope.totalAmountPurchase <= block2Total) {
                    $scope.nextBlock = 2;
                } else {
                    if ($scope.totalAmountPurchase <= block3Total) {
                        $scope.nextBlock = 3;
                    } else {
                        if ($scope.totalAmountPurchase > block3Total) {
                            $scope.nextBlock = 4;
                        }
                    }
                }
            }
			
//Previous Block Calculations
//First Block
            if ($scope.prevBlock == 1) {
				$scope.b1pa=round($scope.prevAmountPurchase,4).toFixed(4);
                $scope.b1pu=round($scope.prevAmountPurchase / block1Incl,2);
                totalAmount=round($scope.prevAmountPurchase,4);
                totalUnits=round($scope.prevAmountPurchase / block1Incl,2);

            } else {
                $scope.b1pa=round(block1Max,4).toFixed(4);
                $scope.b1pu=round(block1Max / block1Incl,2);
                totalAmount = round(block1Max,4);
                totalUnits = round(block1Max / block1Incl,2);
            }
//Second Block
            if ($scope.prevBlock == 2) {
                $scope.b2pa=round(($scope.prevAmountPurchase - block1Total),4).toFixed(4);
                $scope.b2pu=round((($scope.prevAmountPurchase - block1Total) / block2Incl),2);
                totalAmount = round(totalAmount + ($scope.prevAmountPurchase - block1Total),4);
                totalUnits = round(totalUnits + (($scope.prevAmountPurchase - block1Total) / block2Incl),2);
            }
            if ($scope.prevBlock > 2) {
                $scope.b2pa=round(block2Max,4).toFixed(4);
                $scope.b2pu=round((block2Max / block2Incl),2);
                totalAmount = round(totalAmount + (block2Max),4);
                totalUnits = round(totalUnits + (block2Max / block2Incl),2);
            }
            if ($scope.prevBlock < 2) {
                $scope.b2pa=0;
                $scope.b2pu=0;
            }
//Third Block
            if ($scope.prevBlock == 3) {
                $scope.b3pa=round(($scope.prevAmountPurchase - block2Total),4).toFixed(4);
                $scope.b3pu=round((($scope.prevAmountPurchase - block2Total) / block3Incl),2);
                totalAmount = round(totalAmount + ($scope.prevAmountPurchase - block2Total),4);
                totalUnits = round(totalUnits + (($scope.prevAmountPurchase - block2Total) / block3Incl),2);
            }
            if ($scope.prevBlock > 3) {
                $scope.b3pa=round((block3Max),4).toFixed(4);
                $scope.b3pu=round((block3Max / block3Incl),2);
                totalAmount = round(totalAmount + (block3Max),4);
                totalUnits = round(totalUnits + (block3Max / block3Incl),2);
            }
            if ($scope.prevBlock < 3) {
                $scope.b3pa=0;
                $scope.b3pu=0;
            }
//Fourth Block
            if ($scope.prevBlock == 4) {
                $scope.b4pa=round(($scope.prevAmountPurchase - block3Total),4).toFixed(4);
                $scope.b4pu=round((($scope.prevAmountPurchase - block3Total) / block4Incl),2);
                totalAmount = round(totalAmount + ($scope.prevAmountPurchase - block3Total),4);
                totalUnits = round(totalUnits + (($scope.prevAmountPurchase - block3Total) / block4Incl),2);
            }
            if ($scope.prevBlock < 4) {
                $scope.b4pa=0;
                $scope.b4pu=0;
            }
			
			totalPU=round(totalUnits,2);
			totalPA=round(totalAmount,4);
			$scope.tpu=roundDownOne(totalPU);
			$scope.tpa=totalPA.toFixed(2);
			
			
//Total Block Calculations
//First Block
            if ($scope.nextBlock == 1) {
                $scope.b1ta=round($scope.totalAmountPurchase, 4);
                $scope.b1tu=round($scope.totalAmountPurchase / block1Incl, 2);
                $scope.unitsLeftFromAmount = round((block1Total - $scope.totalAmountPurchase) / block1Incl, 2) + " units @ R";
                $scope.amountLeftInBlock=round(block1Total - $scope.totalAmountPurchase, 2).toFixed(2);

                totalAmountNext = round($scope.totalAmountPurchase,4);
                totalUnitsNext = $scope.b1tu;
            } else {
                $scope.b1ta=round(block1Max, 4);
                $scope.b1tu=round(block1Max / block1Incl, 2);
				
                totalAmountNext = round(block1Max,4);
                totalUnitsNext = $scope.b1tu;
            }
//Second Block
            if ($scope.nextBlock == 2) {
                $scope.b2ta=round($scope.totalAmountPurchase - block1Total, 4);
                $scope.b2tu=round(($scope.totalAmountPurchase - block1Total) / block2Incl, 2);
                $scope.unitsLeftFromAmount = round((block2Total - $scope.totalAmountPurchase) / block2Incl, 2) + " units @ R";
                $scope.amountLeftInBlock=round(block2Total - $scope.totalAmountPurchase, 2).toFixed(2);
				
                totalAmountNext = round(totalAmountNext + ($scope.totalAmountPurchase - block1Total),4);
                totalUnitsNext = totalUnitsNext + $scope.b2tu;
            }
            if ($scope.nextBlock > 2) {
                $scope.b2ta=round(block2Max, 4);
                $scope.b2tu=round(block2Max / block2Incl, 2);
				
                totalAmountNext = round(totalAmountNext + (block2Max),4);
                totalUnitsNext = totalUnitsNext + $scope.b2tu;
            }
            if ($scope.nextBlock < 2) {
                $scope.b2ta=0;
                $scope.b2tu=0;
            }
//Third Block
            if ($scope.nextBlock == 3) {
                $scope.b3ta=round($scope.totalAmountPurchase - block2Total, 4);
                $scope.b3tu=round(($scope.totalAmountPurchase - block2Total) / block3Incl, 2);
                $scope.unitsLeftFromAmount = round((block3Total - $scope.totalAmountPurchase) / block3Incl, 2) + " units @ R";
                $scope.amountLeftInBlock=round(block3Total - $scope.totalAmountPurchase, 2).toFixed(2);
				
                totalAmountNext = round(totalAmountNext + ($scope.totalAmountPurchase - block2Total),4);
                totalUnitsNext = totalUnitsNext + $scope.b3tu;
            }
            if ($scope.nextBlock > 3) {
                $scope.b3ta=round(block3Max, 4);
                $scope.b3tu=round((block3Max) / block3Incl, 2);
				
                totalAmountNext = round(totalAmountNext + (block3Max),4);
                totalUnitsNext = totalUnitsNext + $scope.b3tu;
            }
            if ($scope.nextBlock < 3) {
                $scope.b3ta=0;
                $scope.b3tu=0;
            }
//Fourth Block
            if ($scope.nextBlock == 4) {
                $scope.b4ta=round($scope.totalAmountPurchase - block3Total, 4);
                $scope.b4tu=round(($scope.totalAmountPurchase - block3Total) / block4Incl, 2);
                $scope.unitsLeftFromAmount="Unlimited";
				$scope.amountLeftInBlock="";
				
                totalAmountNext = round(totalAmountNext + ($scope.totalAmountPurchase - block3Total),4);
                totalUnitsNext = totalUnitsNext + $scope.b4tu;
            }
            if ($scope.nextBlock < 4) {
                $scope.b4ta=0;
                $scope.b4tu=0;
            }
			
			totalTU=round(totalUnitsNext,2);
			totalTA=round(totalAmountNext,4);
			$scope.ttu=roundDownOne(totalTU);
			$scope.tta=totalTA.toFixed(2);
						
			$scope.b1nu=round($scope.b1tu-$scope.b1pu,2);
			$scope.b1na=round($scope.b1ta-$scope.b1pa,4);
			$scope.b2nu=round($scope.b2tu-$scope.b2pu,2);
			$scope.b2na=round($scope.b2ta-$scope.b2pa,4);
			$scope.b3nu=round($scope.b3tu-$scope.b3pu,2);
			$scope.b3na=round($scope.b3ta-$scope.b3pa,4);
			$scope.b4nu=round($scope.b4tu-$scope.b4pu,2);
			$scope.b4na=round($scope.b4ta-$scope.b4pa,4);
			
			$scope.tnu=round((totalTU-totalPU),2);
			$scope.tna=round((totalTA-totalPA),2);
			
	}//update
			
	
  });