// 每次调用 $.get()或 $.post()或$.ajax()的时候会先调用这个函数，在这个函数中拿到Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 统一拼接请求的跟路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})