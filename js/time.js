function createTimeCounter() {
    const startTime = new Date("2023-01-22 08:00:00");

    function updateTime() {
        const now = new Date();
        const timeDiff = now - startTime;
        const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365);
        const days = totalDays % 365;
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        const formatNumber = (num) => num.toString().padStart(2, '0');
        let timeText;
        if (years > 0) {
            timeText = `本站居然运行了${years}年${days}天${formatNumber(hours)}小时${formatNumber(minutes)}分${formatNumber(seconds)}秒`
        } else {
            timeText = `本站居然运行了${totalDays}天${formatNumber(hours)}小时${formatNumber(minutes)}分${formatNumber(seconds)}秒`
        }
        const currentTimeHtml = `<div style="font-size:13px;font-weight:bold">${timeText}<i id="heartbeat"class="fas fa-heartbeat"></i></div>`;
        const workboard = document.getElementById("workboard");
        if (workboard) {
            workboard.innerHTML = currentTimeHtml
        }
    }
    updateTime();
    setInterval(updateTime, 1000)
}
createTimeCounter();