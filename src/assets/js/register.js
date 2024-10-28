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

async function registerUser(username, password) {
    try {
        const response = await fetch("https://s0hr7iwr7u.hzh.sealos.run/add_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            mode: "cors" // 明确指定为 cors 模式
        });
        // 尝试获取原始文本内容
        const textData = await response.text();
        console.log("Raw Text Data:", textData);

        // 尝试解析为 JSON 格式
        const jsonData = JSON.parse(textData);
        console.log("Parsed JSON Data:", jsonData);

        if (jsonData.ok) {
            const data = await jsonData;
            alert("注册成功！欢迎 " + data.result.username);
        } else {
            const errorData = await jsonData;
            alert("注册失败: " + errorData.message);
        }
    } catch (error) {
        console.error("请求出错:", error);
        alert("您的账号已存在，请直接登录！");
    }
}

    document.getElementById('register-submit').addEventListener('click', function (event) {
        event.preventDefault(); // 阻止默认行为
        var username = document.getElementById('username').value; // 获取用户名
        var password = document.getElementById('pw').value; // 获取密码
        registerUser(username, password); // 调用提交注册信息的函数
    });

// function registerUser(username, password) {
//     // 模拟注册用户的函数
//     console.log(`Registering user: ${username} with password: ${password}`);
// }

// function loginUser(username, password) {
//     // 模拟登录用户的函数
//     console.log(`Logging in user: ${username} with password: ${password}`);
// }