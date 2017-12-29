angular.module('ngClickCopy', [])
.service('ngCopy', ngCopyService)
.directive('ngClickCopy', ngCopyDirective);

ngCopyService.$inject = ['$window'];
function ngCopyService($window) {
  const body = angular.element($window.document.body);
	const textarea = angular.element('<textarea/>');
	textarea.css({
		position: 'fixed',
		opacity: '0',
	});
	return (toCopy) => {
		textarea.val(toCopy);
		body.append(textarea);
		textarea[0].select();

		try {
			const successful = document.execCommand('copy');
			if (!successful) throw successful;
      window.alert('复制成功');
		} catch (err) {
			window.alert('暂不支持，请长按文本框复制');
		}

		textarea.remove();
	};
}

ngCopyDirective.$inject = ['ngCopy'];
function ngCopyDirective(ngCopy) {
  return {
		restrict: 'A',
    scope: {
      ngClickCopy: '<ngClickCopy',
    },
		link(scope, element, attrs) {
			element.bind('click', (e) => {
				ngCopy(scope.ngClickCopy);
			});
		},
	};
}
