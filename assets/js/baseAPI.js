// 每次调用 $.get()或 $.post()或$.ajax()的时候会先调用这个函数，在这个函数中拿到Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 统一拼接请求的跟路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 统一为有权限的借口设置headers请求头
    if(options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authoriztion: localStorage.getItem('token') || ''
        }
    }
    
})
