$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登陆”的链接
     $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
    //   校验两次密码是否一致  
        repass:function (value) {
            // 通过形参得到密码框中的规则进行密码框中内容的等于判定，如果判定失败，则return一个提示消息
            var pass = $('.reg-box [name=password]').val()
            if (pass !==value) {
                return '两次输入密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1、阻止默认行为
        e.preventDefault()
        // 2、发起Ajax的post请求
        var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message)
                return layer.msg(res.message)

            }
            // console.log('注册成功！')
            layer.msg('注册成功，请登录！')
            // 模拟人的点进行为
            $('#link_login').click()

        })
    })


    // 监听登陆表单的提交事件
    $('#form-login').submit(function (e) {
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆失成功！')
                // 登陆成功得到的token字符串保存到local Storage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})