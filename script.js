document.getElementById('serverForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const address = document.getElementById('address').value;
    const port = document.getElementById('port').value;
    const statusDiv = document.getElementById('status');

    statusDiv.innerHTML = "Checking server status...";

    try {
        const response = await fetch(`https://pingminecraftserver.onrender.com/ping?address=${address}&port=${port}`);
        const data = await response.json();

        if (data.status === "online") {
            statusDiv.innerHTML = `
                <p><strong>Server is online!</strong></p>
                <p>Players: ${data.players_online}/${data.players_max}</p>
                <p>Players online: ${data.players.join(", ") || "No players"}</p>
            `;
        } else {
            statusDiv.innerHTML = `<p><strong>Server is offline.</strong></p><p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        statusDiv.innerHTML = `<p><strong>Error fetching server status.</strong></p><p>${error.message}</p>`;
    }
});
