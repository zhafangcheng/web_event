$(function() {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()

    // 退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 用户确认是否退出
        layer.confirm('请确认是否退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储中的token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
          })
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url:'http://www.liulongbin.top:3007//my/userinfo',
        // hearders 就是请求头配置对象
        Headers: {
            Authorization:localStorage.getItem('token') || ''
        },
        success: function(res) {
            // console.log(res)
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户昵称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用头像
    if(user.user_pic != null) {
        // $('.类名).attr('src',user.user_pic).show()
        // $('.类名).hide()
    }else {

    }
}