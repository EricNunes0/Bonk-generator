function loadUser(click) {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    const localhostOAuth = "https://discord.com/api/oauth2/authorize?client_id=946918648646353006&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2F&response_type=token&scope=identify";
    const onlineOAuth = "https://discord.com/api/oauth2/authorize?client_id=946918648646353006&redirect_uri=https%3A%2F%2Fbonk-generator.herokuapp.com%2F&response_type=token&scope=identify"

    if(!accessToken) {
        if(click == true) {
            return window.location.replace(onlineOAuth);
        };
        return;
    };
    if(accessToken) {
        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        }).then(result => result.json()).then((response) => {
            const { id, username, discriminator, avatar } = response;
            document.getElementById('input-hidden-id').value = id;
            document.getElementById('input-hidden-username').value = username;
            document.getElementById('input-hidden-discriminator').value = discriminator;
            document.getElementById('input-hidden-avatar-url').value = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=512`;
            if(id == "656295512219058196" || id == "491411265294434317" || id == "856904666565705729") {
                document.getElementById("share-area").className = `bonk-input-areas`;
                document.getElementById("send-confirm-button").onclick = openOrCloseConfirm;
            }
            document.getElementById('login-username-span').innerText = `${username}`;
            document.getElementById('nav-avatar-image').src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=256`;
        }).catch((e) => {
            console.error(e);
        });
    };
};

function openOrCloseConfirm() {
    let sendConfirmBar = document.querySelector("#send-confirm-area");
    if(sendConfirmBar.className == `send-confirm closed`) {
        sendConfirmBar.className = `send-confirm opened`;
        document.querySelector("#confirm-bar").className = `confirm-bar opened`;
    } else {
        sendConfirmBar.className = `send-confirm closed`;
        document.querySelector("#confirm-bar").className = `confirm-bar closed`;
    }
};