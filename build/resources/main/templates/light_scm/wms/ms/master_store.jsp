<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<body>
		<div id="msStorePageHeaderGrp" class="" >
			<ol class="breadcrumb pull-right"></ol>
			<h1 class="page-header"></h1>
		</div>

		<div id="msStoreContainer" class="container">
		    <div id="msStoreSearchHeaderGrp" class="search-form clearfix col-xs-w100" >
		        <form class="form-inline"  onsubmit="return false;">

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="CLIENT"></span>
						<input id="msStoreClientCd" type="text" class="form-control"  value="${sessionScope.s_clientCd_Prioord}" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msStoreClientPopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msStoreClientNm" type="text" class="form-control"  value="${sessionScope.s_clientNm_Prioord}" size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="STORE"></span>
						<input id="msStoreStoreCd" type="text" class="form-control" autocomplete="off" />
						<div class="input-group-addon">
						  	<button id="msStoreStorePopup" type="button" class="btn btn-primary">
						  		<i  class="fa fa-search"></i>
							</button>
						</div>
						<input id="msStoreStoreNm" type="text" class="form-control"  size="35" readonly>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="CHANNEL_GBN"></span>
	                    <select id="msStoreChannelCbnCd" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<div class="input-group col-wms-search-group3 ">
						<span class="input-group-addon col-xs-w30 spanclass" data-domain-id="USE_YN"></span>
	                    <select id="msStoreUseYn" class="form-control" >
	                        <option value=""></option>
	                    </select>
					</div>

					<!-- 중복되는 부분 -->
		            <div class="form-group col-xs-w100 m-b-5">
						<div class="input-group pull-right">
							<button id="msStoreSearchBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
							    <i class="fa fa-search"></i><i data-domain-id="SEARCH_BTN" > </i>
							</button>
							<button id="msStoreAddBtn" type="button" class="btn btn-sm btn-info m-r-5" data-authRule="AUTH_NEW">
			    				<i class="fa fa-plus"></i><i data-domain-id="NEW_BTN" > </i>
							</button>
							<button id="msStoreDelBtn" type="button" class="btn btn-sm btn-danger m-r-5" data-authRule="AUTH_DEL">
			    				<i class="fa fa-minus"></i><i data-domain-id="DEL_BTN" > </i>
							</button>
			                <button id="msStoreExcelBtn" type="button" class="btn btn-sm btn-primary m-r-5" data-authRule="AUTH_DOWN">
							    <i class="fa fa-file-excel-o"></i><i data-domain-id="EXCEL_BTN" > </i>
							</button>
						</div>
					</div>
				</form>
			</div>

			<div id="msStoreHGridGrp" class="col-xs-w100">
				<div>
	          		<table id="msStoreHGrid"></table>
	         		<div id="msStoreHGridNavi"></div>
				</div>
			</div>
		</div>

	    <script src="/js/views/master/master_store.js"></script>

	</body>
</html>