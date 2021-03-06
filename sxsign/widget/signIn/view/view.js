//var $ = require("common:components/jquery/jquery.js");
//待优化的地方比较多！
var _ = require("common:components/underscore/underscore.js");
var viewTmpl = __inline("tmpl/_view.tmpl");
var Ajax = require('/widget/comm/ajax/cajax.js');
var App = {
    init: function() {
        //console.log("hello signIn app");
        this.initVm();
        //$('.ms-controller').css('display', 'block');
        this.$el = $('.sign-block');
        this.$el.show();
        //tplData = this.testData(); //dzqtest
    },
    initVm: function() {
        var signvm = avalon.define({
            $id: "signform",
            activecode: "",
            cnname: "",
            mobile: '',
            buttonText: "发送",
            mobileverifycode: '',
            validateTip: '',
            visibility: 'hidden',
            idcard: '',
            validate: {


            },
            submitNext: function(evt) {
                //提交校验
                var errcount = 0;
                var $el = $(".sign-block");
                //console.log('submitNext..');
                signvm.onerrValidShow(".signform-idcard", {
                    regex: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    val: signvm.idcard,
                    msg: '身份证格式错误'

                });
                signvm.onerrValidShow(".signform-code", {
                    regex: /^.{4,8}$/,
                    val: signvm.mobileverifycode,
                    msg: '短信验证码格式错误'
                });
                signvm.onerrValidShow(".signform-mobile", {
                    regex: /^1[3|4|5|7|8]\d{9}$/,
                    val: signvm.mobile,
                    msg: '手机号码格式错误'
                });
                signvm.onerrValidShow(".signform-cnname", {
                    regex: /^.{1,50}$/,
                    val: signvm.cnname,
                    msg: '姓名不能为空'
                });
                signvm.onerrValidShow(".signform-activecode", {
                    regex: /^.{3,50}$/,
                    val: signvm.activecode,
                    msg: '激活码格式错误'
                });


                $el.find('input').each(function(i, elem) {
                    if ($(elem).hasClass('errclass')) {
                        errcount++;
                    }
                });
                if (errcount == 0) {
                    //  console.log('全部通过,提交表单');
                    //console.log(signvm.activecode);
                    signvm.validateTip = '';
                    signvm.visibility = 'hidden';
                    signvm.activecodeHandler(signvm.activecode, function() {
                        signvm.mobileverifycodeHandle(function() {
                            signvm.sumbitHandle();
                        });

                    });


                }
            },
            onerrValidShow: function(elem, v_obj) {
                //err时显示红边框
                var obj = v_obj || null;
                var $el = $(elem);
                if (obj != null) {
                    var regex = obj.regex;
                    var val = obj.val;
                    var msg = obj.msg || '输入有误';
                    //console.log(regex.test(val));
                    if (!regex.test(val)) {
                        $el.addClass('errclass');
                        signvm.validateTip = msg;
                        signvm.visibility = 'visible';
                        setTimeout(function() {
                            signvm.validateTip = '';
                            signvm.visibility = 'hidden';
                        }, 3000);
                    } else {
                        $el.removeClass('errclass');
                        return false;
                    }
                } else {
                    $el.addClass('errclass');
                }
                $el.on('focus', function() {
                    $el.removeClass('errclass');
                });
                return true;
            },
            mobileverifycodeHandle: function(callback) {
                //手机验证码校验：
                var data = {
                    activecode: signvm.activecode,
                    cnname: signvm.cnname,
                    mobile: signvm.mobile,
                    mobileverifycode: signvm.mobileverifycode,
                    idcard: signvm.idcard
                };

                new Ajax({
                    url: ' /register/checkSMSVeriftCode.tc',
                    type: 'post',
                    data: data,
                    success: function(data) {
                        var code = data.code || 0;
                        var msg = data.msg || '';
                        if (code == 0) {
                            callback();
                        } else {
                            signvm.validateTip = msg;
                            signvm.visibility = 'visible';
                            setTimeout(function() {
                                signvm.validateTip = '';
                                signvm.visibility = 'hidden';
                            }, 3000);
                        }
                    }
                });
            },
            sumbitHandle: function() {
                //表单提交
                var data = {
                    activecode: signvm.activecode,
                    cnname: signvm.cnname,
                    mobile: signvm.mobile,
                    mobileverifycode: signvm.mobileverifycode,
                    idcard: signvm.idcard
                };
                //后端控制跳转

                var params = $.param(data);
                window.location.href = "/uft/sign/checkInfo.vm?" + params;

            },
            sendMobileverifycode: function(evt) {
                //发送验证码

                var $el = $(evt.currentTarget);
                if ($el.hasClass('out') || signvm.buttonText != "发送") {
                    return;
                }
                var num = 60;
                var flag = signvm.onerrValidShow(".signform-mobile", {
                    regex: /^1[3|4|5|7|8]\d{9}$/,
                    val: signvm.mobile
                });
                if (!flag) {
                    //console.log("sendMobileverifycode...发送手机验证码");

                    signvm.activecodeHandler(signvm.activecode, function() {
                        new Ajax({
                            url: '/register/sendSms.tc?mobile=' + signvm.mobile,
                            type: 'get',
                            data: {
                                //mobile: signvm.mobile
                            },
                            success: function(data) {
                                var code = data.code || 0;
                                var msg = data.msg || '';

                                if (code == 0) {
                                    //
                                    //定时器
                                    var timeId = setInterval(function() {
                                        $el.addClass('out');
                                        num--;
                                        signvm.buttonText = num;
                                        if (num <= 0) {
                                            clearInterval(timeId);
                                            $el.removeClass('out');
                                            signvm.buttonText = "发送";
                                        }
                                    }, 1000);
                                } else {
                                    //失败
                                    alert(msg);
                                }
                            }
                        });

                    });
                }
            },
            activecodeHandler: function(activecode, callback) {
                //激活码校验
                new Ajax({
                    url: '  /register/verifyActiveCode.tc?activecode=' + activecode,
                    type: 'get',
                    data: {},
                    success: function(data) {
                        var code = data.code || 0;
                        var msg = data.msg || '';
                        if (code == 0) {
                            callback();
                            //signvm.onerrValidShow(".signform-activecode");
                        } else {
                            //alert(msg);
                            signvm.validateTip = msg;
                            signvm.visibility = 'visible';
                            setTimeout(function() {
                                signvm.validateTip = '';
                                signvm.visibility = 'hidden';
                            }, 3000);
                        }
                    }
                });
            }
        });

    },
    initTmpl: function() {
        //demo ,没有使用
        var html = viewTmpl({
            name: 1
        });
        $("#tmpl").html(html);
    }


};
return App;
