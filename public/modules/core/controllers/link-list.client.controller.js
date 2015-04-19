'use strict';

angular.module('core').controller('LinklistController', ['$scope',
	function($scope) {
		// Link list controller logic
		// ...
		$scope.modules = [
			{
				name:'Animation',
				links:[
					{linkName: 'svg1', linkHref:'/#!/svg1'},
					{linkName: 'ryuhm12', linkHref:'/#!/ryuhm12'},
					{linkName: 'j1', linkHref:'/#!/j1'},
					{linkName: 'three', linkHref:'/#!/three'}
				]
			},
			{
				name:'Banners',
				links:[
					{linkName: 'List', linkHref:'/#!/banners'},
					{linkName: 'Create', linkHref:'/#!/banners/create'},
					{linkName: 'Banner', linkHref:'/#!/banners/:bannerId'},
					{linkName: 'Edit', linkHref:'/#!/banners/:bannerId/edit'}
				]
			},
			{
				name:'Core',
				links:[
					{linkName: 'Dev', linkHref:'/#!/dev'}
				]
			},
			{
				name:'SDSUMAP',
				links:[
					{linkName: 'SDSU Map', linkHref:'/#!/sdsumap-main'}
				]
			},
			{
				name:'Spec-view',
				links:[
					{linkName: 'Jarvis', linkHref:'/#!/jarvis'},
					{linkName: 'Spec Home', linkHref:'/#!/spec-home'}
				]
			},
			{
				name:'Tj-main',
				links:[
					{linkName: 'tj-main', linkHref:'/#!/tj-main'}
				]
			},
			{
				name:'User-interface',
				links:[
					{linkName: 'MCMU', linkHref:'/#!/mcmu'},
					{linkName: 'Front -1 ', linkHref:'/#!/front-1'},
					{linkName: 'Experimental Interface', linkHref:'/#!/experimental-interface'},
					{linkName: 'Product List', linkHref:'/#!/'},
					{linkName: 'detail-product', linkHref:'/#!/detail-product/:productId'}
				]
			},
			{
				name:'Utility',
				links:[
					{linkName: 'test-page-generator', linkHref:'/#!/test-page-generator'}
				]
			}
		]
	}
]);
