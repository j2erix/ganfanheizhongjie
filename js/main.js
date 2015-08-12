var rules = [{
	site: '58.com',
	tel: '#t_phone',
	name: '.jjreninfo_des_jjr span a',
	selectors: [{
		selector: '.jjreninfo_des'
	}, {
		selector: '.jjreninfo_pic a'
	}, {
		selector: '.bottom_bar .tel'
	}]
}, {
	site: 'ganji.com',
	tel: '.contact-mobile',
	name: '.person-name span a',
	selectors: [{
		selector: '.contact-mobile'
	}, {
		selector: '.rightBar .right-border .col-right:first-child'
	}, {
		selector: '.bot-floating-mobile'
	}]
}];

var targets = [{
	name: ['陈杰'],
	tel: ['18210002827']
}, {
	name: ['邹广朋'],
	tel: ['13311157743']
}, {
	name: ['张杰云'],
	tel: ['18611230965']
}, {
	name: ['李婷婷'],
	tel: ['18046516768']
}];

var targetClass = 'heizhongjie';

var Helper = Helper || {};
Helper.getRule = function() {
	var hostname = location.hostname;

	for (var i = 0; i < rules.length; i++) {
		var curRule = rules[i];
		if ( hostname.indexOf(curRule.site) !== -1 ) return curRule;
	};

	return null;
};
Helper.getTarget = function(rule) {
	var tel = $(rule.tel).text().trim();
	var name = $(rule.name).text().trim();

	// 这些网站上的电话一般在中间有多余的空格，在这里去掉
	tel = Helper.normalizeTel(tel);

	return targets.filter(function(curTarget) {
		var isNameMatched = curTarget.name.indexOf(name) !== -1;
		var isTelMatched = curTarget.tel.indexOf(tel) !== -1;
		return isNameMatched && isTelMatched;
	});
};
Helper.normalizeTel = function(tel) {
	return tel.split('').filter(function(item){return item !== ' '}).join('');
};

var UI = UI || {};
UI.setBlackTags = function(rule) {
	$(rule.selectors).each(function(index, item) {
		$(item.selector).addClass(targetClass);	
		if (item.classes) {
			$(item.selector).addClass(item.classes);
		}
	});
};

function init () {
	var rule, target;
	// Step1：选择与网站匹配的规则
	rule = Helper.getRule();
	// Step2：通过规则确定目标
	target = Helper.getTarget(rule);
	// Step3：锁定目标则打上烙印
	if (target.length === 0) return false;
	UI.setBlackTags(rule);	
}

init();