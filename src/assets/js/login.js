document.getElementById('hidepw').addEventListener('click', function (event) {
    var passwordField = document.getElementById('pw'); // 获取密码输入框
    var toggleText = document.getElementById('hidepw'); // 获取显示/隐藏密码的文本元素
    var currentText = toggleText.innerText || toggleText.textContent;

    if (currentText === '显示密码') {
        toggleText.innerText = '隐藏密码'; // 修改文本内容
        passwordField.type = 'text';
    } else {
        toggleText.innerText = '显示密码'; // 修改文本内容
        passwordField.type = 'password';
    }
});


async function loginUser(username, password) {
    try {
        const response = await fetch("https://s0hr7iwr7u.hzh.sealos.run/login_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        // 尝试获取原始文本内容
        const textData = await response.text();
        console.log("Raw Text Data:", textData);

        // 尝试解析为 JSON 格式
        const jsonData = JSON.parse(textData);
        console.log("Parsed JSON Data:", jsonData);

        if (jsonData.ok) {
            const data = await jsonData;
            // 将Token存储在LocalStorage中
            localStorage.setItem("token", data.token);
            alert("登录成功！");
            // 重定向到主页或其他页面
            window.location.href = "/home";
        } else {
            const errorData = await jsonData;
            alert("登录失败: " + errorData.error);
        }
    } catch (error) {
        console.error("请求出错:", error);
        alert("网络出错，请稍后再试。");
    }
}

    document.getElementById('login-submit').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止默认行为
        var username = document.getElementById('username').value; // 获取用户名
        var password = document.getElementById('pw').value; // 获取密码
        loginUser(username, password); // 调用提交注册信息的函数
    });

// function registerUser(username, password) {
//     // 模拟注册用户的函数
//     console.log(`Registering user: ${username} with password: ${password}`);
// }

// function loginUser(username, password) {
//     // 模拟登录用户的函数
//     console.log(`Logging in user: ${username} with password: ${password}`);
// }